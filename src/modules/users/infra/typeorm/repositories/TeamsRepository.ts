import { getRepository, Repository } from 'typeorm';

import ITeamsRepository from '@modules/users/repositories/ITeamsRepository';
import ICreateTeamDTO from '@modules/users/dtos/ICreateTeamDTO';

import Team from '../entities/Team';

class TeamsRepository implements ITeamsRepository {
  private ormRepository: Repository<Team>;

  constructor() {
    this.ormRepository = getRepository(Team);
  }

  public async findById(id: string): Promise<Team | undefined> {
    const team = await this.ormRepository.findOne(id, {
      relations: ['supervisor'],
    });

    return team;
  }

  public async list(): Promise<Team[]> {
    const teams = await this.ormRepository.find({
      relations: ['supervisor', 'users'],
    });

    return teams;
  }

  public async create(data: ICreateTeamDTO): Promise<Team> {
    const team = await this.ormRepository.create(data);

    await this.ormRepository.save(team);

    return team;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete({ id });
  }

  public async save(team: Team): Promise<Team> {
    return this.ormRepository.save(team);
  }
}

export default TeamsRepository;
