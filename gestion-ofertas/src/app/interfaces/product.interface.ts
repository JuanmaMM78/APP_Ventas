export interface Product {
  id_product?: number;
  name_product: string;
  origin: string;
  caliber: string;
  price: number;
  stock_initial: number;
  stock_now: number;
  status: number;
  image?: string;
}
