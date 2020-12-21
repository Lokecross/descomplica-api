export default interface INotificationProvider {
  createReservation(
    lot_sankhya_id: string,
    broker_sankhya_id: string,
    document: string,
    name: string,
    email: string,
    phone: string,
    note: string,
  ): Promise<void>;
}
