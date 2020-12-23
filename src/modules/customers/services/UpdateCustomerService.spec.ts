import AppError from '@shared/errors/AppError';
import FakeCustomersRepository from '../repositories/fakes/FakeCustomersRepository';
import UpdateCustomerService from './UpdateCustomerService';

let fakeCustomersRepository: FakeCustomersRepository;

let updateCustomer: UpdateCustomerService;

describe('UpdateCustomer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();

    updateCustomer = new UpdateCustomerService(fakeCustomersRepository);
  });

  it('should be able to update a customer', async () => {
    const customer = await fakeCustomersRepository.create({
      name: 'John Doe',
      document: '12345678909',
      email: 'johndoe@gmail.com',
      phone: '62988888888',
      gender: 'M',
    });

    await updateCustomer.execute({
      customer_id: customer.id,
      name: 'other-name',
    });

    expect(customer).toHaveProperty('id');
    expect(customer.name).toBe('other-name');
  });

  it('should not be able to update a non existing customer', async () => {
    expect(
      updateCustomer.execute({
        customer_id: 'non-existing-customer-id',
        name: 'other-name',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
