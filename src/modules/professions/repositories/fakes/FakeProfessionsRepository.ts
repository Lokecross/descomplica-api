import { uuid } from 'uuidv4';

import IProfessionsRepository from '../IProfessionsRepository';
import ICreateProfessionDTO from '../../dtos/ICreateProfessionDTO';

import Profession from '../../infra/typeorm/entities/Profession';

class FakeProfessionsRepository implements IProfessionsRepository {
  private professions: Profession[] = [];

  public async create(reqData: ICreateProfessionDTO): Promise<Profession> {
    const profession = new Profession();

    Object.assign(profession, { id: uuid(), ...reqData });

    this.professions.push(profession);

    return profession;
  }

  public async findById(id: string): Promise<Profession | undefined> {
    const findProfession = this.professions.find(
      profession => profession.id === id,
    );

    return findProfession;
  }

  public async findBySankhyaId(
    sankhya_id: string,
  ): Promise<Profession | undefined> {
    const findProfession = this.professions.find(
      profession => profession.sankhya_id === sankhya_id,
    );

    return findProfession;
  }

  public async list(): Promise<Profession[]> {
    return this.professions;
  }

  public async save(profession: Profession): Promise<Profession> {
    const findIndex = this.professions.findIndex(
      findProfession => findProfession.id === profession.id,
    );

    this.professions[findIndex] = profession;

    return profession;
  }
}

export default FakeProfessionsRepository;
