export interface Order {
      amount: number,
      branch_id: null | number,
      coupon_code: string,
      created_at: string,
      deleted_at: null,
      description: string
      id: number
      items_product: [],
      items_service: [],
      items_treatment_combo: [],
      organization_id: number,
      origin_id: null | number,
      origin_type: null | number,
      payment_gateway: {
            amount: number
            created_at: string
            deleted_at: null
            description: string
            extra_data: {
                  deeplink: string | null,
                  deeplinkMiniApp: string | null,
                  payUrl: string | null,
                  redirectUrl: string | null,
                  qrCodeUrl: null | string,
            }
            id: number,
            payment_method_id: number
            paymentable_id: number
            paymentable_type: string
            status: string
            transaction_uuid: string
            updated_at: string
      }
      payment_method_id: number | null,
      status: string,
      updated_at: string,
      user_id: number
}