export interface Order {
  order_id: number;
  order_date_of_ord: Date;
  OrderDetail: OrderDetails[];
  order_status: string;
  order_location: string;
  delivery_user: User;
  user: User;
}

export interface OrderDetails {
  order_det_id: number;
  ProductOrderDetail: ProductOrderDetail[];
  order_det_total: number;
  order_det_recipe: boolean;
}

export interface ProductOrderDetail {
  pod_id: number;
  quantity: number;
  productId: number;
  orderDetailId: number;
  Product: Product;
}

// export interface Product {
//   prod_id: string;
//   prod_name: string;
//   prod_date_expiration: string;
//   prod_date_package: string;
//   prod_status: string;
//   prod_image: string;
//   prod_reviews: number;
//   prod_brand: string;
//   prod_price: number;
//   prod_quantity: number;
//   prod_tablet: string;
//   prod_detail: string;
//   prod_category: string;
//   prod_description: string;
// }
export interface Product {
  prod_id: string;
  prod_name: string;
  prod_date_expir: string;
  prod_date_pack: string;
  prod_status: string;
  prod_image: string;
  prod_brand: string;
  prod_price: number;
  prod_quantity: number;
  prod_tablet: string;
  prod_detail: string;
  prod_category: string;
  prod_description: string;
  prod_recipe: boolean;
}

export interface Profile {
  prf_id: number;
  prf_name: string;
  prf_lastname: string;
  prf_mail: string;
  prf_phone: string;
}

export interface User {
  usr_id: number;
  usr_email: string;
  usr_pass: string;
  usr_role: string;
  usr_profile: number;
  usr_vip: boolean;
  profile: Profile;
  usr_status: string;
}
