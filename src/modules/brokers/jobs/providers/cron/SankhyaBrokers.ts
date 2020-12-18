import { CronJob } from 'cron';

import { container } from 'tsyringe';

import sankhya from '@shared/api/sankhya';

import CreateBrokerService from '@modules/brokers/services/CreateBrokerService';
import FindBrokerCpfService from '@modules/brokers/services/FindBrokerCpfService';
import UpdateBrokerService from '@modules/brokers/services/UpdateBrokerService';

const job = new CronJob(
  '0 * * * * *',
  async () => {
    try {
      const createBrokerService = container.resolve(CreateBrokerService);
      const findBrokerCpfService = container.resolve(FindBrokerCpfService);
      const updateBrokerService = container.resolve(UpdateBrokerService);

      const dataBrokers = `
        <serviceRequest serviceName="CRUDServiceProvider.loadView">
          <requestBody>
            <query viewName="V_FACILITA_CORRETORES" orderBy="CODIGO">
              <fields>
                <field>CODIGO</field>
                <field>USUARIO</field>
                <field>DTADMISSAO</field>
                <field>CPF</field>
                <field>CORRETOR</field>
                <field>APELIDO</field>
                <field>EMAIL</field>
                <field>TELEFONE</field>
                <field>CRECI</field>
                <field>CRECI_REGIAO</field>
                <field>COD_GERENTE</field>
                <field>COD_SUPERVISOR</field>
              </fields>
            </query>
          </requestBody>
        </serviceRequest>
      `;

      const brokersResponse: any = await sankhya.post(
        '/mge/service.sbr?serviceName=CRUDServiceProvider.loadView',
        dataBrokers,
      );

      type brokersTypes = {
        sankhya_id: string;
        cpf: string;
        name: string;
        email: string;
        phone: string;
        creci: string;
        creci_uf: string;
      };

      const brokers: brokersTypes[] = brokersResponse.serviceResponse.responseBody[0].records[0].record.map(
        (item: any) => ({
          sankhya_id: item.CODIGO[0],
          cpf: item.CPF[0],
          name: item.CORRETOR[0],
          email: item.EMAIL[0],
          phone: item.TELEFONE[0],
          creci: item.CRECI[0],
          creci_uf: item.CRECI_REGIAO[0],
        }),
      );

      brokers.forEach(item => {
        const doEach = async () => {
          try {
            const brokerExists = await findBrokerCpfService.execute({
              cpf: item.cpf,
            });

            await updateBrokerService.execute({
              id: brokerExists.id,
              ...item,
            });
          } catch (error) {
            await createBrokerService.execute(item);
          }
        };

        doEach();
      });
    } catch (err) {
      console.log(err);
    }
  },
  null,
  true,
  'America/Sao_Paulo',
);

job.start();
