import { Service } from './service';
import { Product } from './product';
import { IOrganization } from './organization'

export interface ITems {
    id: number,
    order_id: number,
    base_price: number,
    quantity: number,
    productable_type: string,
    productable_id: number,
    productable: Service | Product,
    created_at: string,
    updated_at: string,
    origin_id: null | number,
    services_count: number,
    discount_value: number,
    discount_id: null | number
}
export interface IOrderV2 {
    id: number,
    status: string,
    amount: number,
    description: string,
    payment_method_id: number,
    organization_id: number,
    organization: IOrganization,
    user_id: number,
    origin_id: null | number,
    branch_id: null | number,
    created_at: string,
    updated_at: string,
    deleted_at: null | string,
    platform: string,
    discount_value: number,
    items_count: number,
    payment_gateway: {
        id: number,
        status: string,
        amount: number,
        description: string,
        transaction_uuid: string,
        extra_data: {
            redirectUrl: string,
            payUrl: string | null,
            deeplink: string | null,
            qrCodeUrl: null | string,
            deeplinkMiniApp: string | null
        },
        payment_method_id: number,
        paymentable_type: string,
        paymentable_id: number,
        created_at: string,
        updated_at: string,
        deleted_at: null,
        items: ITems[],
    }
}