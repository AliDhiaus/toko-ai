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
  [key: string]: unknown;
}

export interface productType {
  id: string;
  name: string;
  description: string;
  price: number;
  category_id: number;
  image: File | string;
  [key: string]: unknown;
}

export interface orderType {
  id: string;
  product_id: string | null;
  total: number;
  status: string;
  payment: string;
  amount: number;
  createdAt: string;
  [key: string]: unknown;
}

export interface PaymentPayload {
  gross_amount: number;
  order_id: string;
  order_ids: string[];
  bank: string;
  order_time: string;
}

export interface PaymentResponse {
  status: string;
  order_id_midtrans: string;
  transaction_id: string;
  gross_amount: string;
  payment_type: string;
  bank: string;
  va_number: string;
  order_ids: string[];
  expiry_time: string;
}

export interface DataListItem {
    id: number; 
    name: string;
}

export interface PaymentModalProps {
  details: PaymentResponse;
  onClose: () => void;
}