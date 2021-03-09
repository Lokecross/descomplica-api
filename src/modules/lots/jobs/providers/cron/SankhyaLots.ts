import { CronJob } from 'cron';

import { container } from 'tsyringe';

import sankhya from '@shared/api/sankhya';

import CreateLotService from '@modules/lots/services/CreateLotService';
import FindLotSankhyaIdService from '@modules/lots/services/FindLotSankhyaIdService';
import UpdateLotService from '@modules/lots/services/UpdateLotService';
import ListEnterprisesService from '@modules/enterprises/services/ListEnterprisesService';

const job = new CronJob(
  '0 15 * * * *',
  async () => {
    try {
      const createLotService = container.resolve(CreateLotService);
      const findLotSankhyaIdService = container.resolve(
        FindLotSankhyaIdService,
      );
      const updateLotService = container.resolve(UpdateLotService);
      const listEnterprisesService = container.resolve(ListEnterprisesService);

      const enterprises = await listEnterprisesService.execute();

      enterprises.forEach(item => {
        const doEach = async () => {
          try {
            const dataLots = `
              <serviceRequest serviceName="CRUDServiceProvider.loadView">
                <requestBody>
                  <query viewName="V_FACILITA_LOTES" orderBy="LOTE">
                    <fields>
                      <field>COD_LOTEAMENTO</field>
                      <field>LOTEAMENTO</field>
                      <field>COD_LOTE</field>
                      <field>LOTE</field>
                      <field>VALOR</field>
                      <field>AREA</field>
                      <field>RUA</field>
                      <field>QUADRA</field>
                      <field>SIGLA_SITUACAO</field>
                      <field>SITUACAO</field>
                      <field>X</field>
                      <field>Y</field>
                      <field>CNFDIREITA</field>
                      <field>CNFESQUERDA</field>
                      <field>CNFFRENTE</field>
                      <field>CNFFUNDO</field>
                      <field>CNFCHANFRO</field>
                      <field>CNFVARIANTE</field>
                      <field>MEDFRENTE</field>
                      <field>MEDFUNDO</field>
                      <field>MEDDIREITA</field>
                      <field>MEDESQUERDA</field>
                      <field>MEDCHANFRO</field>
                      <field>MEDVARIANTE</field>
                      <field>TEMPO_RESERVA</field>
                      <field>OBS</field>
                      <field>ALTERACAO</field>
                      <field>CADASTRO</field>
                    </fields>
                    <where>COD_LOTEAMENTO=${item.sankhya_id}</where>
                  </query>
                </requestBody>
              </serviceRequest>
            `;

            const lotsResponse: any = await sankhya.post(
              '/mge/service.sbr?serviceName=CRUDServiceProvider.loadView',
              dataLots,
            );

            type lotsTypes = {
              enterpriseId: string;
              sankhya_id: string;
              enterprise_sankhya_id: string;
              name: string;
              price: string;
              area: string;
              address: string;
              block: string;
              initials_situation: string;
              situation: string;
              x: string;
              y: string;
              config_right: string;
              config_left: string;
              config_front: string;
              config_back: string;
              config_chamfer: string;
              config_variant: string;
              measure_front: string;
              measure_back: string;
              measure_right: string;
              measure_left: string;
              measure_chamfer: string;
              measure_variant: string;
              reservation_timer: string;
              note: string;
            };

            const lots: lotsTypes[] = lotsResponse.serviceResponse.responseBody[0].records[0].record.map(
              (itemLot: any) => ({
                enterpriseId: item.id,
                sankhya_id: itemLot.COD_LOTE[0],
                enterprise_sankhya_id: itemLot.COD_LOTEAMENTO[0],
                name: itemLot.LOTE[0],
                price: itemLot.VALOR[0],
                area: itemLot.AREA[0],
                address: itemLot.RUA[0],
                block: itemLot.QUADRA[0],
                initials_situation: itemLot.SIGLA_SITUACAO[0],
                situation: itemLot.SITUACAO[0],
                x: itemLot.X[0],
                y: itemLot.Y[0],
                config_right: itemLot.CNFDIREITA[0],
                config_left: itemLot.CNFESQUERDA[0],
                config_front: itemLot.CNFFRENTE[0],
                config_back: itemLot.CNFFUNDO[0],
                config_chamfer: itemLot.CNFCHANFRO[0],
                config_variant: itemLot.CNFVARIANTE[0],
                measure_front: itemLot.MEDFRENTE[0],
                measure_back: itemLot.MEDFUNDO[0],
                measure_right: itemLot.MEDDIREITA[0],
                measure_left: itemLot.MEDESQUERDA[0],
                measure_chamfer: itemLot.MEDCHANFRO[0],
                measure_variant: itemLot.MEDVARIANTE[0],
                reservation_timer: itemLot.TEMPO_RESERVA[0],
                note: itemLot.OBS[0],
              }),
            );

            await Promise.all(
              lots.map(async itemLot => {
                try {
                  const brokerExists = await findLotSankhyaIdService.execute({
                    sankhya_id: itemLot.sankhya_id,
                  });

                  await updateLotService.execute({
                    id: brokerExists.id,
                    ...itemLot,
                  });
                } catch {
                  try {
                    await createLotService.execute(itemLot);
                  } catch (err) {
                    // console.log(err);
                  }
                }
              }),
            );
          } catch (error) {
            //
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
