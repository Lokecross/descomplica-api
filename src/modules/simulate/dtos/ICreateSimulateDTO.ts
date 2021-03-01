import { StatusSimulateOptions } from '../infra/typeorm/entities/Simulate';

export default interface ICreateSimulateDTO {
  attendanceId: string;
  lotId: string;
  status: StatusSimulateOptions;
}
