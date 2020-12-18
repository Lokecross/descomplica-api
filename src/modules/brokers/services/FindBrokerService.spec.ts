import AppError from '@shared/errors/AppError';
import FakeBrokersRepository from '../repositories/fakes/FakeBrokersRepository';

import FindBrokerService from './FindBrokerService';

let fakeBrokersRepository: FakeBrokersRepository;

let findBroker: FindBrokerService;

describe('FindBroker', () => {
  beforeEach(() => {
    fakeBrokersRepository = new FakeBrokersRepository();

    findBroker = new FindBrokerService(fakeBrokersRepository);
  });

  it('should be able to find a broker by id', async () => {
    const broker = await fakeBrokersRepository.create({
      name: 'John Doe',
      cpf: '12345678909',
      creci: '123456',
      creci_uf: 'GO',
      email: 'john@doe.com',
      phone: '62988884444',
      sankhya_id: '1',
    });

    const existBroker = await findBroker.execute({ id: broker.id });

    expect(existBroker).toHaveProperty('id');
  });

  it('should not be able to find a broker by non existing broker', async () => {
    expect(
      findBroker.execute({ id: 'non-existing-broker-id' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
