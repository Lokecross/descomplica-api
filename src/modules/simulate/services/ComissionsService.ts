import atob from 'atob';

import AppError from '@shared/errors/AppError';
import sankhya from '@shared/api/sankhya';

interface IRequest {
  proposal_id: string;
  comissions: Array<{
    type: string;
    venc: string;
    price: string;
  }>;
}

class ComissionsService {
  public async execute({ proposal_id, comissions }: IRequest): Promise<any> {
    try {
      const dataComission = `
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

      console.log(dataComission);

      const comission: any = await sankhya.post(
        '/mge/service.sbr?serviceName=CRUDServiceProvider.saveRecord',
        dataComission,
      );

      return comission;
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

export default ComissionsService;
