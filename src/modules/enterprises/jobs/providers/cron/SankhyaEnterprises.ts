import { CronJob } from 'cron';

import { container } from 'tsyringe';

import sankhya from '@shared/api/sankhya';

import CreateEnterpriseService from '@modules/enterprises/services/CreateEnterpriseService';
import FindEnterpriseSankhyaIdService from '@modules/enterprises/services/FindEnterpriseSankhyaIdService';
import UpdateEnterpriseService from '@modules/enterprises/services/UpdateEnterpriseService';

const job = new CronJob(
  '0 * * * * *',
  async () => {
    try {
      const createEnterpriseService = container.resolve(
        CreateEnterpriseService,
      );
      const findEnterpriseSankhyaIdService = container.resolve(
        FindEnterpriseSankhyaIdService,
      );
      const updateEnterpriseService = container.resolve(
        UpdateEnterpriseService,
      );

      const dataEnterprises = `
        <serviceRequest serviceName="CRUDServiceProvider.loadView">
          <requestBody>
            <query viewName="V_FACILITA_LOTEAMENTOS" orderBy="DESCRICAO">
              <fields>
                <field>COD_LOTEAMENTO</field>
                <field>DESCRICAO</field>
                <field>DESCRICAO_ABREV</field>
                <field>CIDADE</field>
                <field>UF</field>
                <field>BAIRRO</field>
                <field>QTD_RESERVA_CORRETOR</field>
                <field>TEMPO_RESERVA</field>
              </fields>
            </query>
          </requestBody>
        </serviceRequest>
      `;

      const enterprisesResponse: any = await sankhya.post(
        '/mge/service.sbr?serviceName=CRUDServiceProvider.loadView',
        dataEnterprises,
      );

      type enterprisesTypes = {
        sankhya_id: string;
        name: string;
        name_abbreviated: string;
        city: string;
        uf: string;
        village: string;
        reservation_amount: string;
        reservation_timer: string;
      };

      const enterprises: enterprisesTypes[] = enterprisesResponse.serviceResponse.responseBody[0].records[0].record.map(
        (item: any) => ({
          sankhya_id: item.COD_LOTEAMENTO[0],
          name: item.DESCRICAO[0],
          name_abbreviated: item.DESCRICAO_ABREV[0],
          city: item.CIDADE[0],
          uf: item.UF[0],
          village: item.BAIRRO[0],
          reservation_amount: item.QTD_RESERVA_CORRETOR[0],
          reservation_timer: item.TEMPO_RESERVA[0],
        }),
      );

      enterprises.forEach(item => {
        const doEach = async () => {
          try {
            const brokerExists = await findEnterpriseSankhyaIdService.execute({
              sankhya_id: item.sankhya_id,
            });

            await updateEnterpriseService.execute({
              id: brokerExists.id,
              ...item,
            });
          } catch (error) {
            await createEnterpriseService.execute(item);
          }
        };

        doEach();
      });
    } catch (err) {
      // console.log(err);
    }
  },
  null,
  true,
  'America/Sao_Paulo',
);

job.start();
