"use client";

import { useState } from "react";
import { ArrowRight, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { latestCourses } from "@/src/lib/courseData";
import CourseCard from "./CourseCard";

export default function LatestCoursesSection() {
  const [filter, setFilter] = useState<"All" | "Development" | "Design" | "Data Science" | "Business">("All");

  const categories = ["All", "Development", "Design", "Data Science", "Business"];

  const filteredCourses = filter === "All" 
    ? latestCourses 
    : latestCourses.filter(course => course.category === filter || 
        (filter === "Business" && ["Marketing", "Finance"].includes(course.category)));

  return (
    <section className="section-padding bg-surface">
      <div className="page-container">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-caption font-semibold text-primary-600 uppercase tracking-wider mb-2 block">
              Latest Courses
            </span>
            <h2 className="text-heading-1 mb-3">
              Explore New Arrivals
            </h2>
            <p className="text-body text-content-secondary max-w-xl">
              Discover the latest courses added by our expert instructors. Stay ahead with cutting-edge skills.
            </p>
          </div>
          
          <Link 
            href="/courses" 
            className="btn btn-outline self-start lg:self-auto"
          >
            View All Courses
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          <Filter className="w-4 h-4 text-content-tertiary mr-2 flex-shrink-0" />
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category as any)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                filter === category
                  ? "bg-primary-600 text-white shadow-md shadow-primary-500/25"
                  : "bg-surface-sunken text-content-secondary hover:text-content-primary hover:bg-border"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="empty-state py-16">
            <div className="empty-state-icon">
              <Filter className="w-10 h-10 text-content-tertiary" />
            </div>
            <h3 className="text-heading-3 mb-2">No courses found</h3>
            <p className="text-body text-content-secondary">
              Try adjusting your filter to see more results.
            </p>
          </div>
        )}

        {/* Load More */}
        <div className="mt-12 text-center">
          <button className="btn btn-primary btn-lg">
            Load More Courses
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}