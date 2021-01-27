import { uuid } from 'uuidv4';

import IInvitesRepository from '@modules/users/repositories/IInvitesRepository';
import ICreateInviteDTO from '@modules/users/dtos/ICreateInviteDTO';

import Invite from '../../infra/typeorm/entities/Invite';

class FakeInvitesRepository implements IInvitesRepository {
  private invites: Invite[] = [];

  public async findById(id: string): Promise<Invite | undefined> {
    const invite = this.invites.find(item => item.id === id);

    return invite;
  }

  public async findByCode(code: string): Promise<Invite | undefined> {
    const invite = this.invites.find(item => item.code === code);

    return invite;
  }

  public async list(): Promise<Invite[]> {
    return this.invites;
  }

  public async create(data: ICreateInviteDTO): Promise<Invite> {
    const invite = new Invite();

    Object.assign(invite, { id: uuid() }, data);

    this.invites.push(invite);

    return invite;
  }

  public async delete(id: string): Promise<void> {
    this.invites = this.invites.filter(item => item.id !== id);
  }

  public async save(invite: Invite): Promise<Invite> {
    const findIndex = this.invites.findIndex(item => item.id === invite.id);

    this.invites[findIndex] = invite;

    return invite;
  }
}

export default FakeInvitesRepository;
