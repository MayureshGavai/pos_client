import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const itemsApi = createApi({
    reducerPath:"itemsApi",
    baseQuery: fetchBaseQuery({baseUrl:"http://localhost:8080/"}),
    endpoints: (builder) =>({
        getAllItems:builder.query({
            query:()=>({
                url:'/api/items/getitems',
                method:'GET'
            })
        })
    })
})

export const {useGetAllItemsQuery} = itemsApi