export default interface ISankhyaProvider {
  createReservation(
    lot_sankhya_id: string,
    broker_sankhya_id: string,
    document: string,
    name: string,
    email: string,
    phone: string,
    note: string,
    gender: string,
  ): Promise<void>;

  simulate(
    code_id: string,
  ): Promise<{
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
  }>;

  prospect(
    document: string,
  ): Promise<{
    data: {
      prospect_id: string;
      name: string;
      gender: string;
      email: string;
      phone: string;
    };
    error: string | null;
  }>;

  reserve(data: {
    lot_id: string;
    document: string;
    name: string;
    email: string;
    phone: string;
    notes: string;
    corretor_id: string;
  }): Promise<{
    data: {
      reservation_id: string;
    };
    error: string | null;
  }>;

  createContract(data: {
    lot_id: string;
    price: string;
    franquia: string;
    corretor: string;
    admin: string;
    proposal: string;
    input: string;
    input_venc: string;
    tax: string;
    is_price: boolean;
    installments: string;
    period: string;
    corretor_id: string;
    supervisor_id: string;
    gerente_id: string;
    first_date: string;
    readjustment: string;
    is_financed: boolean;
    financed: string;
    installment: string;
    reservation_id: string;
  }): Promise<{
    data: {
      contract_id: string;
    };
    error: string | null;
  }>;

  createPayer(data: {
    document: string;
  }): Promise<{
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
  }>;

  updatePayer(data: {
    payer_id: string;
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
  }): Promise<{
    data: boolean;
    error: string | null;
  }>;

  addFile(data: {
    payer_id: string;
    proposal_id: string;
    type: string;
    b64: string;
  }): Promise<{
    data: boolean;
    error: string | null;
  }>;

  addPayer(data: {
    payer_id: string;
    proposal_id: string;
    responsible: boolean;
  }): Promise<{
    data: boolean;
    error: string | null;
  }>;

  comissions(data: {
    proposal_id: string;
    comissions: Array<{
      type: string;
      venc: string;
      price: string;
    }>;
  }): Promise<{
    data: boolean;
    error: string | null;
  }>;

  sendProposal(data: {
    proposal_id: string;
  }): Promise<{
    data: boolean;
    error: string | null;
  }>;
}
