import { injectable, inject } from 'tsyringe';

import { classToClass } from 'class-transformer';

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

    return classToClass(enterprises);
  }
}

export default ListEnterprisesService;
