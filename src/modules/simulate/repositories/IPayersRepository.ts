import Payer from '../infra/typeorm/entities/Payer';
import ICreatePayerDTO from '../dtos/ICreatePayerDTO';

export default interface IPayersRepository {
  findById(id: string): Promise<Payer | undefined>;
  list(): Promise<Payer[]>;
  delete(payer: Payer): Promise<void>;
  create(data: ICreatePayerDTO): Promise<Payer>;
  save(data: Payer): Promise<Payer>;
}
