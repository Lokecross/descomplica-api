import { uuid } from 'uuidv4';

import ICreatePayerDTO from '../../dtos/ICreatePayerDTO';
import IPayersRepository from '../IPayersRepository';

import Payer from '../../infra/typeorm/entities/Payer';

class FakePayersRepository implements IPayersRepository {
  private payers: Payer[] = [];

  public async findById(id: string): Promise<Payer | undefined> {
    const payer = this.payers.find(item => item.id === id);

    return payer;
  }

  public async list(): Promise<Payer[]> {
    return this.payers;
  }

  public async delete(payer: Payer): Promise<void> {
    this.payers = this.payers.filter(item => item.id !== payer.id);
  }

  public async create(data: ICreatePayerDTO): Promise<Payer> {
    const payer = new Payer();

    Object.assign(payer, { id: uuid() }, data);

    this.payers.push(payer);

    return payer;
  }

  public async save(payer: Payer): Promise<Payer> {
    const findIndex = this.payers.findIndex(item => item.id === payer.id);

    this.payers[findIndex] = payer;

    return payer;
  }
}

export default FakePayersRepository;
