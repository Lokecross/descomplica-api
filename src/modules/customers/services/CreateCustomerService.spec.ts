import FakeCustomersRepository from '../repositories/fakes/FakeCustomersRepository';
import CreateCustomerService from './CreateCustomerService';

let fakeCustomersRepository: FakeCustomersRepository;

let createCustomer: CreateCustomerService;

describe('CreateCustomer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();

    createCustomer = new CreateCustomerService(fakeCustomersRepository);
  });

  it('should be able to create a new customer', async () => {
    const customer = await createCustomer.execute({
      name: 'John Doe',
      document: '12345678909',
      email: 'johndoe@gmail.com',
      phone: '62988888888',
      gender: 'M',
    });

    expect(customer).toHaveProperty('id');
    expect(customer.name).toBe('John Doe');
    expect(customer.document).toBe('12345678909');
    expect(customer.email).toBe('johndoe@gmail.com');
    expect(customer.phone).toBe('62988888888');
  });
});
