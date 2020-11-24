export default interface ICreateUserDTO {
  name: string;
  email: string;
  isAdmin?: boolean;
  isPartner?: boolean;
  partner_id?: string;
  password: string;
}
