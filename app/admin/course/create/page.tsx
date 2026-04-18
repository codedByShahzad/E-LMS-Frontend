// app/admin/course/create/page.tsx
"use client";

import { useState } from "react";

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
    title: "",
    category: "",
    price: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <div className="flex-1 p-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-bold text-2xl text-gray-900 mb-2">
          Let's add a Course
        </h1>
        <p className="text-gray-600">
          Add some basic details for your new course. You can edit these details later in the course settings.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Your Course Name"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
            Category
          </label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Course Price */}
        <div>
          <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-2">
            Course Price
          </label>
          <div className="relative">
            <span className="absolute left-4 top-3 text-gray-500">$</span>
            <input
              type="text"
              id="price"
              placeholder="0"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full border border-gray-300 rounded-lg pl-8 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            Create Course
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