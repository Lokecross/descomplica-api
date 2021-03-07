import { uuid } from 'uuidv4';

import ILotsRepository from '../ILotsRepository';
import ICreateLotDTO from '../../dtos/ICreateLotDTO';

import Lot from '../../infra/typeorm/entities/Lot';

class FakeLotsRepository implements ILotsRepository {
  private lots: Lot[] = [];

  public async create(reqData: ICreateLotDTO): Promise<Lot> {
    const lot = new Lot();

    Object.assign(lot, { id: uuid(), ...reqData });

    this.lots.push(lot);

    return lot;
  }

  public async findById(id: string): Promise<Lot | undefined> {
    const findLot = this.lots.find(lot => lot.id === id);

    return findLot;
  }

  public async findByIdWithRelations(id: string): Promise<Lot | undefined> {
    const findLot = this.lots.find(lot => lot.id === id);

    return findLot;
  }

  public async findBySankhyaId(sankhya_id: string): Promise<Lot | undefined> {
    const findLot = this.lots.find(lot => lot.sankhya_id === sankhya_id);

    return findLot;
  }

  public async list(): Promise<Lot[]> {
    return this.lots;
  }

  public async listByEnterprise(enterprise_id: string): Promise<Lot[]> {
    return this.lots.filter(item => item.enterprise.id === enterprise_id);
  }

  public async save(lot: Lot): Promise<Lot> {
    const findIndex = this.lots.findIndex(findLot => findLot.id === lot.id);

    this.lots[findIndex] = lot;

    return lot;
  }
}

export default FakeLotsRepository;
