import { Request, Response } from 'express';

import { container } from 'tsyringe';

import FindBrokerCpfService from '@modules/brokers/services/FindBrokerCpfService';

export default class BrokersCpfController {
  public async show(req: Request, res: Response): Promise<Response> {
    const { cpf } = req.params;

    const findBroker = container.resolve(FindBrokerCpfService);

    const broker = await findBroker.execute({ cpf });

    return res.json(broker);
  }
}
