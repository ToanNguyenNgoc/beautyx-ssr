import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import API_3RD from 'api/3rd-api'
import { token } from 'api/authHeader'
import { identity, pickBy } from 'lodash'

export const searchApi = createApi({
    reducerPath: 'searchApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_3RD.API_NODE,
        prepareHeaders(headers, api) {
            headers.set('Authorization', `Bearer ${token}`)
            return headers
        },
    }),
    tagTypes: ['Searches'],
    endpoints: builder => ({
        getSearch: builder.query({
            query: (user_id: number | string) => `/search_history/users/${user_id}`,
            keepUnusedDataFor: 3600,
            transformResponse: (response: any) => response?.data?.context?.data ?? [],
            providesTags: ['Searches']
        }),
        postSearchHis: builder.mutation({
            query: (body) => ({
                url: '/search_history',
                method: 'POST',
                body: pickBy(body, identity),
            }),
            invalidatesTags: ['Searches']
        }),
        deleteById: builder.mutation({
            query: (id) => ({
                url: `/search_history/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Searches']
        }),
        deleteAll: builder.mutation({
            query: () => ({
                url: `/search_history/delete`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Searches']
        })
    })
})
export const {
    useGetSearchQuery,
    usePostSearchHisMutation,
    useDeleteByIdMutation,
    useDeleteAllMutation
} = searchApi