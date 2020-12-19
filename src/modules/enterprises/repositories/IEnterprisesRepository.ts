import Enterprise from '../infra/typeorm/entities/Enterprise';
import ICreateEnterpriseDTO from '../dtos/ICreateEnterpriseDTO';

export default interface IEnterprisesRepository {
  create(data: ICreateEnterpriseDTO): Promise<Enterprise>;
  findById(id: string): Promise<Enterprise | undefined>;
  findBySankhyaId(sankhya_id: string): Promise<Enterprise | undefined>;
  list(): Promise<Enterprise[]>;
  save(enterprise: Enterprise): Promise<Enterprise>;
}
