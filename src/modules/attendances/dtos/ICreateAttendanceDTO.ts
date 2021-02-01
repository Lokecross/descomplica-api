export default interface ICreateAttendanceDTO {
  customerId: string;
  lotId: string;
  brokerId: string;
  note: string;
  status?: string;
}
