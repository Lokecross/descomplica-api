import { injectable, inject } from 'tsyringe';

import Profession from '../infra/typeorm/entities/Profession';

import IProfessionsRepository from '../repositories/IProfessionsRepository';

interface IRequest {
  sankhya_id: string;
  name: string;
}

@injectable()
class CreateProfessionService {
  constructor(
    @inject('ProfessionsRepository')
    private professionsRepository: IProfessionsRepository,
  ) {}

  public async execute(reqData: IRequest): Promise<Profession> {
    const profession = await this.professionsRepository.create(reqData);

    return profession;
  }
}

export default CreateProfessionService;
