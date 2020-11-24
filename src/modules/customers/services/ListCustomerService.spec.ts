import FakeCustomersRepository from '../repositories/fakes/FakeCustomersRepository';
import ListCustomerService from './ListCustomerService';

let fakeCustomersRepository: FakeCustomersRepository;

let listCustomer: ListCustomerService;

describe('ListCustomer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();

    listCustomer = new ListCustomerService(fakeCustomersRepository);
  });

  it('should be able to list customers', async () => {
    const customer = await fakeCustomersRepository.create({
      name: 'John Doe',
      document: '12345678909',
      email: 'johndoe@gmail.com',
      phone: '62988888888',
    });

    const customers = await listCustomer.execute();

    expect(customers).toStrictEqual([customer]);
  });
});
