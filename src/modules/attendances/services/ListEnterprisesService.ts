import { injectable, inject } from 'tsyringe';

import Enterprise from '../infra/typeorm/entities/Enterprise';

import IEnterprisesRepository from '../repositories/IEnterprisesRepository';

@injectable()
class ListEnterprisesService {
  constructor(
    @inject('EnterprisesRepository')
    private enterprisesRepository: IEnterprisesRepository,
  ) {}

  public async execute(): Promise<Enterprise[]> {
    const enterprises = await this.enterprisesRepository.list();

    return enterprises;
  }
}

export default ListEnterprisesService;
