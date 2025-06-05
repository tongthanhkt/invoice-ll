export interface Provider {
  id: string;
  name: string;
  address: string;
  phone_number: string;
  email: string;
  user_id: string;
  createdAt: string;
}

export interface ProviderRequest {
  name: string;
  address: string;
  email: string;
  phone_number: string;
}
