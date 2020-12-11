import atob from 'atob';

import AppError from '@shared/errors/AppError';
import sankhya from '@shared/api/sankhya';

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

class CreatePayerService {
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
    try {
      const dataPayerCreate = `
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

      const payerCreate: any = await sankhya.post(
        '/mge/service.sbr?serviceName=CRUDServiceProvider.saveRecord',
        dataPayerCreate,
      );

      console.log(JSON.stringify(payerCreate));

      const recordPayerCreate =
        payerCreate?.serviceResponse?.responseBody[0]?.entities[0]?.entity[0];
      const payer_id = recordPayerCreate?.CODCADPAR[0];

      const dataPayerEdit = `
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

      await sankhya.post(
        '/mge/service.sbr?serviceName=CRUDServiceProvider.saveRecord',
        dataPayerEdit,
      );

      const dataFileRg = `
        <serviceRequest serviceName="CRUDServiceProvider.saveRecord">
          <requestBody>
            <dataSet rootEntity="AD_DCPDOCS" includePresentationFields="S">
              <entity path="">
                <fieldset list="*" />
              </entity>
              <dataRow>
                <localFields>
                  <TIPODOC>RG</TIPODOC>
                  <NOMEARQ>arquivo.png</NOMEARQ>
                  <CODPARC>${payer_id}</CODPARC>
                  <CODCONTATO></CODCONTATO>
                  <CODCONTRATO>${proposal_id}</CODCONTRATO>
                  <MODULO>LTV</MODULO>
                  <DOCB64>${rg_b64}</DOCB64>
                </localFields>
              </dataRow>
            </dataSet>
          </requestBody>
        </serviceRequest>
      `;

      await sankhya.post(
        '/mge/service.sbr?serviceName=CRUDServiceProvider.saveRecord',
        dataFileRg,
      );

      const dataFileCpf = `
        <serviceRequest serviceName="CRUDServiceProvider.saveRecord">
          <requestBody>
            <dataSet rootEntity="AD_DCPDOCS" includePresentationFields="S">
              <entity path="">
                <fieldset list="*" />
              </entity>
              <dataRow>
                <localFields>
                  <TIPODOC>CPF</TIPODOC>
                  <NOMEARQ>arquivo.png</NOMEARQ>
                  <CODPARC>${payer_id}</CODPARC>
                  <CODCONTATO></CODCONTATO>
                  <CODCONTRATO>${proposal_id}</CODCONTRATO>
                  <MODULO>LTV</MODULO>
                  <DOCB64>${cpf_b64}</DOCB64>
                </localFields>
              </dataRow>
            </dataSet>
          </requestBody>
        </serviceRequest>
      `;

      await sankhya.post(
        '/mge/service.sbr?serviceName=CRUDServiceProvider.saveRecord',
        dataFileCpf,
      );

      const dataFileAddress = `
        <serviceRequest serviceName="CRUDServiceProvider.saveRecord">
          <requestBody>
            <dataSet rootEntity="AD_DCPDOCS" includePresentationFields="S">
              <entity path="">
                <fieldset list="*" />
              </entity>
              <dataRow>
                <localFields>
                  <TIPODOC>CE</TIPODOC>
                  <NOMEARQ>arquivo.png</NOMEARQ>
                  <CODPARC>${payer_id}</CODPARC>
                  <CODCONTATO></CODCONTATO>
                  <CODCONTRATO>${proposal_id}</CODCONTRATO>
                  <MODULO>LTV</MODULO>
                  <DOCB64>${address_b64}</DOCB64>
                </localFields>
              </dataRow>
            </dataSet>
          </requestBody>
        </serviceRequest>
      `;

      await sankhya.post(
        '/mge/service.sbr?serviceName=CRUDServiceProvider.saveRecord',
        dataFileAddress,
      );

      const dataFileMarriage = `
        <serviceRequest serviceName="CRUDServiceProvider.saveRecord">
          <requestBody>
            <dataSet rootEntity="AD_DCPDOCS" includePresentationFields="S">
              <entity path="">
                <fieldset list="*" />
              </entity>
              <dataRow>
                <localFields>
                  <TIPODOC>CC</TIPODOC>
                  <NOMEARQ>arquivo.png</NOMEARQ>
                  <CODPARC>${payer_id}</CODPARC>
                  <CODCONTATO></CODCONTATO>
                  <CODCONTRATO>${proposal_id}</CODCONTRATO>
                  <MODULO>LTV</MODULO>
                  <DOCB64>${marriage_b64}</DOCB64>
                </localFields>
              </dataRow>
            </dataSet>
          </requestBody>
        </serviceRequest>
      `;

      if (marital_status === 'CA') {
        await sankhya.post(
          '/mge/service.sbr?serviceName=CRUDServiceProvider.saveRecord',
          dataFileMarriage,
        );
      }

      const dataPayerContract = `
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

      const payerContract: any = await sankhya.post(
        '/mge/service.sbr?serviceName=CRUDServiceProvider.saveRecord',
        dataPayerContract,
      );

      return payerContract;
    } catch (error) {
      throw new AppError(
        `Sankhya call error: ${
          error.serviceResponse?.statusMessage[0]
            ? atob(error.serviceResponse?.statusMessage[0])
            : 'network error'
        }`,
      );
    }
  }
}

export default CreatePayerService;
