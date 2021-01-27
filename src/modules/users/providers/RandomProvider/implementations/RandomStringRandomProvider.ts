import { generate } from 'randomstring';

import IRandomProvider from '../models/IRandomProvider';

class RandomStringRandomProvider implements IRandomProvider {
  public async generateString(size: number): Promise<string> {
    return generate(size);
  }
}

export default RandomStringRandomProvider;
