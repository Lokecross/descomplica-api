import atob from 'atob';

import AppError from '@shared/errors/AppError';
import sankhya from '@shared/api/sankhya';

interface IRequest {
  first_date: string;
  readjustment: string;
  financed: string;
  document: string;
  name: string;
  email: string;
  phone: string;
  corretor_cpf: string;
  lot_id: string;
  input: string;
  price: string;
  proposal: string;
  franquia: string;
  corretor: string;
  admin: string;
  input_venc: string;
  is_price: boolean;
  installments: string;
  period: string;
  installment: string;
  tax: string;
  is_financed: boolean;
}

class CreateReservetionService {
  public async execute({
    first_date,
    readjustment,
    financed,
    document,
    name,
    email,
    phone,
    corretor_cpf,
    lot_id,
    input,
    price,
    proposal,
    franquia,
    corretor,
    admin,
    input_venc,
    is_price,
    installments,
    period,
    installment,
    tax,
    is_financed,
  }: IRequest): Promise<any> {
    try {
      const dataCorretor = `
        <serviceRequest serviceName="CRUDServiceProvider.loadView">
          <requestBody>
            <query viewName="V_FACILITA_CORRETORES" orderBy="CODIGO">
              <fields>
                <field>CODIGO</field>
                <field>USUARIO</field>
                <field>DTADMISSAO</field>
                <field>CPF</field>
                <field>CORRETOR</field>
                <field>APELIDO</field>
                <field>EMAIL</field>
                <field>TELEFONE</field>
                <field>CRECI</field>
                <field>CRECI_REGIAO</field>
                <field>COD_GERENTE</field>
                <field>COD_SUPERVISOR</field>
              </fields>
              <where>CPF='${corretor_cpf}'</where>
            </query>
          </requestBody>
        </serviceRequest>
      `;

      const corretorSankhya: any = await sankhya.post(
        '/mge/service.sbr?serviceName=CRUDServiceProvider.loadView',
        dataCorretor,
      );

      const recordCorretor =
        corretorSankhya?.serviceResponse?.responseBody[0]?.records[0]
          ?.record[0];

      const corretor_id = recordCorretor?.CODIGO[0];
      const supervisor_id = recordCorretor?.COD_SUPERVISOR[0];
      const gerente_id = recordCorretor?.COD_GERENTE[0];

      const dataReservation = `
        <serviceRequest serviceName="CRUDServiceProvider.saveRecord">
          <requestBody>
            <dataSet rootEntity="TIMRLC" includePresentationFields="S">
              <entity path="">
                <fieldset list="*" />
              </entity>
              <dataRow>
                <localFields>
                  <LTECODIGO>${lot_id}</LTECODIGO>
                  <PPRCODIGO></PPRCODIGO>
                  <PPRCPFCNPJ>${document}</PPRCPFCNPJ>
                  <PPRTIPO>F</PPRTIPO>
                  <PPRSEXO>M</PPRSEXO>
                  <PPRNOME>${name}</PPRNOME>
                  <PPREMAIL>${email}</PPREMAIL>
                  <PPRTELEFONES>${phone}</PPRTELEFONES>
                  <PPROBSERVACAO>Observação</PPROBSERVACAO>
                  <CORCODIGO>${corretor_id}</CORCODIGO>
                </localFields>
              </dataRow>
            </dataSet>
          </requestBody>
        </serviceRequest>
      `;

      const reservation: any = await sankhya.post(
        '/mge/service.sbr?serviceName=CRUDServiceProvider.saveRecord',
        dataReservation,
      );

      const recordReservation =
        reservation?.serviceResponse?.responseBody[0]?.entities[0]?.entity[0];

      const reservation_id = recordReservation?.RLCCODIGO[0];

      const dataContract = `
        <serviceRequest serviceName="CRUDServiceProvider.saveRecord">
          <requestBody>
            <dataSet rootEntity="AD_DCPPROPOSTA" includePresentationFields="S">
              <entity path="">
                <fieldset list="*" />
              </entity>
              <dataRow>
              <localFields>
                <LTVIMVESTIMENTO>MO</LTVIMVESTIMENTO>
                <LTECODIGO>${lot_id}</LTECODIGO>
                <LTVPRECODOLOTE>${price}</LTVPRECODOLOTE>
                <LTVPRAZOESCRITURA>2M</LTVPRAZOESCRITURA>
                <LTVRECAFRANQUIA>${franquia}</LTVRECAFRANQUIA>
                <LTVRECACORRETOR>${corretor}</LTVRECACORRETOR>
                <LTVRECAADM>${admin}</LTVRECAADM>
                <LTVPRECOVENDIDO>${proposal}</LTVPRECOVENDIDO>
                <LTVVALORFECHAMENTO>${proposal}</LTVVALORFECHAMENTO>
                <LTVPARCARRAS></LTVPARCARRAS>
                <LTVPRIPARARRAS></LTVPRIPARARRAS>
                <LTVENTRADA>${input}</LTVENTRADA>
                <LTVQTPPARENTRADA>1</LTVQTPPARENTRADA>
                <LTVVENCPARENTRADA>${input_venc}</LTVVENCPARENTRADA>
                <LTVMAISJUROS>${tax}</LTVMAISJUROS>
                <LTVTABELAPRICE>${is_price ? 'S' : 'N'}</LTVTABELAPRICE>
                <LTVPARCELAS>${installments}</LTVPARCELAS>
                <LTVINDICECORRECAO>1</LTVINDICECORRECAO>
                <LTVPERIODICIDADE>${period}</LTVPERIODICIDADE>
                <LTVCORRETOR>${corretor_id}</LTVCORRETOR>
                <LTVSUPERVISORCOR>${supervisor_id}</LTVSUPERVISORCOR>
                <LTVGERENTECOR>${gerente_id}</LTVGERENTECOR>
                <LTVPRIMEIRAPARCELA>${first_date}</LTVPRIMEIRAPARCELA>
                <LTVPROXREAJUSTE>${readjustment}</LTVPROXREAJUSTE>
                <LTVGERAARRAS></LTVGERAARRAS>
                <LTVGERAFINANC>${is_financed ? 'S' : 'N'}</LTVGERAFINANC>
                <LTVGERAFINANCENT></LTVGERAFINANCENT>
                <LTVTOTALDIFER>0</LTVTOTALDIFER>
                <LTVVLRFINANC>${financed}</LTVVLRFINANC>
                <LTVVALORPARCELA>${installment}</LTVVALORPARCELA>
                <LTVDTULTREAJUSTE>${first_date}</LTVDTULTREAJUSTE>
                <LTVVLRTOTALINTERMED>0</LTVVLRTOTALINTERMED>
                <LTVVLRTOTALBALAO>0</LTVVLRTOTALBALAO>
                <RLCCODIGO>${reservation_id}</RLCCODIGO>
              </localFields>
              </dataRow>
            </dataSet>
          </requestBody>
        </serviceRequest>
      `;

      const contract: any = await sankhya.post(
        '/mge/service.sbr?serviceName=CRUDServiceProvider.saveRecord',
        dataContract,
      );

      const recordContract =
        contract?.serviceResponse?.responseBody[0]?.entities[0]?.entity[0];
      const id = recordContract?.NUDCPPROP[0];

      return { id };
    } catch (error) {
      console.log(JSON.stringify(error));
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

export default CreateReservetionService;
