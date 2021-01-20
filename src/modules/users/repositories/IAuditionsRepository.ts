import Audition from '../infra/typeorm/entities/Audition';
import ICreateAuditionDTO from '../dtos/ICreateAuditionDTO';

export default interface IAuditionsRepository {
  list(): Promise<Audition[]>;
  create(data: ICreateAuditionDTO): Promise<Audition>;
}
