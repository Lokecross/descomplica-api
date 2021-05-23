import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ITeamsRepository from '@modules/users/repositories/ITeamsRepository';
import { injectable, inject } from 'tsyringe';

import Customer from '../infra/typeorm/entities/Customer';
import ICustomersRepository from '../repositories/ICustomersRepository';

interface IRequest {
  userId: string;
}

@injectable()
class ListCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('TeamsRepository')
    private teamsRepository: ITeamsRepository,
  ) {}

  public async execute({ userId }: IRequest): Promise<Customer[]> {
    const user = await this.usersRepository.findById(userId);

    const getCustomers = async () => {
      if (user.role === 'broker') {
        const customersBroker = await this.customersRepository.listByBroker(
          user.brokerId,
        );

        return customersBroker;
      }

      if (user.role === 'supervisor') {
        const customers = await this.customersRepository.list();

        const team = await this.teamsRepository.findBySupervisor(user.id);

        const usersByTeam = await this.usersRepository.listByTeam(team.id);

        const usersIdByTeam = usersByTeam.map(item => item.brokerId);

        const customersSupervisor = customers.filter(item => {
          const attendances = item.attendances.filter(attendance => {
            return (
              usersIdByTeam.some(
                brokerId => brokerId === attendance.brokerId,
              ) || attendance.brokerId === user.brokerId
            );
          });

          return attendances.length > 0;
        });

        return customersSupervisor;
      }

      const customersManager = await this.customersRepository.list();

      return customersManager;
    };

    const customers = await getCustomers();

    return customers;
  }
}

export default ListCustomerService;
