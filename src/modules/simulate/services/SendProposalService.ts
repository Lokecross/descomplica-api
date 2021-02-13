import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ISankhyaProvider from '@shared/container/providers/Sankhya/models/ISankhyaProvider';

interface IRequest {
  proposal_id: string;
}

@injectable()
class SendProposalService {
  constructor(
    @inject('SankhyaProvider')
    private sankhyaProvider: ISankhyaProvider,
  ) {}

  public async execute({ proposal_id }: IRequest): Promise<any> {
    const { data, error } = await this.sankhyaProvider.sendProposal({
      proposal_id,
    });

    if (error) {
      throw new AppError(error);
    }

    return data;
  }
}

export default SendProposalService;
