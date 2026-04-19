// app/admin/course/page.tsx
"use client";

import { useGetAllCoursesQuery } from "@/src/features/api/courseApi";
import Link from "next/link";

const getStatusStyles = (isPublished: boolean) => {
  return isPublished
    ? "bg-green-100 text-green-800"
    : "bg-red-100 text-red-800";
};

export default function CoursePage() {
  const { data, isLoading } = useGetAllCoursesQuery();

  console.log(data);

  return (
    <div className="p-6">
      {/* Create Button */}
      <Link
        href="/admin/course/create"
        className="inline-block bg-slate-800 hover:bg-slate-900 text-white font-medium py-3 px-6 rounded-lg mb-6 transition-colors"
      >
        Create a new course
      </Link>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="border-b">
            <tr className="text-left text-gray-500 text-sm">
              <th className="py-4 px-6 font-medium">Title</th>
              <th className="py-4 px-6 font-medium">Price</th>
              <th className="py-4 px-6 font-medium">Status</th>
              <th className="py-4 px-6 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.courses?.map((course: any, index:any) => (
              <tr
                key={index}
                className="border-b last:border-b-0 hover:bg-gray-50"
              >
                <td className="py-4 px-6 font-semibold text-gray-900">
                  {course.courseTitle}
                </td>
                <td className="py-4 px-6 text-gray-700">
                  {course.coursePrice}
                </td>
                <td className="py-4 px-6">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusStyles(course.isPublished)}`}
                  >
                    {course.isPublished ? "Published" : "Unpublished"}
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <button className="border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
