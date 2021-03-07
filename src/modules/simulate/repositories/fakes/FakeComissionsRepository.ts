import { uuid } from 'uuidv4';

import ICreateComissionDTO from '../../dtos/ICreateComissionDTO';
import IComissionsRepository from '../IComissionsRepository';

import Comission from '../../infra/typeorm/entities/Comission';

class FakeComissionsRepository implements IComissionsRepository {
  private comissions: Comission[] = [];

  public async findById(id: string): Promise<Comission | undefined> {
    const comission = this.comissions.find(item => item.id === id);

    return comission;
  }

  public async list(): Promise<Comission[]> {
    return this.comissions;
  }

  public async delete(comission: Comission): Promise<void> {
    this.comissions = this.comissions.filter(item => item.id !== comission.id);
  }

  public async create(data: ICreateComissionDTO): Promise<Comission> {
    const comission = new Comission();

    Object.assign(comission, { id: uuid() }, data);

    this.comissions.push(comission);

    return comission;
  }

  public async save(comission: Comission): Promise<Comission> {
    const findIndex = this.comissions.findIndex(
      item => item.id === comission.id,
    );

    this.comissions[findIndex] = comission;

    return comission;
  }
}

export default FakeComissionsRepository;
