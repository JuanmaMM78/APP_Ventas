export interface Order {
  id_order?: number;
  id_client: number;
  id_product: number;
  vol_sale: number;
  shipping: string;
  meth_payment: string;
  price_sale: number;
  id_user: number;
  date_order: any;
  status?: string;
  comment?: string;
}
