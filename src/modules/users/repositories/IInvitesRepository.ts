import Invite from '../infra/typeorm/entities/Invite';
import ICreateInviteDTO from '../dtos/ICreateInviteDTO';

export default interface IInvitesRepository {
  findById(id: string): Promise<Invite | undefined>;
  findByCode(code: string): Promise<Invite | undefined>;
  list(): Promise<Invite[]>;
  create(data: ICreateInviteDTO): Promise<Invite>;
  delete(id: string): Promise<void>;
  save(data: Invite): Promise<Invite>;
}
