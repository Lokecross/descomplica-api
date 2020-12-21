import { uuid } from 'uuidv4';

import IEnterprisesRepository from '../IEnterprisesRepository';
import ICreateEnterpriseDTO from '../../dtos/ICreateEnterpriseDTO';

import Enterprise from '../../infra/typeorm/entities/Enterprise';

class FakeEnterprisesRepository implements IEnterprisesRepository {
  private enterprises: Enterprise[] = [];

  public async create(reqData: ICreateEnterpriseDTO): Promise<Enterprise> {
    const enterprise = new Enterprise();

    Object.assign(enterprise, { id: uuid(), ...reqData });

    this.enterprises.push(enterprise);

    return enterprise;
  }

  public async findById(id: string): Promise<Enterprise | undefined> {
    const findEnterprise = this.enterprises.find(
      enterprise => enterprise.id === id,
    );

    return findEnterprise;
  }

  public async findBySankhyaId(
    sankhya_id: string,
  ): Promise<Enterprise | undefined> {
    const findEnterprise = this.enterprises.find(
      enterprise => enterprise.sankhya_id === sankhya_id,
    );

    return findEnterprise;
  }

  public async list(): Promise<Enterprise[]> {
    return this.enterprises;
  }

  public async save(enterprise: Enterprise): Promise<Enterprise> {
    const findIndex = this.enterprises.findIndex(
      findEnterprise => findEnterprise.id === enterprise.id,
    );

    this.enterprises[findIndex] = enterprise;

    return enterprise;
  }
}

export default FakeEnterprisesRepository;
