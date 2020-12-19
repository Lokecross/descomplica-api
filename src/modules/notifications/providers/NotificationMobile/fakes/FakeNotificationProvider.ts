import INotificationProvider from '../models/INotificationProvider';

class FakeNotificationProvider implements INotificationProvider {
  public async notificate(): Promise<void> {
    //
  }
}

export default FakeNotificationProvider;
