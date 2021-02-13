import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ISankhyaProvider from '@shared/container/providers/Sankhya/models/ISankhyaProvider';

interface IRequest {
  code_id: string;
}

@injectable()
class SimulateService {
  constructor(
    @inject('SankhyaProvider')
    private sankhyaProvider: ISankhyaProvider,
  ) {}

  public async execute({ code_id }: IRequest): Promise<any> {
    const { data, error } = await this.sankhyaProvider.simulate(code_id);

    if (error) {
      throw new AppError(error);
    }

    return data;
  }
}

export default SimulateService;
