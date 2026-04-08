"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Clock, BookOpen, TrendingUp, Sparkles } from "lucide-react";
import { Course } from "@/src/types/course";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const discount = course.originalPrice
    ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
    : 0;

  const difficultyColors = {
    Beginner: "bg-success-light text-success",
    Intermediate: "bg-warning-light text-warning",
    Advanced: "bg-error-light text-error",
  };

  return (
    <Link href={`/courses/${course.id}`} className="group">
      <div className="card card-interactive h-full flex flex-col">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden rounded-t-xl">
          <Image
            src={course.thumbnail}
            alt={course.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Badges */}
          {/* <div className="absolute top-3 left-3 flex flex-col gap-2">
            {course.isNew && (
              <span className="badge badge-secondary flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                New
              </span>
            )}
            {course.isBestseller && (
              <span className="badge badge-warning flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                Bestseller
              </span>
            )}
            {discount > 0 && (
              <span className="badge badge-error">-{discount}%</span>
            )}
          </div> */}

          {/* Difficulty Badge */}
          <div className="absolute bottom-3 right-3">
            <span className={`badge ${difficultyColors[course.difficulty]}`}>
              {course.difficulty}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          {/* Category */}
          <p className="text-caption text-primary-600 font-medium mb-2">
            {course.category}
          </p>

          {/* Title */}
          <h3 className="text-heading-3 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {course.title}
          </h3>

          {/* Instructor */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-border">
              <Image
                src={course.instructor.avatar}
                alt={course.instructor.name}
                fill
                className="object-cover"
                sizes="32px"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-small font-medium text-content-primary truncate">
                {course.instructor.name}
              </p>
              <p className="text-caption text-content-tertiary truncate">
                {course.instructor.title}
              </p>
            </div>
          </div>

          {/* Meta Info */}
          {/* <div className="flex items-center gap-4 text-caption text-content-secondary mb-4">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {course.duration}
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" />
              {course.lessonsCount} lessons
            </span>
          </div> */}

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-warning text-warning" />
              <span className="text-sm font-semibold text-content-primary">
                {course.rating}
              </span>
            </div>
            <span className="text-caption text-content-tertiary">
              ({course.reviewCount.toLocaleString()} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-primary-600">
                ${course.price}
              </span>
              {course.originalPrice && (
                <span className="text-sm text-content-tertiary line-through">
                  ${course.originalPrice}
                </span>
              )}
            </div>
            <span className="text-caption text-content-secondary">
              {course.tags.slice(0, 2).join(" • ")}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}