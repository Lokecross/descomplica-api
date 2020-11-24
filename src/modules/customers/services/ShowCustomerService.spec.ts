import AppError from '@shared/errors/AppError';
import FakeCustomersRepository from '../repositories/fakes/FakeCustomersRepository';
import ShowCustomerService from './ShowCustomerService';

let fakeCustomersRepository: FakeCustomersRepository;

let showCustomer: ShowCustomerService;

describe('ShowCustomer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();

    showCustomer = new ShowCustomerService(fakeCustomersRepository);
  });

  it('should be able to show a customer', async () => {
    const customer = await fakeCustomersRepository.create({
      name: 'John Doe',
      document: '12345678909',
      email: 'johndoe@gmail.com',
      phone: '62988888888',
    });

    const findCustomer = await showCustomer.execute({
      customer_id: customer.id,
    });

    expect(findCustomer).toBe(customer);
  });

  it('should not be able to show a non existing customer', async () => {
    expect(
      showCustomer.execute({
        customer_id: 'non-existing-customer-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
