const API_ROUTE = {
    ORGS: '/organizations',
    ORG: (id: number | string) => `/organizations/${id}`,
    SERVICES: '/services',
    ORG_SERVICE: (org_id: number | string, id: number | string) => `/organizations/${org_id}/services/${id}`,
    ORG_SERVICES: (org_id: number | string) => `/organizations/${org_id}/services`,
    PRODUCTS: '/products',
    ORG_PRODUCT: (org_id: number | string, id: number | string) => `/organizations/${org_id}/products/${id}`,
    ORG_PRODUCTS: (org_id: number | string) => `/organizations/${org_id}/services`
}

export default API_ROUTE