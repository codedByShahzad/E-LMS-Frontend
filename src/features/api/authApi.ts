import { fetchBaseQuery } from "@reduxjs/toolkit/query"
import { createApi } from "@reduxjs/toolkit/query/react"
import { userLoggedIn } from "../authSlice";

const userApi = "http://localhost:8080/api/v1/user/"

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: userApi,
        credentials: 'include',
    }),
    endpoints: (builder) => ({       // ✅ ({ — opens object with parenthesis
        registerUser: builder.mutation({
            query: (inputData) => ({
                url: "register",
                method: "POST",
                body: inputData
            })
        }),
        loginUser: builder.mutation({
            query: (inputData) => ({
                url: "login",
                method: "POST",
                body: inputData
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try {
                    const result = await queryFulfilled
                    dispatch(userLoggedIn({user:result.data.user}))
                } catch (error) {
                    console.log(error)
                }
            }
        }),
    })                               // ✅ }) — closes object with parenthesis
})


// Export the auto-generated hook
export const { useRegisterUserMutation, useLoginUserMutation } = authApi