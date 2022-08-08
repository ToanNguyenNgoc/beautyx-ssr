export interface IServicePromo {
    service_name: string,
    category_name: string,
    id: string,
    price: number,
    duration: number,
    description: string,
    special_price: number,
    discount_percent: number,
    image_url: string,
    modified_date: string,
    is_featured: boolean,
    is_momo_ecommerce_enable: boolean,
    service_id: number,
    org_id: number,
    org_name: string,
    org_image: string,
    org_latitude: null | number,
    org_longitude: null | number,
    org_priority: number,
    org_province_code: number,
    org_district_code: number,
    org_full_address: string,
    branch_id: null | number,
    branch_is_active: boolean,
    special_price_momo:number,
    _geo: {
        lat: null | number,
        lng: null | number
    },
    _geoDistance: number | undefined,
    org_province_name: string,
    org_district_name: string,
    bought_count: number,
    rating: number,
    org_telephone: []
}