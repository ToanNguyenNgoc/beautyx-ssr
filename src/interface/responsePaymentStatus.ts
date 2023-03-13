export interface ResponsePmStatus {
    amount: number,
    amount_paid: number,
    created_at: string,
    deleted_at?: string,
    description: string,
    extra_data: {
        deeplink: string,
        deeplinkMiniApp: string,
        payUrl: string,
        qrCodeUrl?: string,
        redirectUrl: string
    },
    payment_gateway_histories: [
        {
            event_name: string,
            id: string,
            message: string,
            payment_gateway_id: string
        }
    ],
    payment_method_id: number,
    paymentable_id: number,
    paymentable_type: string,
    status: string,
    transaction_uuid: string,
    updated_at: string
}