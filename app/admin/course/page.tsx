// app/admin/course/page.tsx
"use client";

import Link from "next/link";

const courses = [
  { id: 1, title: "Mastering Docker: From Beginner to Pro", price: "499₹", status: "Published" },
  { id: 2, title: "Mastering Next.js: Full-Stack Web Development", price: "239₹", status: "Pending" },
  { id: 3, title: "Master HTML: The Complete Guide to Web Development Fundamentals", price: "199₹", status: "Published" },
  { id: 4, title: "JavaScript Basics: From Zero to Hero", price: "449₹", status: "Unpublished" },
  { id: 5, title: "React for Beginners: Building Dynamic User Interfaces", price: "645₹", status: "Published" },
  { id: 6, title: "Full-Stack Web Development with MERN Stack", price: "799₹", status: "Pending" },
  { id: 7, title: "Ultimate MongoDB Course for Beginners", price: "199₹", status: "Published" },
  { id: 8, title: "Data Science Complete Course Zero to Hero", price: "299₹", status: "Unpublished" },
  { id: 9, title: "Redux Toolkit from Zero to Hero", price: "129₹", status: "Published" },
];

const getStatusStyles = (status: string) => {
  switch (status) {
    case "Published":
      return "bg-green-100 text-green-800";
    case "Pending":
      return "bg-yellow-100 text-yellow-800";
    case "Unpublished":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function CoursePage() {
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
            {courses.map((course) => (
              <tr key={course.id} className="border-b last:border-b-0 hover:bg-gray-50">
                <td className="py-4 px-6 font-semibold text-gray-900">{course.title}</td>
                <td className="py-4 px-6 text-gray-700">{course.price}</td>
                <td className="py-4 px-6">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusStyles(course.status)}`}>
                    {course.status}
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