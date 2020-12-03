import { Request, Response } from 'express';

import SendProposalService from '@modules/simulate/services/SendProposalService';

export default class SendProposalController {
  public async create(req: Request, res: Response): Promise<Response> {
    const sendProposal = new SendProposalService();

    const proposal = await sendProposal.execute(req.body);

    return res.json(proposal);
  }
}
