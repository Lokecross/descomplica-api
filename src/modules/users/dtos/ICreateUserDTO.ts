import { RoleOptions } from '../infra/typeorm/entities/User';

export default interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  brokerId: string;
  role?: RoleOptions;
  teamId?: string;
}
