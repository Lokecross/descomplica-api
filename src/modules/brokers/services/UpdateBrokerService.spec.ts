import AppError from '@shared/errors/AppError';
import FakeBrokersRepository from '../repositories/fakes/FakeBrokersRepository';
import UpdateBrokerService from './UpdateBrokerService';

let fakeBrokersRepository: FakeBrokersRepository;

let updateBroker: UpdateBrokerService;

describe('UpdateBroker', () => {
  beforeEach(() => {
    fakeBrokersRepository = new FakeBrokersRepository();

    updateBroker = new UpdateBrokerService(fakeBrokersRepository);
  });

  it('should be able to update the broker', async () => {
    const broker = await fakeBrokersRepository.create({
      name: 'John Doe',
      cpf: '12345678909',
      creci: '123456',
      creci_uf: 'GO',
      email: 'john@doe.com',
      phone: '62988884444',
      sankhya_id: '1',
    });

    const updatedBroker = await updateBroker.execute({
      id: broker.id,
      name: 'John Tre',
      cpf: '12345678910',
      creci: '123123',
      creci_uf: 'TO',
      email: 'john@tre.com',
      phone: '62988885555',
      sankhya_id: '2',
    });

    expect(updatedBroker.name).toBe('John Tre');
    expect(updatedBroker.cpf).toBe('12345678910');
    expect(updatedBroker.creci).toBe('123123');
    expect(updatedBroker.creci_uf).toBe('TO');
    expect(updatedBroker.email).toBe('john@tre.com');
    expect(updatedBroker.phone).toBe('62988885555');
    expect(updatedBroker.sankhya_id).toBe('2');
  });

  it('should not be able to show the broker from non-existing broker', async () => {
    expect(
      updateBroker.execute({
        id: 'non-existing-broker-id',
        name: 'John Doe',
        cpf: '12345678909',
        creci: '123456',
        creci_uf: 'GO',
        email: 'john@doe.com',
        phone: '62988884444',
        sankhya_id: '1',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
