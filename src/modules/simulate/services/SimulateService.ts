import atob from 'atob';

import AppError from '@shared/errors/AppError';
import sankhya from '@shared/api/sankhya';

interface IRequest {
  code_id: string;
}

class SimulateService {
  public async execute({ code_id }: IRequest): Promise<any> {
    const dataSimulate = `
      <serviceRequest serviceName="CRUDServiceProvider.loadView">
        <requestBody>
          <query viewName="VW_DESCOMPLICA_SIMLOTE">
            <fields>
              <field>COD_LOTE</field>
              <field>COD_LOTEAMENTO</field>
              <field>VALOR</field>
              <field>COMADM</field>
              <field>COMPROP</field>
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
        dataSimulate,
      );

      const record =
        simulation?.serviceResponse?.responseBody[0]?.records[0]?.record[0];

      return {
        price: Number(record?.VALOR[0]),
        tax: Number(record?.TXJUROSFINANC[0]),
        qtdMinParc: Number(record?.QTDMINPARC[0]),
        qtdMaxParc: Number(record?.QTDMAXPARC[0]),
        period: Number(record?.PERIODICIDADE[0]),
      };
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

export default SimulateService;
