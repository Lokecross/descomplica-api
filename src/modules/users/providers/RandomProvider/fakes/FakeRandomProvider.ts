import IRandomProvider from '../models/IRandomProvider';

class FakeRandomProvider implements IRandomProvider {
  public async generateString(size: number): Promise<string> {
    return Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, '')
      .substr(0, size);
  }
}

export default FakeRandomProvider;
