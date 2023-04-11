import { IOrganization } from './organization';
export interface IITEMS_DISCOUNT {
    id: number,
    productable_type: string,
    productable_id: number,
    discount_id: number,
    organization_id: number,
    created_at: string,
    updated_at: string,
    view_price: number,
    productable: {
        id: number,
        service_code: string,
        service_backup_code: string,
        service_name: string,
        product_name: string,
        duration: number,
        price: number,
        special_price: number,
        special_price_momo: number,
        description: string,
        service_group_id: number,
        service_order: boolean,
        commission_percen: number,
        commission_money: number,
        reward_percent: number,
        reward_money: number,
        commission_plan: number,
        image: string,
        status: boolean,
        deleted: boolean,
        created_date: string,
        modified_date: string,
        created_by_id: number,
        branch_id: number,
        booking_online: number,
        service_cost_type: number,
        is_featured: boolean,
        is_momo_ecommerce_enable: true,
        is_moba_ecommerce_enable: boolean,
        image_url: string,
        retail_price: number
    },
    discount: IDiscountChild,
    organization: IOrganization
}
interface IItems {
    id: number,
    productable_type: string,
    productable_id: number,
    discount_id: number,
    organization_id: number,
    created_at: string,
    updated_at: string
}
export interface IDiscountChild {
    id: number,
    title: string,
    description: string,
    coupon_code: string,
    discount_value: number,
    discount_unit: string,
    discount_type: string,
    valid_from: string,
    valid_util: string,
    valid_time: any,
    minimum_order_value: any,
    maximum_discount_value: any,
    priority: number,
    total: number,
    used: number,
    limit: number,
    platform: string,
    deleted_at: any,
    created_at: string,
    updated_at: string,
    organizations: IOrganization[],
    items: IItems[]
}
export interface IDiscountPar {
    id: number,
    uuid:string,
    title: string,
    description: string,
    coupon_code: string,
    discount_value: number,
    discount_unit: string,
    distance_organization?: number,
    discount_type: string,
    valid_from: string,
    valid_util: string,
    valid_time: null | string,
    minimum_order_value: any,
    maximum_discount_value: any,
    priority: number,
    total: number,
    used: number,
    limit: number,
    platform: string,
    deleted_at: null | string,
    created_at: string,
    updated_at: string,
    items_count: number,
    user_available_purchase_count: number | any,
    organizations: IOrganization[],
    items: IITEMS_DISCOUNT[]
}
export interface IDiscountCalc extends IDiscountPar {
    discount_value_calc: number
}