import AppError from '@shared/errors/AppError';
import FakeCustomersRepository from '../repositories/fakes/FakeCustomersRepository';
import DeleteCustomerService from './DeleteCustomerService';

let fakeCustomersRepository: FakeCustomersRepository;

let deleteCustomer: DeleteCustomerService;

describe('DeleteCustomer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();

    deleteCustomer = new DeleteCustomerService(fakeCustomersRepository);
  });

  it('should be able to delete a customer', async () => {
    const customer = await fakeCustomersRepository.create({
      name: 'John Doe',
      document: '12345678909',
      email: 'johndoe@gmail.com',
      phone: '62988888888',
      gender: 'M',
    });

    await deleteCustomer.execute({
      customer_id: customer.id,
    });

    const findCustomer = await fakeCustomersRepository.findById(customer.id);

    expect(findCustomer).toBeUndefined();
  });

  it('should not be able to delete a non existing customer', async () => {
    expect(
      deleteCustomer.execute({
        customer_id: 'non-existing-customer-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
