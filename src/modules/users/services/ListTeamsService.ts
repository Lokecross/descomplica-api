import { injectable, inject } from 'tsyringe';

import { classToClass } from 'class-transformer';

import Team from '../infra/typeorm/entities/Team';
import ITeamsRepository from '../repositories/ITeamsRepository';

@injectable()
class ListTeamsService {
  constructor(
    @inject('TeamsRepository')
    private teamsRepository: ITeamsRepository,
  ) {}

  public async execute(): Promise<Team[]> {
    const teams = await this.teamsRepository.list();

    return classToClass(teams);
  }
}

export default ListTeamsService;
