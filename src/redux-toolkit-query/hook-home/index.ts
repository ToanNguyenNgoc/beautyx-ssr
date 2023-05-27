import { IPaymentMethod, ResponseType } from 'interface'
import API_ROUTE from 'api/_api'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { identity, pickBy } from 'lodash'
import { baseURL, token } from 'config'

export const homeApi = createApi({
    reducerPath: 'homeApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        prepareHeaders(headers, api) {
            headers.set('Authorization', `Bearer ${token}`)
            return headers
        },
    }),
    endpoints: builder => ({
        galleries: builder.query({
            query: (org_id: number | string) => ({
                url:API_ROUTE.GALLERIES_ORG_ID(org_id),
                params:{'include':'images|videos'}
            }),
            keepUnusedDataFor: 60 * 60, // default 60 seconds
            transformResponse: (response: ResponseType) => response?.context?.data ?? []
        }),
        orgsDistance: builder.query({
            query: (params) => ({
                url: API_ROUTE.ORGS,
                params: pickBy(params, identity)
            }),
            keepUnusedDataFor: 60 * 60,
            transformResponse: (response: ResponseType) => response?.context?.data ?? []
        }),
        serviceCatesChild: builder.query({
            query: (parent_id: number | string) => API_ROUTE.TAGS_ID(parent_id),
            keepUnusedDataFor: 3600,
            transformResponse: (response: ResponseType) => response?.context ?? {}
        }),
        getPaymentMethod: builder.query<IPaymentMethod[], void>({
            query: () => API_ROUTE.PAYMENT_METHOD,
            keepUnusedDataFor: 3600,
            transformResponse: (response: ResponseType) => response?.context?.data
        })
    })
})

export const {
    useGalleriesQuery,
    useOrgsDistanceQuery,
    useServiceCatesChildQuery,
    useGetPaymentMethodQuery
} = homeApi
