export interface ProfileForm {
  name: string;
  email: string;
  address: string;
}

export interface ProfileRequest {
  payer: {
    id: string;
    name: string;
  };
  payerEmail: {
    id: string;
    email: string;
  };
  payerAddress: {
    id: string;
    address: string;
  };
}
