export interface ClientInfoForm {
  name: string;
  address: string;
  phone_number: string;
  company_name: string;
  email: string;
}

export interface ClientInfoTemplate extends ClientInfoForm {
  id: string;
}
