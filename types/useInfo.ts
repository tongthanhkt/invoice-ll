export interface UseInfo {
  id: string;
  name: string;
  address: string;
  phone_number: string;
  email: string;
  isDefault: boolean;
  user_id: string;
}

export interface UseInfoRequest {
  name: string;
  address: string;
  email: string;
  isDefault?: boolean;
}
