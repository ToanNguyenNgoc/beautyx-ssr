export interface IProductPromo {
    bought_count: number
    branch_id: null | number,
    branch_is_active: boolean
    category_name: string
    created_date: string
    description: string
    discount_percent: number
    favorites_count: number
    id: string
    image_url: null | string,
    is_featured: boolean
    is_momo_ecommerce_enable: boolean
    modified_date: string
    org_district_code: number
    org_district_name: string
    org_full_address: string
    org_id: number
    org_image: string
    org_latitude: number | null
    org_longitude: number | null
    org_name: string
    org_priority: number
    org_province_code: number
    org_province_name: string
    org_telephone: []
    product_id: number
    product_name: string
    rating: number
    retail_price: number
    special_price: number,
    special_price_momo: number,
    _geo: {
        lat: number
        lng: number
    }
    _geoDistance: number
}