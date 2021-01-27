export default interface IRandomProvider {
  generateString(size: number): Promise<string>;
}
