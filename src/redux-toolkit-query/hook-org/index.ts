import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseURL } from 'api/axios'
import API_ROUTE from 'api/_api'
import {
    paramDiscounts,
    paramProductCatesOrg,
    paramServiceCatesOrg,
    paramsProducts,
    paramsServices
} from 'params-query'
import { ResponseType } from 'interface'
import { pickBy, identity } from 'lodash'

export const orgPageApi = createApi({
    reducerPath: "orgPageApi",
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL
    }),
    endpoints: builder => ({
        getServiceCateOrg: builder.query({
            query: (org_id: number | string) => ({
                url: API_ROUTE.SERVICE_CATES_ORG(org_id),
                params: paramServiceCatesOrg
            }),
            keepUnusedDataFor: 3600,
            transformResponse: (response: ResponseType) => response?.context.data ?? {}
        }),
        getProductCateOrg: builder.query({
            query: (org_id: number | string) => ({
                url: API_ROUTE.PRODUCT_CATES_ORG(org_id),
                params: paramProductCatesOrg
            }),
            keepUnusedDataFor: 3600,
            transformResponse: (response: ResponseType) => response?.context.data ?? {}
        }),
        getDiscountsOrg: builder.query({
            query: (org_id: number | string) => ({
                url: API_ROUTE.DISCOUNTS,
                params: pickBy(
                    {
                        ...paramDiscounts,
                        'filter[organization_id]': org_id
                    },
                    identity
                )
            }),
            keepUnusedDataFor: 3600,
            transformResponse: (response: ResponseType) => response?.context.data ?? {}
        }),
        getProductsSpecialOrg: builder.query({
            query: (org_id: number | string) => ({
                url: API_ROUTE.ORG_PRODUCTS(org_id),
                params: pickBy({
                    ...paramsProducts,
                    "limit": 12,
                    "filter[special_price]": true,
                    "filter[special]": true,
                    "filter[special_ecommerce]": true
                }, identity)
            }),
            keepUnusedDataFor: 3600,
            transformResponse: (response: ResponseType) => response?.context.data ?? {}
        }),
        getServicesSpecialOrg: builder.query({
            query: (org_id: string | number) => ({
                url: API_ROUTE.ORG_SERVICES(org_id),
                params: pickBy({
                    ...paramsServices,
                    "limit": 12,
                    "filter[special_price]": true,
                    "filter[special]": true,
                    "filter[special_ecommerce]": true
                }, identity)
            }),
            keepUnusedDataFor: 3600,
            transformResponse: (response: ResponseType) => response?.context.data ?? {}
        })
    })
})

export const {
    useGetServiceCateOrgQuery,
    useGetProductCateOrgQuery,
    useGetDiscountsOrgQuery,
    useGetProductsSpecialOrgQuery,
    useGetServicesSpecialOrgQuery
} = orgPageApi