export interface UserInfo {
  id: string;
  name: string;
  address: string;
  phone_number: string;
  email: string;
  isDefault: boolean;
  user_id: string;
}

export interface UserInfoRequest {
  name: string;
  address: string;
  email: string;
  isDefault?: boolean;
}
