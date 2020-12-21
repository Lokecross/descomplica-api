import Profession from '../infra/typeorm/entities/Profession';
import ICreateProfessionDTO from '../dtos/ICreateProfessionDTO';

export default interface IProfessionsRepository {
  create(data: ICreateProfessionDTO): Promise<Profession>;
  findById(id: string): Promise<Profession | undefined>;
  findBySankhyaId(sankhya_id: string): Promise<Profession | undefined>;
  list(): Promise<Profession[]>;
  save(profession: Profession): Promise<Profession>;
}
