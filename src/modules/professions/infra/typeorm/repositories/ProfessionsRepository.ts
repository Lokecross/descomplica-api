import { getRepository, Repository } from 'typeorm';

import IProfessionsRepository from '@modules/professions/repositories/IProfessionsRepository';
import ICreateProfessionDTO from '@modules/professions/dtos/ICreateProfessionDTO';

import Profession from '../entities/Profession';

class ProfessionsRepository implements IProfessionsRepository {
  private ormRepository: Repository<Profession>;

  constructor() {
    this.ormRepository = getRepository(Profession);
  }

  public async create(reqData: ICreateProfessionDTO): Promise<Profession> {
    const profession = this.ormRepository.create(reqData);

    await this.ormRepository.save(profession);

    return profession;
  }

  public async findById(id: string): Promise<Profession | undefined> {
    const profession = this.ormRepository.findOne(id);

    return profession;
  }

  public async findBySankhyaId(
    sankhya_id: string,
  ): Promise<Profession | undefined> {
    const profession = this.ormRepository.findOne({
      where: {
        sankhya_id,
      },
    });

    return profession;
  }

  public async list(): Promise<Profession[]> {
    const professions = await this.ormRepository.find();

    return professions;
  }

  public async save(profession: Profession): Promise<Profession> {
    return this.ormRepository.save(profession);
  }
}

export default ProfessionsRepository;
