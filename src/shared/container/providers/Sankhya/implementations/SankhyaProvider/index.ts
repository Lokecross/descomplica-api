import atob from 'atob';

import sankhya from '@shared/api/sankhya';

import ISankhyaProvider from '../../models/ISankhyaProvider';

class SankhyaProvider implements ISankhyaProvider {
  public async createReservation(
    lot_sankhya_id: string,
    broker_sankhya_id: string,
    document: string,
    name: string,
    email: string,
    phone: string,
    note: string,
    gender: string,
  ): Promise<void> {
    const dataReservation = `
      <serviceRequest serviceName="CRUDServiceProvider.saveRecord">
        <requestBody>
          <dataSet rootEntity="TIMRLC" includePresentationFields="S">
            <entity path="">
              <fieldset list="*" />
            </entity>
            <dataRow>
              <localFields>
                <LTECODIGO>${lot_sankhya_id}</LTECODIGO>
                <PPRCODIGO></PPRCODIGO>
                <PPRCPFCNPJ>${document}</PPRCPFCNPJ>
                <PPRTIPO>F</PPRTIPO>
                <PPRSEXO>${gender}</PPRSEXO>
                <PPRNOME>${name}</PPRNOME>
                <PPREMAIL>${email}</PPREMAIL>
                <PPRTELEFONES>${phone}</PPRTELEFONES>
                <PPROBSERVACAO>${note}</PPROBSERVACAO>
                <CORCODIGO>${broker_sankhya_id}</CORCODIGO>
              </localFields>
            </dataRow>
          </dataSet>
        </requestBody>
      </serviceRequest>
    `;

    try {
      await sankhya.post(
        '/mge/service.sbr?serviceName=CRUDServiceProvider.saveRecord',
        dataReservation,
      );
    } catch (error) {
      throw new Error(
        `Sankhya call error: ${
          error.serviceResponse?.statusMessage[0]
            ? atob(error.serviceResponse?.statusMessage[0])
            : 'network error'
        }`,
      );
    }
  }

  public async simulate(
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
    };
    error: string | null;
  }> {
    const data = `
      <serviceRequest serviceName="CRUDServiceProvider.loadView">
        <requestBody>
          <query viewName="VW_DESCOMPLICA_SIMLOTE">
            <fields>
              <field>COD_LOTE</field>
              <field>COD_LOTEAMENTO</field>
              <field>VALOR</field>
              <field>COMADM</field>
              <field>PERCOMADM</field>
              <field>COMCOR</field>
              <field>PERCOMCOR</field>
              <field>COMFRAN</field>
              <field>PERCOMFRAN</field>
              <field>COMPROP</field>
              <field>PERCOMPROP</field>
              <field>TXJUROSFINANC</field>
              <field>QTDMINPARC</field>
              <field>QTDMAXPARC</field>
              <field>PERIODICIDADE</field>
              <field>INDEXADOR</field>
            </fields>
            <where>COD_LOTE=${code_id}</where>
          </query>
        </requestBody>
      </serviceRequest>
    `;

    try {
      const simulation: any = await sankhya.post(
        '/mge/service.sbr?serviceName=CRUDServiceProvider.loadView',
        data,
      );

      const record =
        simulation?.serviceResponse?.responseBody[0]?.records[0]?.record[0];

      return {
        data: {
          price: Number(record?.VALOR[0]),
          tax: Number(record?.TXJUROSFINANC[0]),
          qtdMinParc: Number(record?.QTDMINPARC[0]),
          qtdMaxParc: Number(record?.QTDMAXPARC[0]),
          period: Number(record?.PERIODICIDADE[0]),
          admin_price: Number(record?.COMADM[0]),
          admin_tax: Number(record?.PERCOMADM[0]),
          broker_price: Number(record?.COMCOR[0]),
          broker_tax: Number(record?.PERCOMCOR[0]),
          franchisee_price: Number(record?.COMFRAN[0]),
          franchisee_tax: Number(record?.PERCOMFRAN[0]),
        },
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: `Sankhya call error: ${
          error.serviceResponse?.statusMessage[0]
            ? atob(error.serviceResponse?.statusMessage[0])
            : 'network error'
        }`,
      };
    }
  }

  public async prospect(
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
  }> {
    const data = `
      <serviceRequest serviceName="CRUDServiceProvider.loadView">
        <requestBody>
          <query viewName="V_FACILITA_PROSPECT">
            <fields>
              <field>COD_PROSPECT</field>
              <field>CPF_CNPJ</field>
              <field>CPF_CNPJ_MASC</field>
              <field>TIPPESSOA</field>
              <field>NOME</field>
              <field>EMAIL</field>
              <field>TELEFONE</field>
            </fields>
            <where>CPF_CNPJ='${document}'</where>
          </query>
        </requestBody>
      </serviceRequest>
    `;

    try {
      const simulation: any = await sankhya.post(
        '/mge/service.sbr?serviceName=CRUDServiceProvider.loadView',
        data,
      );

      const record =
        simulation?.serviceResponse?.responseBody[0]?.records[0]?.record[0];

      return {
        data: {
          prospect_id: record?.COD_PROSPECT[0],
          name: record?.NOME[0],
          gender: record?.TIPPESSOA[0],
          email: record?.EMAIL[0],
          phone: record?.TELEFONE[0],
        },
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: `Sankhya call error: ${
          error.serviceResponse?.statusMessage[0]
            ? atob(error.serviceResponse?.statusMessage[0])
            : 'network error'
        }`,
      };
    }
  }

  public async reserve({
    corretor_id,
    document,
    email,
    lot_id,
    name,
    notes,
    phone,
  }: {
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
  }> {
    const data = `
      <serviceRequest serviceName="CRUDServiceProvider.saveRecord">
        <requestBody>
          <dataSet rootEntity="TIMRLC" includePresentationFields="S">
            <entity path="">
              <fieldset list="*" />
            </entity>
            <dataRow>
              <localFields>
                <LTECODIGO>${lot_id}</LTECODIGO>
                <PPRCODIGO></PPRCODIGO>
                <PPRCPFCNPJ>${document}</PPRCPFCNPJ>
                <PPRTIPO>F</PPRTIPO>
                <PPRSEXO>M</PPRSEXO>
                <PPRNOME>${name}</PPRNOME>
                <PPREMAIL>${email}</PPREMAIL>
                <PPRTELEFONES>${phone}</PPRTELEFONES>
                <PPROBSERVACAO>${notes}</PPROBSERVACAO>
                <CORCODIGO>${corretor_id}</CORCODIGO>
              </localFields>
            </dataRow>
          </dataSet>
        </requestBody>
      </serviceRequest>
    `;

    try {
      const reservation: any = await sankhya.post(
        '/mge/service.sbr?serviceName=CRUDServiceProvider.saveRecord',
        data,
      );

      const recordReservation =
        reservation?.serviceResponse?.responseBody[0]?.entities[0]?.entity[0];

      const reservation_id = recordReservation?.RLCCODIGO[0];

      return {
        data: {
          reservation_id,
        },
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: `Sankhya call error: ${
          error.serviceResponse?.statusMessage[0]
            ? atob(error.serviceResponse?.statusMessage[0])
            : 'network error'
        }`,
      };
    }
  }

  public async createContract({
    admin,
    corretor,
    corretor_id,
    financed,
    first_date,
    franquia,
    gerente_id,
    input,
    input_venc,
    installment,
    installments,
    is_financed,
    is_price,
    lot_id,
    period,
    price,
    proposal,
    readjustment,
    reservation_id,
    supervisor_id,
    tax,
  }: {
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
  }> {
    const data = `
      <serviceRequest serviceName="CRUDServiceProvider.saveRecord">
        <requestBody>
          <dataSet rootEntity="AD_DCPPROPOSTA" includePresentationFields="S">
            <entity path="">
              <fieldset list="*" />
            </entity>
            <dataRow>
            <localFields>
              <LTVIMVESTIMENTO>MO</LTVIMVESTIMENTO>
              <LTECODIGO>${lot_id}</LTECODIGO>
              <LTVPRECODOLOTE>${price}</LTVPRECODOLOTE>
              <LTVPRAZOESCRITURA>2M</LTVPRAZOESCRITURA>
              <LTVRECAFRANQUIA>${franquia}</LTVRECAFRANQUIA>
              <LTVRECACORRETOR>${corretor}</LTVRECACORRETOR>
              <LTVRECAADM>${admin}</LTVRECAADM>
              <LTVPRECOVENDIDO>${proposal}</LTVPRECOVENDIDO>
              <LTVVALORFECHAMENTO>${proposal}</LTVVALORFECHAMENTO>
              <LTVPARCARRAS></LTVPARCARRAS>
              <LTVPRIPARARRAS></LTVPRIPARARRAS>
              <LTVENTRADA>${input}</LTVENTRADA>
              <LTVQTPPARENTRADA>1</LTVQTPPARENTRADA>
              <LTVVENCPARENTRADA>${input_venc}</LTVVENCPARENTRADA>
              <LTVMAISJUROS>${tax}</LTVMAISJUROS>
              <LTVTABELAPRICE>${is_price ? 'S' : 'N'}</LTVTABELAPRICE>
              <LTVPARCELAS>${installments}</LTVPARCELAS>
              <LTVINDICECORRECAO>1</LTVINDICECORRECAO>
              <LTVPERIODICIDADE>${period}</LTVPERIODICIDADE>
              <LTVCORRETOR>${corretor_id}</LTVCORRETOR>
              <LTVSUPERVISORCOR>${supervisor_id}</LTVSUPERVISORCOR>
              <LTVGERENTECOR>${gerente_id}</LTVGERENTECOR>
              <LTVPRIMEIRAPARCELA>${first_date}</LTVPRIMEIRAPARCELA>
              <LTVPROXREAJUSTE>${readjustment}</LTVPROXREAJUSTE>
              <LTVGERAARRAS></LTVGERAARRAS>
              <LTVGERAFINANC>${is_financed ? 'S' : 'N'}</LTVGERAFINANC>
              <LTVGERAFINANCENT></LTVGERAFINANCENT>
              <LTVTOTALDIFER>0</LTVTOTALDIFER>
              <LTVVLRFINANC>${financed}</LTVVLRFINANC>
              <LTVVALORPARCELA>${installment}</LTVVALORPARCELA>
              <LTVDTULTREAJUSTE>${first_date}</LTVDTULTREAJUSTE>
              <LTVVLRTOTALINTERMED>0</LTVVLRTOTALINTERMED>
              <LTVVLRTOTALBALAO>0</LTVVLRTOTALBALAO>
              <RLCCODIGO>${reservation_id}</RLCCODIGO>
            </localFields>
            </dataRow>
          </dataSet>
        </requestBody>
      </serviceRequest>
    `;

    try {
      const contract: any = await sankhya.post(
        '/mge/service.sbr?serviceName=CRUDServiceProvider.saveRecord',
        data,
      );

      const recordContract =
        contract?.serviceResponse?.responseBody[0]?.entities[0]?.entity[0];
      const contract_id = recordContract?.NUDCPPROP[0];

      return {
        data: {
          contract_id,
        },
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: `Sankhya call error: ${
          error.serviceResponse?.statusMessage[0]
            ? atob(error.serviceResponse?.statusMessage[0])
            : 'network error'
        }`,
      };
    }
  }

  public async createPayer({
    document,
  }: {
    document: string;
  }): Promise<{
    data: {
      payer_id: string;
    };
    error: string | null;
  }> {
    const data = `
      <serviceRequest serviceName="CRUDServiceProvider.saveRecord">
        <requestBody>
          <dataSet rootEntity="AD_DCPCADPAR" includePresentationFields="S">
            <entity path="">
              <fieldset list="*" />
            </entity>
            <dataRow>
              <localFields>
                <CPF_CNPJ>${document}</CPF_CNPJ>
              </localFields>
            </dataRow>
          </dataSet>
        </requestBody>
      </serviceRequest>
    `;

    try {
      const payerCreate: any = await sankhya.post(
        '/mge/service.sbr?serviceName=CRUDServiceProvider.saveRecord',
        data,
      );

      const recordPayerCreate =
        payerCreate?.serviceResponse?.responseBody[0]?.entities[0]?.entity[0];
      const payer_id = recordPayerCreate?.CODCADPAR[0];

      return {
        data: {
          payer_id,
        },
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: `Sankhya call error: ${
          error.serviceResponse?.statusMessage[0]
            ? atob(error.serviceResponse?.statusMessage[0])
            : 'network error'
        }`,
      };
    }
  }

  public async updatePayer({
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
    payer_id,
  }: {
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
  }> {
    const data = `
      <serviceRequest serviceName="CRUDServiceProvider.saveRecord">
        <requestBody>
          <dataSet rootEntity="AD_DCPCADPAR" includePresentationFields="S">
            <entity path="">
              <fieldset list="*" />
            </entity>
            <dataRow>
              <localFields>
                <CPF_CNPJ>${document}</CPF_CNPJ>
                <NOMEPARC>${name}</NOMEPARC>
                <TIPPESSOA>M</TIPPESSOA>
                <NOME_BAIRRO>${village}</NOME_BAIRRO>
                <TIPOLOGRADOURO>RUA</TIPOLOGRADOURO>
                <LOGRADOURO>${address}</LOGRADOURO>
                <NUMEND>${number}</NUMEND>
                <COMPLEMENTO>${complement}</COMPLEMENTO>
                <NOMECIDADE>${city}</NOMECIDADE>
                <SIGLAUF>${state}</SIGLAUF>
                <CEP>${cep}</CEP>
                <EMAIL>${email}</EMAIL>
                <SEXO>${sex}</SEXO>
                <RG>${rg}</RG>
                <RGDTEMISSAO>${rg_emission}</RGDTEMISSAO>
                <RGORGEXP>${rg_agency}</RGORGEXP>
                <DTNASCIMENTO>${birth}</DTNASCIMENTO>
                <TELEFONE1>${phone}</TELEFONE1>
                <TELEFONE2></TELEFONE2>
                <NOMEPAI>${father}</NOMEPAI>
                <NOMEMAE>${mother}</NOMEMAE>
                <PROFISSAO>${profession}</PROFISSAO>
                <ESTADOCIVIL>${marital_status}</ESTADOCIVIL>
                <REGIMEBENS>CPB</REGIMEBENS>
                <NOME_CONJ>${spouse_name}</NOME_CONJ>
                <RG_CONJ>${spouse_rg}</RG_CONJ>
                <CPF_CONJ>${spouse_cpf}</CPF_CONJ>
                <DTNASCIMENTO_CONJ>${spouse_birth}</DTNASCIMENTO_CONJ>
                <EMAIL_CONJ>${spouse_email}</EMAIL_CONJ>
              </localFields>
              <key>
                <CODCADPAR>${payer_id}</CODCADPAR>
              </key>
            </dataRow>
          </dataSet>
        </requestBody>
      </serviceRequest>
    `;

    try {
      await sankhya.post(
        '/mge/service.sbr?serviceName=CRUDServiceProvider.saveRecord',
        data,
      );

      return {
        data: true,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: `Sankhya call error: ${
          error.serviceResponse?.statusMessage[0]
            ? atob(error.serviceResponse?.statusMessage[0])
            : 'network error'
        }`,
      };
    }
  }

  public async addFile({
    b64,
    payer_id,
    proposal_id,
    type,
  }: {
    payer_id: string;
    proposal_id: string;
    type: string;
    b64: string;
  }): Promise<{
    data: boolean;
    error: string | null;
  }> {
    const data = `
      <serviceRequest serviceName="CRUDServiceProvider.saveRecord">
        <requestBody>
          <dataSet rootEntity="AD_DCPDOCS" includePresentationFields="S">
            <entity path="">
              <fieldset list="*" />
            </entity>
            <dataRow>
              <localFields>
                <TIPODOC>${type}</TIPODOC>
                <NOMEARQ>arquivo.png</NOMEARQ>
                <CODPARC>${payer_id}</CODPARC>
                <CODCONTATO></CODCONTATO>
                <CODCONTRATO>${proposal_id}</CODCONTRATO>
                <MODULO>LTV</MODULO>
                <DOCB64>${b64}</DOCB64>
              </localFields>
            </dataRow>
          </dataSet>
        </requestBody>
      </serviceRequest>
    `;

    try {
      await sankhya.post(
        '/mge/service.sbr?serviceName=CRUDServiceProvider.saveRecord',
        data,
      );

      return {
        data: true,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: `Sankhya call error: ${
          error.serviceResponse?.statusMessage[0]
            ? atob(error.serviceResponse?.statusMessage[0])
            : 'network error'
        }`,
      };
    }
  }

  public async addPayer({
    payer_id,
    proposal_id,
    responsible,
  }: {
    payer_id: string;
    proposal_id: string;
    responsible: boolean;
  }): Promise<{
    data: boolean;
    error: string | null;
  }> {
    const data = `
      <serviceRequest serviceName="CRUDServiceProvider.saveRecord">
        <requestBody>
          <dataSet rootEntity="AD_DCPPROPCOMP" includePresentationFields="S">
            <entity path="">
              <fieldset list="*" />
            </entity>
            <dataRow>
              <localFields>
                <NUDCPPROP>${proposal_id}</NUDCPPROP>
                <CODPARC>${payer_id}</CODPARC>
                <RESPBOLETO>${responsible ? 'S' : 'N'}</RESPBOLETO>
                <PARCPROCURADOR></PARCPROCURADOR>
              </localFields>
            </dataRow>
          </dataSet>
        </requestBody>
      </serviceRequest>
    `;

    try {
      await sankhya.post(
        '/mge/service.sbr?serviceName=CRUDServiceProvider.saveRecord',
        data,
      );

      return {
        data: true,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: `Sankhya call error: ${
          error.serviceResponse?.statusMessage[0]
            ? atob(error.serviceResponse?.statusMessage[0])
            : 'network error'
        }`,
      };
    }
  }

  public async comissions({
    comissions,
    proposal_id,
  }: {
    proposal_id: string;
    comissions: Array<{
      type: string;
      venc: string;
      price: string;
    }>;
  }): Promise<{
    data: boolean;
    error: string | null;
  }> {
    const data = `
      <serviceRequest serviceName="CRUDServiceProvider.saveRecord">
        <requestBody>
          <dataSet rootEntity="AD_DCPCOMISSOES" includePresentationFields="S">
            <entity path="">
              <fieldset list="*" />
            </entity>${comissions.map(
              item => `
            <dataRow>
              <localFields>
                <NUDCPPROP>${proposal_id}</NUDCPPROP>
                <TIPOCOM>${item.type}</TIPOCOM>
                <DTVENC>${item.venc}</DTVENC>
                <VLRCOMISSAO>${item.price}</VLRCOMISSAO>
              </localFields>
            </dataRow>`,
            )}
          </dataSet>
        </requestBody>
      </serviceRequest>
    `;

    try {
      await sankhya.post(
        '/mge/service.sbr?serviceName=CRUDServiceProvider.saveRecord',
        data,
      );

      return {
        data: true,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: `Sankhya call error: ${
          error.serviceResponse?.statusMessage[0]
            ? atob(error.serviceResponse?.statusMessage[0])
            : 'network error'
        }`,
      };
    }
  }

  public async sendProposal({
    proposal_id,
  }: {
    proposal_id: string;
  }): Promise<{
    data: boolean;
    error: string | null;
  }> {
    const data = `
      <serviceRequest serviceName="CRUDServiceProvider.saveRecord">
        <requestBody>
          <dataSet rootEntity="AD_DCPPROPOSTA" includePresentationFields="S">
            <entity path="">
              <fieldset list="*" />
            </entity>
            <dataRow>
              <localFields>
                <GERPROP>S</GERPROP>
              </localFields>
              <key>
                <NUDCPPROP>${proposal_id}</NUDCPPROP>
              </key>
            </dataRow>
          </dataSet>
        </requestBody>
      </serviceRequest>
    `;

    try {
      await sankhya.post(
        '/mge/service.sbr?serviceName=CRUDServiceProvider.saveRecord',
        data,
      );

      return {
        data: true,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: `Sankhya call error: ${
          error.serviceResponse?.statusMessage[0]
            ? atob(error.serviceResponse?.statusMessage[0])
            : 'network error'
        }`,
      };
    }
  }
}

export default SankhyaProvider;
