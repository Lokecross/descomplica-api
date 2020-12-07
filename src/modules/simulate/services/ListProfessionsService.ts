import atob from 'atob';

import AppError from '@shared/errors/AppError';
import sankhya from '@shared/api/sankhya';

class ListProfessionsService {
  public async execute(): Promise<any> {
    try {
      const dataProfessions = `
        <serviceRequest serviceName="CRUDServiceProvider.loadView">
          <requestBody>
            <query viewName="RZZ_DESCOMPLICA_PROFISSOES">
              <fields>
                <field>CODIGO</field>
                <field>PROFISSAO</field>
              </fields>
            </query>
          </requestBody>
        </serviceRequest>
      `;

      const professions: any = await sankhya.post(
        '/mge/service.sbr?serviceName=CRUDServiceProvider.loadView',
        dataProfessions,
      );

      const records =
        professions?.serviceResponse?.responseBody[0]?.records[0]?.record;

      const result = records?.map((item: any) => ({
        id: item?.CODIGO[0],
        name: item?.PROFISSAO[0],
      }));

      return result;
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

export default ListProfessionsService;
