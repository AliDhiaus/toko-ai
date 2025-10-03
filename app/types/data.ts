export interface userType {
  id: number;
  email: string;
  password: string;
  authId: string;
  name: string;
  role: string;
  image: string;
  createdAt: string;
}

export interface categoryType {
  id: number;
  name: string;
}

export interface productType {
  id: string;
  name: string;
  description: string;
  price: number;
  category_id: number;
  image: File | string;
}

export interface orderType {
  id: string;
  product_id: string;
  total: number;
  status: string;
  payment: string;
  amount: number;
  createdAt: string;
}

export interface PaymentPayload {
  order_id: string;
  order_ids: string[];
  gross_amount: number;
  bank: string;
}

export interface DataListItem {
    id: number; 
    name: string;
}


export interface MidtransResponse {
  status: string;
  order_id_midtrans: string;
  gross_amount: number;
  bank: string;
  va_number: string;
}

export interface PaymentModalProps {
  details: MidtransResponse;
  onClose: () => void;
}