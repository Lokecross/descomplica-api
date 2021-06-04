import ISankhyaProvider from '../models/ISankhyaProvider';

class FakeSankhyaProvider implements ISankhyaProvider {
  public async createReservation(): Promise<void> {
    //
  }

  public async simulate(): Promise<{
    data: {
      price: number;
      tax: number;
      qtdMinParc: number;
      qtdMaxParc: number;
      period: number;
      admin_price: number;
      admin_tax: number;
      broker_price: number;
      broker_tax: number;
      franchisee_price: number;
      franchisee_tax: number;
      tabela: string;
      periodicidade: string;
    };
    error: string | null;
  }> {
    return {
      data: {
        price: 1,
        tax: 1,
        qtdMinParc: 1,
        qtdMaxParc: 1,
        period: 1,
        admin_price: 1,
        admin_tax: 1,
        broker_price: 1,
        broker_tax: 1,
        franchisee_price: 1,
        franchisee_tax: 1,
        tabela: '',
        periodicidade: '',
      },
      error: null,
    };
  }

  public async prospect(): Promise<{
    data: {
      prospect_id: string;
      name: string;
      gender: string;
      email: string;
      phone: string;
    };
    error: string | null;
  }> {
    return {
      data: {
        prospect_id: '',
        name: '',
        gender: '',
        email: '',
        phone: '',
      },
      error: null,
    };
  }

  public async reserve(): Promise<{
    data: {
      reservation_id: string;
    };
    error: string | null;
  }> {
    return {
      data: {
        reservation_id: '',
      },
      error: null,
    };
  }

  public async createContract(): Promise<{
    data: {
      contract_id: string;
    };
    error: string | null;
  }> {
    return {
      data: {
        contract_id: '',
      },
      error: null,
    };
  }

  public async createPayer(): Promise<{
    data: {
      payer_id: string;
      partner_id: string;
      rg: string;
      phone: string;
      marital_status: string;
      name: string;
      sex: string;
      birth: string;
      email: string;
      profession: string;
      document: string;
      rg_emission: string;
      rg_agency: string;
      mother: string;
      father: string;
      cep: string;
      state: string;
      number: string;
      complement: string;
      city: string;
      address: string;
      village: string;
      spouse_rg: string;
      spouse_birth: string;
      spouse_email: string;
      spouse_cpf: string;
      spouse_name: string;
    };
    error: string | null;
  }> {
    return {
      data: {
        payer_id: '',
        partner_id: '',
        rg: '',
        phone: '',
        marital_status: '',
        name: '',
        sex: '',
        birth: '',
        email: '',
        profession: '',
        document: '',
        rg_emission: '',
        rg_agency: '',
        mother: '',
        father: '',
        cep: '',
        state: '',
        number: '',
        complement: '',
        city: '',
        address: '',
        village: '',
        spouse_rg: '',
        spouse_birth: '',
        spouse_email: '',
        spouse_cpf: '',
        spouse_name: '',
      },
      error: null,
    };
  }

  public async updatePayer(): Promise<{
    data: boolean;
    error: string | null;
  }> {
    return {
      data: true,
      error: null,
    };
  }

  public async addFile(): Promise<{
    data: boolean;
    error: string | null;
  }> {
    return {
      data: true,
      error: null,
    };
  }

  public async addPayer(): Promise<{
    data: boolean;
    error: string | null;
  }> {
    return {
      data: true,
      error: null,
    };
  }

  public async comissions(): Promise<{
    data: boolean;
    error: string | null;
  }> {
    return {
      data: true,
      error: null,
    };
  }

  public async sendProposal(): Promise<{
    data: boolean;
    error: string | null;
  }> {
    return {
      data: true,
      error: null,
    };
  }
}

export default FakeSankhyaProvider;
