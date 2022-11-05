const API_ROUTE = {
    PROVINCES_CODE_DISTRICTS: (province_code: number | string) => `/provinces/${province_code}/districts`,
    ORGS: '/organizations',
    ORG: (id: number | string) => `/organizations/${id}`,
    GALLERIES_ORG_ID: (id: number | string) => `/organizations/${id}/moba_galleries`,
    SERVICES: '/services',
    ORG_SERVICE: (org_id: number | string, id: number | string) => `/organizations/${org_id}/services/${id}`,
    ORG_SERVICES: (org_id: number | string) => `/organizations/${org_id}/services`,
    ORG_COMBOS: (org_id: number | string) => `/organizations/${org_id}/treatment_combo`,
    PRODUCTS: '/products',
    ORG_PRODUCT: (org_id: number | string, id: number | string) => `/organizations/${org_id}/products/${id}`,
    ORG_PRODUCTS: (org_id: number | string) => `/organizations/${org_id}/products`,
    DISCOUNTS: '/discounts',
    SERVICE_CATES_ORG: (org_id: number | string) => `/organizations/${org_id}/service_categories`,
    PRODUCT_CATES_ORG: (org_id: number | string) => `/organizations/${org_id}/product_categories`,
    PAYMENT_GATEWAYS: (tran_uid: string) => `paymentgateways/${tran_uid}/status?cancel=false`,
    ORDERS: `/orders`
}

export default API_ROUTE