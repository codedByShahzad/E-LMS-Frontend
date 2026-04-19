"use client";

import { useCreateCourseMutation } from "@/src/features/api/courseApi";
import { useEffect, useState } from "react";

const categories = [
  "Web Development",
  "Mobile Development",
  "Data Science",
  "Machine Learning",
  "DevOps",
  "Cloud Computing",
  "Cyber Security",
  "UI/UX Design",
  "Digital Marketing",
  "Business",
];

export default function CreateCoursePage() {
  const [formData, setFormData] = useState({
    courseTitle: "",
    category: "",
    coursePrice: "",
  });

  const [createCourse, { isLoading, isSuccess }] =
    useCreateCourseMutation();

  // Reset form after successful creation
  useEffect(() => {
    if (isSuccess) {
      setFormData({
        courseTitle: "",
        category: "",
        coursePrice: "",
      });
    }
  }, [isSuccess]);

  const createCourseHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.courseTitle ||
      !formData.category ||
      !formData.coursePrice
    ) {
      return;
    }

    try {
      await createCourse({
        courseTitle: formData.courseTitle,
        category: formData.category,
        coursePrice: formData.coursePrice,
      }).unwrap();
    } catch (error) {
      console.log("Error creating course:", error);
    }
  };

  return (
    <div className="flex-1 p-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-bold text-2xl text-gray-900 mb-2">
          Let's add a Course
        </h1>
        <p className="text-gray-600">
          Add some basic details for your new course. You can edit these later.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={createCourseHandler} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            placeholder="Your Course Name"
            value={formData.courseTitle}
            onChange={(e) =>
              setFormData({ ...formData, courseTitle: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Category
          </label>
          <select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Course Price
          </label>
          <div className="relative">
            <span className="absolute left-4 top-3 text-gray-500">$</span>
            <input
              type="text"
              placeholder="0"
              value={formData.coursePrice}
              onChange={(e) =>
                setFormData({ ...formData, coursePrice: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg pl-8 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className={`font-semibold py-3 px-8 rounded-lg transition-colors text-white ${
              isLoading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isLoading ? "Creating..." : "Create Course"}
          </button>

          <a
            href="/admin/course"
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}