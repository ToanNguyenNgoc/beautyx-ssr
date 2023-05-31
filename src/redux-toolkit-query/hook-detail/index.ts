import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseURL } from 'api/axios'
import API_ROUTE from 'api/_api'
import { ResponseType } from 'interface'

export const serProComDetailApi = createApi({
    reducerPath: 'serProComDetailApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL
    }),
    endpoints: builder => ({
        getByOrgIdCateId: builder.query({
            query: ({ org_id, type, params }) => ({
                url: type === 'PRODUCT' ? API_ROUTE.ORG_PRODUCTS(org_id) : API_ROUTE.ORG_SERVICES(org_id),
                params: params
            }),
            keepUnusedDataFor: 60 * 60, // default 60 seconds
            transformResponse: (response: ResponseType) => response?.context?.data ?? []
        })
    })
})

export const {
    useGetByOrgIdCateIdQuery
} = serProComDetailApi