import { getRepository, Repository } from 'typeorm';

import IEnterprisesRepository from '@modules/enterprises/repositories/IEnterprisesRepository';
import ICreateEnterpriseDTO from '@modules/enterprises/dtos/ICreateEnterpriseDTO';

import Enterprise from '../entities/Enterprise';

class EnterprisesRepository implements IEnterprisesRepository {
  private ormRepository: Repository<Enterprise>;

  constructor() {
    this.ormRepository = getRepository(Enterprise);
  }

  public async create(reqData: ICreateEnterpriseDTO): Promise<Enterprise> {
    const enterprise = this.ormRepository.create(reqData);

    await this.ormRepository.save(enterprise);

    return enterprise;
  }

  public async findById(id: string): Promise<Enterprise | undefined> {
    const enterprise = this.ormRepository.findOne(id);

    return enterprise;
  }

  public async findBySankhyaId(
    sankhya_id: string,
  ): Promise<Enterprise | undefined> {
    const enterprise = this.ormRepository.findOne({
      where: {
        sankhya_id,
      },
    });

    return enterprise;
  }

  public async list(): Promise<Enterprise[]> {
    const enterprises = await this.ormRepository.find();

    return enterprises;
  }

  public async save(enterprise: Enterprise): Promise<Enterprise> {
    return this.ormRepository.save(enterprise);
  }
}

export default EnterprisesRepository;
