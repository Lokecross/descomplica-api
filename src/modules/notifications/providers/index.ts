import { container } from 'tsyringe';

import INotificationProvider from './NotificationMobile/models/INotificationProvider';
import OnesignalProvider from './NotificationMobile/implementations/OnesignalProvider';

container.registerSingleton<INotificationProvider>(
  'NotificationProvider',
  OnesignalProvider,
);
