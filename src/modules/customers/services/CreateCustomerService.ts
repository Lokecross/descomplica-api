import { injectable, inject } from 'tsyringe';
import atob from 'atob';

import AppError from '@shared/errors/AppError';
import sankhya from '@shared/api/sankhya';

import Customer from '../infra/typeorm/entities/Customer';
import ICustomersRepository from '../repositories/ICustomersRepository';

interface IRequest {
  document: string;
  name: string;
  email: string;
  phone: string;
}

@injectable()
class CreateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute(reqData: IRequest): Promise<Customer> {
    const dataRegisterPayer = `
      <serviceRequest serviceName="CRUDServiceProvider.saveRecord">
        <requestBody>
          <dataSet rootEntity="AD_DCPCADPAR" includePresentationFields="S">
            <entity path="">
              <fieldset list="*" />
            </entity>
            <dataRow>
              <localFields>
                <CPF_CNPJ>${reqData.document}</CPF_CNPJ>
              </localFields>
            </dataRow>
          </dataSet>
        </requestBody>
      </serviceRequest>
    `;

    try {
      const simulation: any = await sankhya.post(
        '/mge/service.sbr?serviceName=CRUDServiceProvider.saveRecord',
        dataRegisterPayer,
      );

      const entity =
        simulation?.serviceResponse?.responseBody[0]?.entities[0]?.entity[0];

      const customer_sankhya_id = entity?.CODCADPAR[0];

      const dataRegisterPayer2 = `
        <serviceRequest serviceName="CRUDServiceProvider.saveRecord">
          <requestBody>
            <dataSet rootEntity="AD_DCPCADPAR" includePresentationFields="S">
              <entity path="">
                <fieldset list="*" />
              </entity>
              <dataRow>
                <localFields>
                  <NOMEPARC>${reqData.name}</NOMEPARC>
                  <TIPPESSOA>M</TIPPESSOA>
                  <EMAIL>${reqData.email}</EMAIL>
                  <TELEFONE1>${reqData.phone}</TELEFONE1>
                </localFields>
                <key>
                  <CODCADPAR>${customer_sankhya_id}</CODCADPAR>
                </key>
              </dataRow>
            </dataSet>
          </requestBody>
        </serviceRequest>
      `;

      await sankhya.post(
        '/mge/service.sbr?serviceName=CRUDServiceProvider.saveRecord',
        dataRegisterPayer2,
      );

      const customer = await this.customersRepository.create(reqData);

      return customer;
    } catch (error) {
      console.log(error);
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

export default CreateCustomerService;
