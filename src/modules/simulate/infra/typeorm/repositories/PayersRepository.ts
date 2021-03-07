import { getRepository, Repository } from 'typeorm';

import IPayersRepository from '@modules/simulate/repositories/IPayersRepository';
import ICreatePayerDTO from '@modules/simulate/dtos/ICreatePayerDTO';

import Payer from '../entities/Payer';

class PayersRepository implements IPayersRepository {
  private ormRepository: Repository<Payer>;

  constructor() {
    this.ormRepository = getRepository(Payer);
  }

  public async findById(id: string): Promise<Payer | undefined> {
    const payer = await this.ormRepository.findOne(id);

    return payer;
  }

  public async list(): Promise<Payer[]> {
    const payers = await this.ormRepository.find({
      relations: ['attendance', 'lot'],
    });

    return payers;
  }

  public async delete(payer: Payer): Promise<void> {
    await this.ormRepository.delete({ id: payer.id });
  }

  public async create(data: ICreatePayerDTO): Promise<Payer> {
    const payer = this.ormRepository.create(data);

    await this.ormRepository.save(payer);

    return payer;
  }

  public async save(data: Payer): Promise<Payer> {
    return this.ormRepository.save(data);
  }
}

export default PayersRepository;
