export interface Service {
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
      is_featured: false
      modified_date: string
      price: number
      reward_money: number
      reward_percent: number
      service_backup_code: string
      service_code: string
      service_cost_type: number
      service_group_id: number
      service_name: string
      service_order: boolean
      special_price: number
      status: boolean,
      favorites_count: number,
      video_url: any,
      video: any,
      rating: number,
      is_favorite: boolean,
      bought_count: number,
      category?: any,
      is_moba_ecommerce_enable: boolean
      is_momo_ecommerce_enable: boolean,
      special_price_momo: number,
      is_displayed_home: number,
      tags?: any
}
export interface ISpecialItem {
      id: number | string,
      image_url: string,
      item_id: number | string,
      name: number,
      organization_id: number | string,
      price: number,
      special_price: number,
      type: "SERVICE" | "DISCOUNT"
}