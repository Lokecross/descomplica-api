import { injectable, inject } from 'tsyringe';

import { format, add } from 'date-fns';

import AppError from '@shared/errors/AppError';

import ISankhyaProvider from '@shared/container/providers/Sankhya/models/ISankhyaProvider';
import IBrokersRepository from '@modules/brokers/repositories/IBrokersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IAttendancesRepository from '@modules/attendances/repositories/IAttendancesRepository';
import ISimulatesRepository from '../repositories/ISimulatesRepository';

interface IRequest {
  userId: string;
  simulateId: string;
}

@injectable()
class CreateProposalService {
  constructor(
    @inject('SankhyaProvider')
    private sankhyaProvider: ISankhyaProvider,

    @inject('SimulatesRepository')
    private simulatesRepository: ISimulatesRepository,

    @inject('BrokersRepository')
    private brokersRepository: IBrokersRepository,

    @inject('AttendancesRepository')
    private attendancesRepository: IAttendancesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ userId, simulateId }: IRequest): Promise<any> {
    const user = await this.usersRepository.findById(userId);

    const simulate = await this.simulatesRepository.findById(simulateId);
    const simulateWithRelations = await this.simulatesRepository.findByIdWithRelations(
      simulateId,
    );

    const attendance = await this.attendancesRepository.findById(
      simulate.attendanceId,
    );

    if (!attendance) {
      throw new AppError('Attendance not found', 404);
    }

    if (!simulate) {
      throw new AppError('Simulate not found', 404);
    }

    const simulation = await this.sankhyaProvider.simulate(
      simulateWithRelations.lot.sankhya_id,
    );

    if (simulation.error) {
      throw new AppError(simulation.error);
    }

    const contract = await this.sankhyaProvider.createContract({
      admin: `${simulation.data.admin_price}`,
      corretor: `${simulation.data.broker_price}`,
      corretor_id: simulateWithRelations.attendance.broker.sankhya_id,
      financed: simulate.price,
      first_date: format(add(new Date(), { months: 1 }), 'dd/MM/yyyy'),
      franquia: `${simulation.data.franchisee_price}`,
      gerente_id:
        user.role === 'manager'
          ? user.broker.sankhya_id
          : (
              await this.brokersRepository.findById(
                user.team?.supervisor?.brokerId,
              )
            ).sankhya_id,
      input: simulate.input,
      input_venc: format(add(new Date(), { months: 1 }), 'dd/MM/yyyy'),
      installment:
        simulate.type === 'Gradiente'
          ? `${
              parseFloat(
                `${simulate.price}`.replace(/[^0-9,]/g, '').replace(',', '.'),
              ) /
              Number(simulate.deadline) /
              100
            }`
          : `${
              (parseFloat(
                `${simulate.price}`.replace(/[^0-9,]/g, '').replace(',', '.'),
              ) *
                ((Math.pow(
                  simulation.data.tax / 100 + 1,
                  Number(simulate.deadline),
                ) *
                  (simulation.data.tax / 100)) /
                  (Math.pow(
                    simulation.data.tax / 100 + 1,
                    Number(simulate.deadline),
                  ) -
                    1))) /
              100
            }`,
      installments: simulate.deadline,
      is_financed: simulate.input !== '',
      is_price: simulate.type === 'Price',
      lot_id: simulateWithRelations.lot.sankhya_id,
      period: simulate.period === 'Mensal' ? '1' : '12',
      price: simulate.value,
      proposal: simulate.value,
      readjustment: format(
        add(new Date(), {
          months: simulate.period === 'Mensal' ? 1 : 12,
        }),
        'dd/MM/yyyy',
      ),
      reservation_id: simulate.reservationId,
      supervisor_id:
        user.role === 'manager'
          ? user.broker.sankhya_id
          : (
              await this.brokersRepository.findById(
                user.team?.supervisor?.brokerId,
              )
            ).sankhya_id,
      tax: simulate.tax,
    });

    if (contract.error) {
      throw new AppError(contract.error);
    }

    simulate.contractId = contract.data.contract_id;

    await this.simulatesRepository.save(simulate);

    const responsibleIndex = simulateWithRelations.payers.findIndex(
      item => item.responsible,
    );
    const hasResponsible = responsibleIndex !== -1;

    await Promise.all(
      simulateWithRelations.payers.map(async (item, index) => {
        const payer = await this.sankhyaProvider.createPayer({
          document: item.document,
        });

        if (payer.error) {
          throw new AppError(payer.error);
        }

        const updatePayer = await this.sankhyaProvider.updatePayer({
          address: item.address,
          birth: item.birth,
          cep: item.cep,
          city: item.city,
          complement: item.complement,
          document: item.document,
          email: item.email,
          father: item.father,
          marital_status: item.marital_status,
          mother: item.mother,
          name: item.name,
          number: item.number,
          payer_id: payer.data.payer_id,
          phone: item.phone,
          profession: item.profession,
          rg: item.rg,
          rg_agency: item.rg_agency,
          rg_emission: item.rg_emission,
          sex: item.sex,
          spouse_birth: item.birth,
          spouse_cpf: item.spouse_cpf,
          spouse_email: item.spouse_email,
          spouse_name: item.spouse_name,
          spouse_rg: item.spouse_rg,
          state: item.state,
          village: item.village,
        });

        if (updatePayer.error) {
          throw new AppError(updatePayer.error);
        }

        const file1 = await this.sankhyaProvider.addFile({
          b64: item.rg_b64,
          payer_id: payer.data.payer_id,
          proposal_id: contract.data.contract_id,
          type: 'RG',
        });

        if (file1.error) {
          throw new AppError(file1.error);
        }

        const file2 = await this.sankhyaProvider.addFile({
          b64: item.cpf_b64,
          payer_id: payer.data.payer_id,
          proposal_id: contract.data.contract_id,
          type: 'CPF',
        });

        if (file2.error) {
          throw new AppError(file2.error);
        }

        const file3 = await this.sankhyaProvider.addFile({
          b64: item.address_b64,
          payer_id: payer.data.payer_id,
          proposal_id: contract.data.contract_id,
          type: 'CE',
        });

        if (file3.error) {
          throw new AppError(file3.error);
        }

        if (item.marital_status === 'CA') {
          const file4 = await this.sankhyaProvider.addFile({
            b64: item.marriage_b64,
            payer_id: payer.data.payer_id,
            proposal_id: contract.data.contract_id,
            type: 'CC',
          });

          if (file4.error) {
            throw new AppError(file4.error);
          }
        }

        const addPayer = await this.sankhyaProvider.addPayer({
          payer_id: payer.data.partner_id,
          proposal_id: contract.data.contract_id,
          responsible:
            index === responsibleIndex || (index === 0 && !hasResponsible),
        });

        if (addPayer.error) {
          throw new AppError(addPayer.error);
        }
      }),
    );

    const comissions = await this.sankhyaProvider.comissions({
      comissions: simulateWithRelations.comissions.map(item => {
        return {
          type: item.type,
          price: item.price,
          venc: item.venc,
        };
      }),
      proposal_id: contract.data.contract_id,
    });

    if (comissions.error) {
      throw new AppError(comissions.error);
    }

    const sendProposal = await this.sankhyaProvider.sendProposal({
      proposal_id: contract.data.contract_id,
    });

    if (sendProposal.error) {
      throw new AppError(sendProposal.error);
    }

    simulate.status = 'sent';

    await this.simulatesRepository.save(simulate);

    attendance.status = 'proposal';

    await this.attendancesRepository.save(attendance);

    return {
      ok: true,
    };
  }
}

export default CreateProposalService;
