import { uuid } from 'uuidv4';

import ITeamsRepository from '@modules/users/repositories/ITeamsRepository';
import ICreateTeamDTO from '@modules/users/dtos/ICreateTeamDTO';

import Team from '../../infra/typeorm/entities/Team';

class FakeTeamsRepository implements ITeamsRepository {
  private teams: Team[] = [];

  public async findById(id: string): Promise<Team | undefined> {
    const team = this.teams.find(item => item.id === id);

    return team;
  }

  public async list(): Promise<Team[]> {
    return this.teams;
  }

  public async create(data: ICreateTeamDTO): Promise<Team> {
    const team = new Team();

    Object.assign(team, { id: uuid() }, data);

    this.teams.push(team);

    return team;
  }

  public async delete(id: string): Promise<void> {
    this.teams = this.teams.filter(item => item.id !== id);
  }

  public async save(team: Team): Promise<Team> {
    const findIndex = this.teams.findIndex(item => item.id === team.id);

    this.teams[findIndex] = team;

    return team;
  }
}

export default FakeTeamsRepository;
