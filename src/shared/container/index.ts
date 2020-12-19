import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUsersTokensRepository from '@modules/users/repositories/IUsersTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokenRepository';

import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';

import IBrokersRepository from '@modules/brokers/repositories/IBrokersRepository';
import BrokersRepository from '@modules/brokers/infra/typeorm/repositories/BrokersRepository';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';

import IEnterprisesRepository from '@modules/enterprises/repositories/IEnterprisesRepository';
import EnterprisesRepository from '@modules/enterprises/infra/typeorm/repositories/EnterprisesRepository';

import ILotsRepository from '@modules/lots/repositories/ILotsRepository';
import LotsRepository from '@modules/lots/infra/typeorm/repositories/LotsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUsersTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<ICustomersRepository>(
  'CustomersRepository',
  CustomersRepository,
);

container.registerSingleton<IBrokersRepository>(
  'BrokersRepository',
  BrokersRepository,
);

container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationsRepository,
);

container.registerSingleton<IEnterprisesRepository>(
  'EnterprisesRepository',
  EnterprisesRepository,
);

container.registerSingleton<ILotsRepository>('LotsRepository', LotsRepository);
