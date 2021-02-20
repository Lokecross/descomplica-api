import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateProposalService from '@modules/simulate/services/CreateProposalService';

export default class CreateProposalController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const createProposal = container.resolve(CreateProposalService);

    const proposal = await createProposal.execute({
      simulateId: id,
      userId: req.user.id,
    });

    return res.json(proposal);
  }
}
