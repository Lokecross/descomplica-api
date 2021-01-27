import { getRepository, Repository } from 'typeorm';

import IInvitesRepository from '@modules/users/repositories/IInvitesRepository';
import ICreateInviteDTO from '@modules/users/dtos/ICreateInviteDTO';

import Invite from '../entities/Invite';

class InvitesRepository implements IInvitesRepository {
  private ormRepository: Repository<Invite>;

  constructor() {
    this.ormRepository = getRepository(Invite);
  }

  public async findById(id: string): Promise<Invite | undefined> {
    const invite = await this.ormRepository.findOne(id, {
      relations: ['supervisor'],
    });

    return invite;
  }

  public async findByCode(code: string): Promise<Invite | undefined> {
    const invite = await this.ormRepository.findOne({
      where: {
        code,
      },
      relations: ['supervisor'],
    });

    return invite;
  }

  public async list(): Promise<Invite[]> {
    const invites = await this.ormRepository.find({
      relations: ['supervisor'],
    });

    return invites;
  }

  public async create(data: ICreateInviteDTO): Promise<Invite> {
    const invite = await this.ormRepository.create(data);

    await this.ormRepository.save(invite);

    return invite;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete({ id });
  }

  public async save(invite: Invite): Promise<Invite> {
    return this.ormRepository.save(invite);
  }
}

export default InvitesRepository;
