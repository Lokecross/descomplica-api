import AppError from '@shared/errors/AppError';
import FakeBrokersRepository from '../repositories/fakes/FakeBrokersRepository';

import FindBrokerCpfService from './FindBrokerCpfService';

let fakeBrokersRepository: FakeBrokersRepository;

let findBrokerCpf: FindBrokerCpfService;

describe('FindBrokerCpf', () => {
  beforeEach(() => {
    fakeBrokersRepository = new FakeBrokersRepository();

    findBrokerCpf = new FindBrokerCpfService(fakeBrokersRepository);
  });

  it('should be able to find a broker by cpf', async () => {
    await fakeBrokersRepository.create({
      name: 'John Doe',
      cpf: '12345678909',
      creci: '123456',
      creci_uf: 'GO',
      email: 'john@doe.com',
      phone: '62988884444',
      sankhya_id: '1',
    });

    const existBroker = await findBrokerCpf.execute({ cpf: '12345678909' });

    expect(existBroker).toHaveProperty('id');
  });

  it('should not be able to find a broker by non existing cpf', async () => {
    expect(
      findBrokerCpf.execute({ cpf: '12312312312' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
