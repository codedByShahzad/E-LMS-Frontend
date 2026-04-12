"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  User,
  Calendar,
  GraduationCap,
  Edit3,
  BookOpen,
  Search,
  Camera,
  X,
} from "lucide-react";
import CourseCard from "@/src/components/CourseCard";
import { useLoadUserQuery } from "@/src/features/api/authApi";
import { Course } from "@/src/types/course";
// Static fallback data
const userData = {
  name: "John Doe",
  email: "john.doe@example.com",
  role: "Student",
  photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
  joinedDate: "January 2024",
};

// Define the API response type
// Define the API response type
interface LoadUserResponse {
  _id: string;
  name: string;
  email: string;
  role: string;
  photoUrl: string;
  enrolledCourses: Course[]; // Change from string[] to Course[]
  createdAt: string;
  updatedAt: string;
}


export default function ProfilePage() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { data, isLoading } = useLoadUserQuery();
const apiUser = (data as any)?.user as LoadUserResponse;
  
  // Merge API data with fallbacks - handle empty photoUrl
  const displayUser = {
    name: apiUser?.name || userData.name,
    email: apiUser?.email || userData.email,
    role: apiUser?.role || userData.role,
    photoUrl: apiUser?.photoUrl && apiUser.photoUrl.trim() !== "" 
      ? apiUser.photoUrl 
      : userData.photoUrl,
    createdAt: apiUser?.createdAt || userData.joinedDate,
    enrolledCourses: apiUser?.enrolledCourses
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-surface-elevated pb-16">
      {/* Profile Card */}
      <div className="bg-surface border-b border-border">
        <div className="page-container py-8 md:py-12">
          <div className="card p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="relative w-24 h-24 md:w-28 md:h-28">
                  <div className="w-full h-full rounded-full overflow-hidden ring-4 ring-primary-100">
                    <Image
                      src={displayUser.photoUrl}
                      alt="Profile"
                      width={112}
                      height={112}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl md:text-3xl font-bold text-content-primary mb-4">
                  {displayUser.name}
                </h1>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-content-secondary">
                    <Mail className="w-4 h-4 text-content-tertiary flex-shrink-0" />
                    <span className="text-body">{displayUser.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-content-secondary">
                    <User className="w-4 h-4 text-content-tertiary flex-shrink-0" />
                    <span className="text-body capitalize">{displayUser.role}</span>
                  </div>
                  <div className="flex items-center gap-2 text-content-secondary">
                    <Calendar className="w-4 h-4 text-content-tertiary flex-shrink-0" />
                    <span className="text-body">
                      Joined {new Date(displayUser.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Edit Button */}
              <div className="flex flex-row md:flex-col items-center md:items-end gap-4 md:gap-6">
                <button 
                  onClick={() => setIsEditModalOpen(true)}
                  className="btn btn-outline btn-sm"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enrolled Courses Section */}
      <div className="page-container mt-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h2 className="text-heading-2">Courses You're Enrolled In</h2>
          
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-content-tertiary" />
            <input
              type="text"
              placeholder="Search your courses..."
              className="w-full pl-10 pr-4 py-2.5 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
            />
          </div>
        </div>


{
  displayUser.enrolledCourses.length === 0 ? (

        <div className="empty-state py-16 bg-surface rounded-2xl border border-border">
          <div className="w-20 h-20 bg-surface-sunken rounded-full flex items-center justify-center mb-6">
            <GraduationCap className="w-10 h-10 text-content-tertiary" />
          </div>
          <h3 className="text-heading-2 mb-2">No courses found</h3>
          <p className="text-body text-content-secondary mb-6 max-w-md mx-auto">
            You haven't enrolled in any courses yet. Start your learning journey today!
          </p>
          <Link href="/courses" className="btn btn-primary">
            <BookOpen className="w-4 h-4" />
            Explore Courses
          </Link>
        </div>
  ): (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {displayUser.enrolledCourses.map((course)=> <CourseCard key={course.id} course={course} />)}
    </div>
  ) 
}
        
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsEditModalOpen(false)}
          />
          <div className="relative w-full max-w-md bg-surface rounded-2xl shadow-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-heading-2">Edit Profile</h2>
              <button onClick={() => setIsEditModalOpen(false)} className="btn btn-ghost p-2">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form className="space-y-5">
              <div className="flex flex-col items-center">
                <div className="relative mb-3">
                  <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-primary-100">
                    <Image
                      src={displayUser.photoUrl}
                      alt="Profile"
                      width={96}
                      height={96}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <button type="button" className="absolute bottom-0 right-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center shadow-lg">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex gap-3">
                  <button type="button" className="text-sm text-primary-600 font-medium">Change Photo</button>
                  <span className="text-content-tertiary">|</span>
                  <button type="button" className="text-sm text-error font-medium">Remove</button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="input-label">First Name</label>
                  <input type="text" defaultValue={displayUser.name.split(' ')[0]} className="input-field" />
                </div>
                <div>
                  <label className="input-label">Last Name</label>
                  <input type="text" defaultValue={displayUser.name.split(' ').slice(1).join(' ')} className="input-field" />
                </div>
              </div>
              <div>
                <label className="input-label">Email</label>
                <input type="email" defaultValue={displayUser.email} className="input-field" />
              </div>
              <div>
                <label className="input-label">Role</label>
                <select defaultValue={displayUser.role} className="input-field">
                  <option value="student">Student</option>
                  <option value="instructor">Instructor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="btn btn-ghost flex-1">Cancel</button>
                <button type="submit" className="btn btn-primary flex-1">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}