export interface UserAddress {
  street: string;
  city: string;
  zipcode: string;
}
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: UserAddress;
}
