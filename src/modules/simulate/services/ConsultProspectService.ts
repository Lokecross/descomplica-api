import atob from 'atob';

import AppError from '@shared/errors/AppError';
import sankhya from '@shared/api/sankhya';

interface IRequest {
  document: string;
}

class ConsultProspectService {
  public async execute({ document }: IRequest): Promise<any> {
    const dataSimulate = `
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
        dataSimulate,
      );

      const records = simulation?.serviceResponse?.responseBody[0]?.records[0];
      const record = records?.record[0];

      if (records === '') {
        throw new AppError('Prospect does not exists');
      }

      return {
        prospect_id: record?.COD_PROSPECT[0],
        name: record?.NOME[0],
        gender: record?.TIPPESSOA[0],
        email: record?.EMAIL[0],
        phone: record?.TELEFONE[0],
      };
    } catch (error) {
      console.log(error);
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

export default ConsultProspectService;
