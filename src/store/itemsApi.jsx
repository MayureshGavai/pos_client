import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const itemsApi = createApi({
    reducerPath:"itemsApi",
    baseQuery: fetchBaseQuery({baseUrl:`${import.meta.env.REACT_APP_API_BASE_URL}`}),
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