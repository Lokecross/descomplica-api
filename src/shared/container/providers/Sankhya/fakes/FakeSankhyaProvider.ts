import ISankhyaProvider from '../models/ISankhyaProvider';

class FakeSankhyaProvider implements ISankhyaProvider {
  public async createReservation(): Promise<void> {
    //
  }
}

export default FakeSankhyaProvider;
