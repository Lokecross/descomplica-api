import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Profession from '../infra/typeorm/entities/Profession';

import IProfessionsRepository from '../repositories/IProfessionsRepository';

interface IRequest {
  id: string;
  sankhya_id: string;
  name: string;
}

@injectable()
class UpdateProfessionService {
  constructor(
    @inject('ProfessionsRepository')
    private professionsRepository: IProfessionsRepository,
  ) {}

  public async execute({ id, ...restData }: IRequest): Promise<Profession> {
    const profession = await this.professionsRepository.findById(id);

    if (!profession) {
      throw new AppError('Profession not found', 404);
    }

    Object.assign(profession, restData);

    const updatedProfession = await this.professionsRepository.save(profession);

    return updatedProfession;
  }
}

export default UpdateProfessionService;
