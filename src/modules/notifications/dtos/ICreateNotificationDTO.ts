import User from '@modules/users/infra/typeorm/entities/User';

export default interface ICreateNotificationDTO {
  heading: string;
  content: string;
  users: User[];
}
