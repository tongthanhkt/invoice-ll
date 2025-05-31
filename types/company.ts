export interface ICompanyRequest {
  id?: string;
  name: string;
  address: string;
  city: string;
  zipcode: string;
  phone_number: string;
  email: string;
}

export interface ICompanyResponse {
  id: string;
  name: string;
  address: string;
  city: string;
  zipcode: string;
  phone_number: string;
  email: string;
  user_id: string;
}
