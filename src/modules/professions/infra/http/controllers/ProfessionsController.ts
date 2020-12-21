import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ListProfessionsService from '@modules/professions/services/ListProfessionsService';

export default class ProfessionsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listProfessions = container.resolve(ListProfessionsService);

    const professions = await listProfessions.execute();

    return res.json(professions);
  }
}
