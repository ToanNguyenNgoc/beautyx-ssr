
export interface ComboProduct {
      branch_id: number
      brand_id: number
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
      is_displayed_home: number
      is_featured: boolean
      is_moba_ecommerce_enable: boolean
      is_momo_ecommerce_enable: boolean
      medicine: number
      modified_date: string
      origin_price: number
      pivot: { service_card_id: number, product_id: number, number: number, unlimited: number }
      product_category_id: number
      product_code: string
      product_name: string
      product_order: number
      product_sku: string
      product_type: number
      rating: number
      retail_price: number
      reward_money: number
      reward_percent: number
      special_price: number
      special_price_momo: number
      status: boolean
      unit2_id: number
      unit_id: number
      unit_ratio: number
}

export interface ComboService {
      booking_online: number
      branch_id: number
      commission_money: number
      commission_percen: number
      commission_plan: number
      created_by_id: number
      created_date: string
      deleted: boolean
      description: string
      duration: number
      id: number
      image: string
      image_url: string
      is_displayed_home: number
      is_featured: boolean
      is_moba_ecommerce_enable: boolean
      is_momo_ecommerce_enable: boolean
      modified_date: string
      pivot: { service_card_id: number, service_id: number, number: number, unlimited: number }
      price: number
      rating: number
      reward_money: number
      reward_percent: number
      service_backup_code: string
      service_code: string
      service_cost_type: number
      service_group_id: number
      service_name: string
      service_order: boolean
      special_price: number
      special_price_momo: number
      status: boolean
      video: string
}

export interface Combo {
      id: number,
      name: string,
      use_value: number,
      price: number,
      discount: number,
      status: boolean,
      note: string,
      commission_percen: number,
      commission_money: number,
      reward_percent: number,
      reward_money: number,
      expired: number,
      branch_id: number,
      deleted: false,
      created_date: string,
      created_by_id: string,
      images: null | string,
      is_momo_ecommerce_enable: number,
      image_url: string
      products: ComboProduct[],
      services: ComboService[]
}