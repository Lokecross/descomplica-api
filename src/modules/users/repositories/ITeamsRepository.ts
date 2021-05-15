import Team from '../infra/typeorm/entities/Team';
import ICreateTeamDTO from '../dtos/ICreateTeamDTO';

export default interface ITeamsRepository {
  findById(id: string): Promise<Team | undefined>;
  findBySupervisor(supervisorId: string): Promise<Team | undefined>;
  list(): Promise<Team[]>;
  create(data: ICreateTeamDTO): Promise<Team>;
  delete(id: string): Promise<void>;
  save(data: Team): Promise<Team>;
}
