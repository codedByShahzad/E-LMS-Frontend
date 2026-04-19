import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

const Course_Api = "http://localhost:8080/api/v1/course/";

export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: Course_Api,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: ({ courseTitle, category, coursePrice }) => ({
        url: "/create-course",
        method: "POST",
        body: { courseTitle, category, coursePrice },
      }),
    }),
    getAllCourses: builder.query<any, void>({
      query: () => ({
        url: "/all-courses",
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateCourseMutation, useGetAllCoursesQuery } = courseApi;
