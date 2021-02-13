import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ISankhyaProvider from '@shared/container/providers/Sankhya/models/ISankhyaProvider';

interface IRequest {
  proposal_id: string;
  responsible: boolean;
  document: string;
  name: string;
  village: string;
  address: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  cep: string;
  email: string;
  sex: string;
  rg: string;
  rg_emission: string;
  rg_agency: string;
  birth: string;
  phone: string;
  father: string;
  mother: string;
  profession: string;
  marital_status: string;
  spouse_name: string;
  spouse_rg: string;
  spouse_cpf: string;
  spouse_birth: string;
  spouse_email: string;
  rg_b64: string;
  cpf_b64: string;
  address_b64: string;
  marriage_b64: string;
  spouse_rg_b64: string;
  spouse_cpf_b64: string;
}

@injectable()
class CreatePayerService {
  constructor(
    @inject('SankhyaProvider')
    private sankhyaProvider: ISankhyaProvider,
  ) {}

  public async execute({
    proposal_id,
    responsible,
    document,
    name,
    village,
    address,
    number,
    complement,
    city,
    state,
    cep,
    email,
    sex,
    rg,
    rg_emission,
    rg_agency,
    birth,
    phone,
    father,
    mother,
    profession,
    marital_status,
    spouse_name,
    spouse_rg,
    spouse_cpf,
    spouse_birth,
    spouse_email,
    rg_b64,
    cpf_b64,
    address_b64,
    marriage_b64,
  }: IRequest): Promise<any> {
    const payer = await this.sankhyaProvider.createPayer({
      document,
    });

    if (payer.error) {
      throw new AppError(payer.error);
    }

    const updatePayer = await this.sankhyaProvider.updatePayer({
      address,
      birth,
      cep,
      city,
      complement,
      document,
      email,
      father,
      marital_status,
      mother,
      name,
      number,
      payer_id: payer.data.payer_id,
      phone,
      profession,
      rg,
      rg_agency,
      rg_emission,
      sex,
      spouse_birth,
      spouse_cpf,
      spouse_email,
      spouse_name,
      spouse_rg,
      state,
      village,
    });

    if (updatePayer.error) {
      throw new AppError(updatePayer.error);
    }

    const file1 = await this.sankhyaProvider.addFile({
      b64: rg_b64,
      payer_id: payer.data.payer_id,
      proposal_id,
      type: 'RG',
    });

    if (file1.error) {
      throw new AppError(file1.error);
    }

    const file2 = await this.sankhyaProvider.addFile({
      b64: cpf_b64,
      payer_id: payer.data.payer_id,
      proposal_id,
      type: 'CPF',
    });

    if (file2.error) {
      throw new AppError(file2.error);
    }

    const file3 = await this.sankhyaProvider.addFile({
      b64: address_b64,
      payer_id: payer.data.payer_id,
      proposal_id,
      type: 'CE',
    });

    if (file3.error) {
      throw new AppError(file3.error);
    }

    if (marital_status === 'CA') {
      const file4 = await this.sankhyaProvider.addFile({
        b64: marriage_b64,
        payer_id: payer.data.payer_id,
        proposal_id,
        type: 'CC',
      });

      if (file4.error) {
        throw new AppError(file4.error);
      }
    }

    const addPayer = await this.sankhyaProvider.addPayer({
      payer_id: payer.data.payer_id,
      proposal_id,
      responsible,
    });

    if (addPayer.error) {
      throw new AppError(addPayer.error);
    }
  }
}

export default CreatePayerService;
