import { fetchBaseQuery } from "@reduxjs/toolkit/query"
import { createApi } from "@reduxjs/toolkit/query/react"
import { userLoggedIn } from "../authSlice";
import { url } from "inspector";
import { METHODS } from "http";

const userApi = "http://localhost:8080/api/v1/user/"

interface UserType {
  id: string;
  email: string;
  name: string;
  role: string
  enrolledCourses: [],
  photoUrl: string
    createdAt: number
  // add other user fields your API returns
}

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: userApi,
        credentials: 'include',
    }),
    endpoints: (builder) => ({       // ✅ ({ — opens object with parenthesis
        registerUser: builder.mutation({       // Mutation when we use .post()
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
logoutUser: builder.mutation({
  query: () => ({
    url: "logout",
    method: "POST",
    credentials: "include",
  }),
}),
        loadUser: builder.query<UserType, void>({   // query when we need to get soemthing .get()
            query: () =>({
                url: "/profile",
                method: "GET"
            })
        }),
        updateUser: builder.mutation({
            query: (formData) =>({
                url: "profile/edit",
                method: "PUT",
                body: formData,
                credentials: "include"
            })
        })

    })                               // ✅ }) — closes object with parenthesis
})


// Export the auto-generated hook
export const { useRegisterUserMutation, useLoginUserMutation, useLogoutUserMutation, useLoadUserQuery, useUpdateUserMutation  } = authApi