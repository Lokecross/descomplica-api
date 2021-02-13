import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ISankhyaProvider from '@shared/container/providers/Sankhya/models/ISankhyaProvider';

interface IRequest {
  proposal_id: string;
  comissions: Array<{
    type: string;
    venc: string;
    price: string;
  }>;
}

@injectable()
class ComissionsService {
  constructor(
    @inject('SankhyaProvider')
    private sankhyaProvider: ISankhyaProvider,
  ) {}

  public async execute({ comissions, proposal_id }: IRequest): Promise<any> {
    const { data, error } = await this.sankhyaProvider.comissions({
      comissions,
      proposal_id,
    });

    if (error) {
      throw new AppError(error);
    }

    return data;
  }
}

export default ComissionsService;
