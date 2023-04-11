import { Category } from './category'
export interface Product {
      branch_id: number
      brand_id: number
      is_product: boolean
      commission_money: number
      commission_percen: number
      commission_plan: number
      created_by_id: number
      created_date: string
      deleted: boolean
      description: string
      id: number
      image: string
      image_url: string
      is_featured: boolean
      is_momo_ecommerce_enable: boolean
      medicine: number
      modified_date: string
      origin_price: number
      product_category_id: number
      product_code: string
      product_name: string
      product_order: number
      product_sku: string
      product_type: number
      retail_price: number
      reward_money: number
      reward_percent: number
      special_price: number
      status: boolean
      unit2_id: number | string | null
      unit_id: number
      unit_ratio: number | string | null,
      rating: number,
      is_favorite: boolean,
      favorites_count: number,
      special_price_momo: number,
      category: Category[],
      is_displayed_home:number,
      tags:any
}