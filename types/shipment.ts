export interface ShipmentForm {
  name: string;
  address: string;
  phone_number: string;
  company_name: string;
}

export interface ShipmentTemplate extends ShipmentForm {
  id: string;
}
