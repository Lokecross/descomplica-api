import atob from 'atob';

import AppError from '@shared/errors/AppError';
import sankhya from '@shared/api/sankhya';

interface IRequest {
  proposal_id: string;
}

class SendProposalService {
  public async execute({ proposal_id }: IRequest): Promise<any> {
    const dataSendProposal = `
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
      const sendProposal: any = await sankhya.post(
        '/mge/service.sbr?serviceName=CRUDServiceProvider.saveRecord',
        dataSendProposal,
      );

      return sendProposal;
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

export default SendProposalService;
