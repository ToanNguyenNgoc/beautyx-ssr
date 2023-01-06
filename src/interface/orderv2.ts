import { Service } from "./service";
import { Product } from "./product";
import { IOrganization } from "./organization";
import { IDiscountPar } from "./discount";

export interface ITems {
    id: number;
    order_id: number;
    base_price: number;
    quantity: number;
    productable_type: string;
    productable_id: number;
    productable: Service | Product | any;
    created_at: string;
    updated_at: string;
    origin_id: null | number;
    services_count: number;
    discount_value: number;
    discount_id: null | number;
    discount: IDiscountPar
}
export interface BTX_points {
    created_at: string,
    deleted_at?: string,
    expired_at: string,
    id: number,
    reward_points: number,
    rewardable_id: number,
    rewardable_type: string,
    spent_points: number,
    spentable_id?: number,
    spentable_type?: any,
    type: string,
    updated_at: string,
    user_id: string
}
export interface IOrderOrigin {
    id: number;
    uid: number;
    status: number;
    type: number;
    payment_method_id: number;
    payment_methods: string;
    sub_total_money: string;
    tax_money: string;
    discount_percent: number;
    discount_money: number;
    happy_hour_code: string;
    coupon_code: string;
    coupon_discount_money: string;
    total_money: number;
    total_commission: number;
    note: string;
    uid_confirmed: string;
    date_time_confirmed: string;
    bed_ids: string;
    signature_image: string;
    check_in: string;
    check_out: string;
    deleted: boolean;
    created_date: string;
    created_by_id: number;
    branch_id: number;
    order_code: string;
    discount_symbol: string;
    tax: number;
    tax_symbol: number;
    referral_uid: string;
    is_new_customer: boolean;
    platform?: string;
    delivery_address: string;
    myspa_fee_momo: number;
    myspa_percent_momo: number;
    delivery_status: number;
    currency_id: number;
}
export interface IOrderV2 {
    id: number;
    status: string;
    amount: number;
    description: string;
    payment_method_id: number;
    organization_id: number;
    organization: IOrganization;
    user_id: number;
    origin_id: null | number;
    branch_id: null | number;
    created_at: string;
    updated_at: string;
    deleted_at: null | string;
    platform: string;
    discount_value: number;
    items_count: number;
    qr_link: string;
    payment_gateway: {
        id: number;
        status: string;
        amount: number;
        description: string;
        transaction_uuid: string;
        extra_data: {
            redirectUrl: string;
            payUrl: string | null;
            deeplink: string | null;
            qrCodeUrl: null | string;
            deeplinkMiniApp: string | null;
        };
        payment_method_id: number;
        paymentable_type: string;
        paymentable_id: number;
        created_at: string;
        updated_at: string;
        deleted_at: null;
        items: ITems[];
    };
    items: ITems[]
    origin?: IOrderOrigin;
    btx_reward: BTX_points
}
export interface ItemReviewed {
    id: number,
    name: string,
    image_url: string,
    type: 'SERVICE' | 'PRODUCT'
}
