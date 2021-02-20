import Comission from '../infra/typeorm/entities/Comission';
import ICreateComissionDTO from '../dtos/ICreateComissionDTO';

export default interface IComissionsRepository {
  findById(id: string): Promise<Comission | undefined>;
  list(): Promise<Comission[]>;
  create(data: ICreateComissionDTO): Promise<Comission>;
  save(data: Comission): Promise<Comission>;
}
