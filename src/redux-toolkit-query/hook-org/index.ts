import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseURL } from 'api/axios'
import API_ROUTE from 'api/_api'
import { paramProductCatesOrg, paramServiceCatesOrg } from 'params-query'
import { ResponseType } from 'interface'

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
        })
    })
})

export const {
    useGetServiceCateOrgQuery,
    useGetProductCateOrgQuery
} = orgPageApi