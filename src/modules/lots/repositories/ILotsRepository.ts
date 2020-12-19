import Lot from '../infra/typeorm/entities/Lot';
import ICreateLotDTO from '../dtos/ICreateLotDTO';

export default interface ILotsRepository {
  create(data: ICreateLotDTO): Promise<Lot>;
  findById(id: string): Promise<Lot | undefined>;
  findBySankhyaId(sankhya_id: string): Promise<Lot | undefined>;
  list(): Promise<Lot[]>;
  listByEnterprise(enterprise_id: string): Promise<Lot[]>;
  save(lot: Lot): Promise<Lot>;
}
