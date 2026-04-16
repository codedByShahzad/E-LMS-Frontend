import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn } from "../authSlice";
import { userLoggedOut } from "../authSlice";

const userApi = "http://localhost:8080/api/v1/user/";

/* ---------------- TYPES ---------------- */

interface UserType {
  id: string;
  email: string;
  name: string;
  role: string;
  enrolledCourses: any[];
  photoUrl: string;
  createdAt: number;
}

/* IMPORTANT:
   Your backend returns: { user: {...} }
*/
interface LoadUserResponse {
  user: UserType;
}

/* ---------------- API ---------------- */

export const authApi = createApi({
  reducerPath: "authApi",

  baseQuery: fetchBaseQuery({
    baseUrl: userApi,
    credentials: "include",
  }),

  endpoints: (builder) => ({
    /* ---------------- REGISTER ---------------- */
    registerUser: builder.mutation({
      query: (inputData) => ({
        url: "register",
        method: "POST",
        body: inputData,
      }),
    }),

    /* ---------------- LOGIN ---------------- */
    loginUser: builder.mutation({
      query: (inputData) => ({
        url: "login",
        method: "POST",
        body: inputData,
      }),

      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(
            userLoggedIn({
              user: result.data.user,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),

    /* ---------------- LOGOUT ---------------- */

logoutUser: builder.mutation({
  query: () => ({
    url: "logout",
    method: "POST",
  }),

  async onQueryStarted(_, { queryFulfilled, dispatch }) {
    try {
      await queryFulfilled;

      dispatch(userLoggedOut()); // ✅ correct
    } catch (error) {
      console.log(error);
    }
  },
}),

    /* ---------------- LOAD USER ---------------- */
    loadUser: builder.query<LoadUserResponse, void>({
      query: () => ({
        url: "profile",
        method: "GET",
      }),

      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(
            userLoggedIn({
              user: result.data.user,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),

    /* ---------------- UPDATE USER ---------------- */
    updateUser: builder.mutation({
      query: (formData) => ({
        url: "profile/edit",
        method: "PUT",
        body: formData,
      }),
    }),
  }),
});

/* ---------------- EXPORT HOOKS ---------------- */

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useLoadUserQuery,
  useUpdateUserMutation,
} = authApi;