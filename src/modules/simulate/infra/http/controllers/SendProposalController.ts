import { Request, Response } from 'express';

import SendProposalService from '@modules/simulate/services/SendProposalService';
import { container } from 'tsyringe';

export default class SendProposalController {
  public async create(req: Request, res: Response): Promise<Response> {
    const sendProposal = container.resolve(SendProposalService);

    const proposal = await sendProposal.execute(req.body);

    return res.json(proposal);
  }
}
