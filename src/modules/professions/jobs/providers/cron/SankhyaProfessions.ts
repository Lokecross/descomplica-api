import { CronJob } from 'cron';

import { container } from 'tsyringe';

import sankhya from '@shared/api/sankhya';

import CreateProfessionService from '@modules/professions/services/CreateProfessionService';
import FindProfessionSankhyaIdService from '@modules/professions/services/FindProfessionSankhyaIdService';
import UpdateProfessionService from '@modules/professions/services/UpdateProfessionService';

const job = new CronJob(
  '0 0 * * * *',
  async () => {
    try {
      const createProfessionService = container.resolve(
        CreateProfessionService,
      );
      const findProfessionSankhyaIdService = container.resolve(
        FindProfessionSankhyaIdService,
      );
      const updateProfessionService = container.resolve(
        UpdateProfessionService,
      );

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

      const professionsResponse: any = await sankhya.post(
        '/mge/service.sbr?serviceName=CRUDServiceProvider.loadView',
        dataProfessions,
      );

      type professionsTypes = {
        sankhya_id: string;
        name: string;
      };

      const professions: professionsTypes[] = professionsResponse.serviceResponse.responseBody[0].records[0].record.map(
        (item: any) => ({
          sankhya_id: item.CODIGO[0],
          name: item.PROFISSAO[0],
        }),
      );

      await Promise.all(
        professions.map(async item => {
          try {
            const brokerExists = await findProfessionSankhyaIdService.execute({
              sankhya_id: item.sankhya_id,
            });

            await updateProfessionService.execute({
              id: brokerExists.id,
              ...item,
            });
          } catch (error) {
            await createProfessionService.execute(item);
          }
        }),
      );
    } catch (err) {
      // console.log(err);
    }
  },
  null,
  true,
  'America/Sao_Paulo',
);

job.start();
