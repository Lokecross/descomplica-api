import { getRepository, Repository } from 'typeorm';

import ILotsRepository from '@modules/lots/repositories/ILotsRepository';
import ICreateLotDTO from '@modules/lots/dtos/ICreateLotDTO';

import Lot from '../entities/Lot';

class LotsRepository implements ILotsRepository {
  private ormRepository: Repository<Lot>;

  constructor() {
    this.ormRepository = getRepository(Lot);
  }

  public async create(reqData: ICreateLotDTO): Promise<Lot> {
    const broker = this.ormRepository.create(reqData);

    await this.ormRepository.save(broker);

    return broker;
  }

  public async findById(id: string): Promise<Lot | undefined> {
    const broker = this.ormRepository.findOne(id);

    return broker;
  }

  public async findBySankhyaId(sankhya_id: string): Promise<Lot | undefined> {
    const lot = this.ormRepository.findOne({
      where: {
        sankhya_id,
      },
    });

    return lot;
  }

  public async list(): Promise<Lot[]> {
    const brokers = await this.ormRepository.find();

    return brokers;
  }

  public async listByEnterprise(enterprise_id: string): Promise<Lot[]> {
    const lots = await this.ormRepository.find({
      where: {
        enterprise: {
          id: enterprise_id,
        },
      },
    });

    return lots;
  }

  public async save(broker: Lot): Promise<Lot> {
    return this.ormRepository.save(broker);
  }
}

export default LotsRepository;
