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
                <PPRSEXO>M</PPRSEXO>
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
}

export default SankhyaProvider;
