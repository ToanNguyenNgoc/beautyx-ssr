export interface Service {
      booking_online: number | null
      branch_id: number | null
      commission_money: number | null
      commission_percen: number | null
      commission_plan: number | null
      created_by_id: number | null
      created_date: string | null
      deleted: boolean | null
      description: string | null
      duration: number | null
      id: number | null
      image: string | null
      image_url: string | null
      is_featured: false
      modified_date: string | null
      price: number
      reward_money: number | null
      reward_percent: number | null
      service_backup_code: string | null
      service_code: string | null
      service_cost_type: number | null
      service_group_id: number | null
      service_name: string | null
      service_order: boolean | null
      special_price: number
      status: boolean | null,
      favorites_count: number,
      video_url: any,
      video: any,
      rating: number,
      is_favorite: boolean,
      bought_count: number,
      category: any,
      is_moba_ecommerce_enable: boolean
      is_momo_ecommerce_enable: boolean,
      special_price_momo: number
}