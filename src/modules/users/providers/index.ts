import { container } from 'tsyringe';

import IHashProvider from './HashProvider/models/IHashProvider';
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';

import IRandomProvider from './RandomProvider/models/IRandomProvider';
import RandomStringRandomProvider from './RandomProvider/implementations/RandomStringRandomProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);

container.registerSingleton<IRandomProvider>(
  'RandomProvider',
  RandomStringRandomProvider,
);
