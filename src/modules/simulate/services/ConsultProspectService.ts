import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ISankhyaProvider from '@shared/container/providers/Sankhya/models/ISankhyaProvider';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';

interface IRequest {
  document: string;
}

@injectable()
class ConsultProspectService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,

    @inject('SankhyaProvider')
    private sankhyaProvider: ISankhyaProvider,
  ) {}

  public async execute({ document }: IRequest): Promise<any> {
    const customer = await this.customersRepository.findByDocument(document);

    if (customer) {
      return {
        name: customer.name,
        gender: customer.gender,
        email: customer.email,
        phone: customer.phone,
      };
    }

    const { data, error } = await this.sankhyaProvider.prospect(document);

    if (error) {
      throw new AppError(error);
    }

    return data;
  }
}

export default ConsultProspectService;
