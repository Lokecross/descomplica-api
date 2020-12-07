import { Request, Response } from 'express';

import ListProfessionsService from '@modules/simulate/services/ListProfessionsService';

export default class ProfessionsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listProfessions = new ListProfessionsService();

    const professions = await listProfessions.execute();

    return res.json(professions);
  }
}
