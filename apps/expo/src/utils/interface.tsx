export interface Order {
  order_id: number;
  order_date_of_order: string;
  order_customer: number;
  order_details: number;
  order_delivery: number;
  order_status: string;
}

export interface OrderDetails {
  order_det_id: number;
  order_det_prod: number[];
  order_det_start_date: string;
  order_det_finish_date: string;
  order_det_update_date: string;
  order_det_quantity: number;
  order_det_total: number;
  order_location: string;
  order_recipe: boolean;
}

export interface Product {
  prod_id: string;
  prod_name: string;
  prod_date_expiration: string;
  prod_date_package: string;
  prod_status: string;
  prod_image: string;
  prod_reviews: number;
  prod_brand: string;
  prod_price: number;
  prod_quantity: number;
  prod_tablet: string;
  prod_detail: string;
  prod_category: string;
  prod_description: string;
}

export interface Profile {
  prf_id: number;
  prf_name: string;
  prf_lastname: string;
  prf_mail: string;
}

export interface User {
  usr_id: number;
  usr_user: string;
  usr_pass: string;
  usr_role: number;
  usr_profile: number;
  usr_vip: boolean;
}
