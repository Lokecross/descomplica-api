import api from './api';

import INotificationProvider from '../../models/INotificationProvider';

class OnesignalProvider implements INotificationProvider {
  public async notificate(
    heading: string,
    content: string,
    devices: string[],
  ): Promise<void> {
    await api.post('/api/v1/notifications', {
      app_id: process.env.ONESIGNAL_ID,
      include_player_ids: devices,
      contents: { pt: content },
      headings: { pt: heading },
    });
  }
}

export default OnesignalProvider;
