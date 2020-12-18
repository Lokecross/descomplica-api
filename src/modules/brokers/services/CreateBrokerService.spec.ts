import FakeBrokersRepository from '../repositories/fakes/FakeBrokersRepository';
import CreateBrokerService from './CreateBrokerService';

let fakeBrokersRepository: FakeBrokersRepository;

let createBroker: CreateBrokerService;

describe('CreateBroker', () => {
  beforeEach(() => {
    fakeBrokersRepository = new FakeBrokersRepository();

    createBroker = new CreateBrokerService(fakeBrokersRepository);
  });

  it('should be able to create a new broker', async () => {
    const broker = await createBroker.execute({
      name: 'John Doe',
      cpf: '12345678909',
      creci: '123456',
      creci_uf: 'GO',
      email: 'john@doe.com',
      phone: '62988884444',
      sankhya_id: '1',
    });

    expect(broker).toHaveProperty('id');
    expect(broker.name).toBe('John Doe');
    expect(broker.cpf).toBe('12345678909');
    expect(broker.creci).toBe('123456');
    expect(broker.creci_uf).toBe('GO');
    expect(broker.email).toBe('john@doe.com');
    expect(broker.phone).toBe('62988884444');
    expect(broker.sankhya_id).toBe('1');
  });
});
