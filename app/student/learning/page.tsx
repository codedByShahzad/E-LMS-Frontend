"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  BookOpen, 
  Clock, 
  Award, 
  TrendingUp, 
  Search,
  GraduationCap,
  Play,
  ChevronRight
} from "lucide-react";
import { enrolledCourses } from "@/src/lib/courseData";
import { courseProgress } from "@/src/lib/courseData";
import CourseCard from "@/src/components/CourseCard";

export default function MyLearningPage() {
  const [searchQuery, setSearchQuery] = useState("");


  // Filter courses
  const filteredCourses = enrolledCourses

  return (
    <div className="min-h-screen bg-surface-elevated pb-16">
      {/* Header */}
      <div className="bg-surface border-b border-border">
        <div className="page-container py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-heading-1 mb-2">My Learning</h1>
              <p className="text-body text-content-secondary">
                Continue where you left off and track your progress
              </p>
            </div>
            <Link href="/courses" className="btn btn-outline self-start">
              <BookOpen className="w-4 h-4" />
              Browse More Courses
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
     

      {/* Filters and Search */}
      <div className="page-container mt-8">
        

       

        {/* Course Grid - Using Existing CourseCard Component */}
        <h2 className="text-heading-2 mb-6">Your Courses</h2>
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="empty-state py-20">
            <div className="w-20 h-20 bg-surface-sunken rounded-full flex items-center justify-center mb-6">
              <GraduationCap className="w-10 h-10 text-content-tertiary" />
            </div>
            <h3 className="text-heading-2 mb-2">No courses found</h3>
            <p className="text-body text-content-secondary mb-6 max-w-md mx-auto">
              {searchQuery 
                ? "Try adjusting your search or filter to find your courses."
                : "You haven't enrolled in any courses yet. Start your learning journey today!"}
            </p>
            {!searchQuery && (
              <Link href="/courses" className="btn btn-primary">
                <BookOpen className="w-4 h-4" />
                Explore Courses
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}