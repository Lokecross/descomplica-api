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
        admin_price: Number(record?.COMADM[0]),
        admin_tax: Number(record?.PERCOMADM[0]),
        broker_price: Number(record?.COMCOR[0]),
        broker_tax: Number(record?.PERCOMCOR[0]),
        franchisee_price: Number(record?.COMFRAN[0]),
        franchisee_tax: Number(record?.PERCOMFRAN[0]),
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
