import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ISankhyaProvider from '@shared/container/providers/Sankhya/models/ISankhyaProvider';

interface IRequest {
  document: string;
}

@injectable()
class ShowPartnerByCpfService {
  constructor(
    @inject('SankhyaProvider')
    private sankhyaProvider: ISankhyaProvider,
  ) {}

  public async execute({ document }: IRequest): Promise<any> {
    const payer = await this.sankhyaProvider.createPayer({
      document,
    });

    if (payer.error) {
      throw new AppError(payer.error);
    }

    return payer.data;
  }
}

export default ShowPartnerByCpfService;
