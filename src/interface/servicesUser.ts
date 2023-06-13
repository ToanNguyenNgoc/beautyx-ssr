import { IOrganization } from './organization'

export interface IUser_Service {
    id: number,
    service_name: string,
    duration: number,
    description: string,
    image: string,
    image_url: string,
    times: number,
    remain_time: number,
    time_expired: any,
    unlimited: boolean
}
export interface IServiceSold {
    id: number,
    sid: number,
    total_times: number,
    total_remain_time: number,
    time_expired: null | string,
    unlimited: boolean,
    deleted: boolean,
    services: IUser_Service[]
}
export interface IUser_Items {
    id: number,
    order_id: number,
    base_price: number,
    quantity: number,
    productable_type: string,
    productable_id: number,
    created_at: string,
    updated_at: string,
    origin_id: number,
    services_count: number,
    discount_value: number,
    discount_id: null | number | string,
    services_sold: IServiceSold,
    discount: null | number | string
}
export interface IServiceUser {
    id: number,
    status: number,
    amount: number,
    description: null | string,
    payment_method_id: number,
    organization_id: number,
    organization: IOrganization,
    user_id: number,
    origin_id: number,
    branch_id: null | number,
    created_at: string,
    updated_at: string,
    deleted_at: null | string,
    platform: string,
    discount_value: number,
    user_address_id: number,
    items_count: number,
    payment_gateway: {
        id: number,
        status: number,
        amount: number,
        description: string,
        transaction_uuid: string,
        extra_data: {
            redirectUrl: string,
            payUrl: string,
            deeplink: string,
            qrCodeUrl: null | string,
            deeplinkMiniApp: string
        },
        payment_method_id: number,
        paymentable_type: string,
        paymentable_id: number,
        created_at: string,
        updated_at: string,
        deleted_at: null | string
    },
    items: IUser_Items[],
    appointments:any[]
}