export default interface INotificationProvider {
  notificate(
    heading: string,
    content: string,
    devices: string[],
  ): Promise<void>;
}
