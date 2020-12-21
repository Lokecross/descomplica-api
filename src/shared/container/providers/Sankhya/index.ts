import { container } from 'tsyringe';

import ISankhyaProvider from './models/ISankhyaProvider';
import SankhyaProvider from './implementations/SankhyaProvider';

container.registerSingleton<ISankhyaProvider>(
  'SankhyaProvider',
  SankhyaProvider,
);
