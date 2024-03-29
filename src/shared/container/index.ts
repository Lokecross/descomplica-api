import { container } from 'tsyringe';

import '@modules/users/providers';
import '@modules/notifications/providers';
import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUsersTokensRepository from '@modules/users/repositories/IUsersTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokenRepository';

import ITeamsRepository from '@modules/users/repositories/ITeamsRepository';
import TeamsRepository from '@modules/users/infra/typeorm/repositories/TeamsRepository';

import IInvitesRepository from '@modules/users/repositories/IInvitesRepository';
import InvitesRepository from '@modules/users/infra/typeorm/repositories/InvitesRepository';

import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';

import IRequestCustomersRepository from '@modules/customers/repositories/IRequestCustomersRepository';
import RequestCustomersRepository from '@modules/customers/infra/typeorm/repositories/RequestCustomersRepository';

import IBrokersRepository from '@modules/brokers/repositories/IBrokersRepository';
import BrokersRepository from '@modules/brokers/infra/typeorm/repositories/BrokersRepository';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';

import IEnterprisesRepository from '@modules/enterprises/repositories/IEnterprisesRepository';
import EnterprisesRepository from '@modules/enterprises/infra/typeorm/repositories/EnterprisesRepository';

import ILotsRepository from '@modules/lots/repositories/ILotsRepository';
import LotsRepository from '@modules/lots/infra/typeorm/repositories/LotsRepository';

import IProfessionsRepository from '@modules/professions/repositories/IProfessionsRepository';
import ProfessionsRepository from '@modules/professions/infra/typeorm/repositories/ProfessionsRepository';

import IAttendancesRepository from '@modules/attendances/repositories/IAttendancesRepository';
import AttendancesRepository from '@modules/attendances/infra/typeorm/repositories/AttendancesRepository';

import IAuditionsRepository from '@modules/users/repositories/IAuditionsRepository';
import AuditionsRepository from '@modules/users/infra/typeorm/repositories/AuditionsRepository';

import ISimulatesRepository from '@modules/simulate/repositories/ISimulatesRepository';
import SimulatesRepository from '@modules/simulate/infra/typeorm/repositories/SimulatesRepository';

import IPayersRepository from '@modules/simulate/repositories/IPayersRepository';
import PayersRepository from '@modules/simulate/infra/typeorm/repositories/PayersRepository';

import IComissionsRepository from '@modules/simulate/repositories/IComissionsRepository';
import ComissionsRepository from '@modules/simulate/infra/typeorm/repositories/ComissionsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUsersTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<ITeamsRepository>(
  'TeamsRepository',
  TeamsRepository,
);

container.registerSingleton<IInvitesRepository>(
  'InvitesRepository',
  InvitesRepository,
);

container.registerSingleton<ICustomersRepository>(
  'CustomersRepository',
  CustomersRepository,
);

container.registerSingleton<IRequestCustomersRepository>(
  'RequestCustomersRepository',
  RequestCustomersRepository,
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

container.registerSingleton<IProfessionsRepository>(
  'ProfessionsRepository',
  ProfessionsRepository,
);

container.registerSingleton<IAttendancesRepository>(
  'AttendancesRepository',
  AttendancesRepository,
);

container.registerSingleton<IAuditionsRepository>(
  'AuditionsRepository',
  AuditionsRepository,
);

container.registerSingleton<ISimulatesRepository>(
  'SimulatesRepository',
  SimulatesRepository,
);

container.registerSingleton<IPayersRepository>(
  'PayersRepository',
  PayersRepository,
);

container.registerSingleton<IComissionsRepository>(
  'ComissionsRepository',
  ComissionsRepository,
);
