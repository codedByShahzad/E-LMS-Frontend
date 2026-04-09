"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  User,
  Calendar,
  MapPin,
  GraduationCap,
  Edit3,
  BookOpen,
  Award,
  Clock,
  TrendingUp,
  Search,
  Camera,
  X,
  CheckCircle2,
  Loader2,
  Briefcase
} from "lucide-react";
import { enrolledCourses } from "@/src/lib/courseData";
import { courseProgress } from "@/src/lib/courseData";
import CourseCard from "@/src/components/CourseCard";
import { useLoadUserQuery } from "@/src/features/api/authApi";

// Mock user data - simplified
const userData = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  role: "Student",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
  joinedDate: "January 2024",
};



export default function ProfilePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState(userData);
  const [tempAvatar, setTempAvatar] = useState(userData.avatar);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {data, isLoading} = useLoadUserQuery()

console.log(data)

  // Calculate stats
  const totalCourses = enrolledCourses.length;
  const completedCourses = Object.values(courseProgress).filter(
    p => p.progressPercentage === 100
  ).length;

  // Filter courses
  const filteredCourses = enrolledCourses.filter(course => {
    return course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => {
    setTempAvatar("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await new Promise(resolve => setTimeout(resolve, 1000));
    setFormData({ ...formData, avatar: tempAvatar });
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setIsEditModalOpen(false);
    }, 1500);
  };

  const closeModal = () => {
    if (!isLoading) {
      setIsEditModalOpen(false);
      setTempAvatar(formData.avatar);
    }
  };

  return (
    <div className="min-h-screen bg-surface-elevated pb-16">
      {/* Profile Card - Modern Professional Design */}
      <div className="bg-surface border-b border-border">
        <div className="page-container py-8 md:py-12">
          <div className="card p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="relative w-24 h-24 md:w-28 md:h-28">
                  <div className="w-full h-full rounded-full overflow-hidden ring-4 ring-primary-100">
                    <Image
                      src={formData.avatar}
                      alt="Profile"
                      width={112}
                      height={112}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </div>

              {/* Info - Stacked Layout */}
              <div className="flex-1 min-w-0">
                {/* Name */}
                <h1 className="text-2xl md:text-3xl font-bold text-content-primary mb-4">
                  {formData.firstName} {formData.lastName}
                </h1>

                {/* Info Rows - Stacked */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-content-secondary">
                    <Mail className="w-4 h-4 text-content-tertiary flex-shrink-0" />
                    <span className="text-body">{formData.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-content-secondary">
                    <User className="w-4 h-4 text-content-tertiary flex-shrink-0" />
                    <span className="text-body">{formData.role}</span>
                  </div>
                  <div className="flex items-center gap-2 text-content-secondary">
                    <Calendar className="w-4 h-4 text-content-tertiary flex-shrink-0" />
                    <span className="text-body">Joined {formData.joinedDate}</span>
                  </div>
                </div>
              </div>

              {/* Stats & Edit Button */}
              <div className="flex flex-row md:flex-col items-center md:items-end gap-4 md:gap-6">
                <div className="flex gap-3">
                  <div className="text-center px-4 py-3 bg-surface-sunken rounded-xl min-w-[80px]">
                    <p className="text-2xl font-bold text-content-primary">{totalCourses}</p>
                    <p className="text-xs text-content-secondary mt-0.5">Courses</p>
                  </div>
                  <div className="text-center px-4 py-3 bg-success-light rounded-xl min-w-[80px]">
                    <p className="text-2xl font-bold text-success">{completedCourses}</p>
                    <p className="text-xs text-success/70 mt-0.5">Completed</p>
                  </div>
                </div>

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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
            />
          </div>
        </div>

        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="empty-state py-16 bg-surface rounded-2xl border border-border">
            <div className="w-20 h-20 bg-surface-sunken rounded-full flex items-center justify-center mb-6">
              <GraduationCap className="w-10 h-10 text-content-tertiary" />
            </div>
            <h3 className="text-heading-2 mb-2">No courses found</h3>
            <p className="text-body text-content-secondary mb-6 max-w-md mx-auto">
              {searchQuery 
                ? "Try adjusting your search to find your courses."
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

      {/* Edit Modal with Avatar Upload */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
          />

          <div className="relative w-full max-w-md bg-surface rounded-2xl shadow-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-heading-2">Edit Profile</h2>
              <button
                onClick={closeModal}
                disabled={isLoading}
                className="btn btn-ghost p-2 disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isSuccess && (
              <div className="mb-4 flex items-center gap-2 bg-success-light border border-success/20 rounded-lg px-4 py-3">
                <CheckCircle2 className="w-5 h-5 text-success" />
                <p className="text-success text-sm font-medium">Profile updated!</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Avatar Upload Section */}
              <div className="flex flex-col items-center">
                <div className="relative mb-3">
                  <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-primary-100">
                    <Image
                      src={tempAvatar}
                      alt="Profile"
                      width={96}
                      height={96}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleAvatarClick}
                    className="absolute bottom-0 right-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary-700 transition-colors"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleAvatarClick}
                    className="text-sm text-primary-600 hover:underline font-medium"
                  >
                    Change Photo
                  </button>
                  <span className="text-content-tertiary">|</span>
                  <button
                    type="button"
                    onClick={handleRemoveAvatar}
                    className="text-sm text-error hover:underline font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="input-label">First Name</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="input-label">Last Name</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="input-field"
                  />
                </div>
              </div>
              
              <div>
                <label className="input-label">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="input-field"
                />
              </div>
              
              {/* Role Field - Replaced Location */}
              <div>
                <label className="input-label">Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="input-field appearance-none cursor-pointer"
                >
                  <option value="Student">Student</option>
                  <option value="Instructor">Instructor</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={isLoading}
                  className="btn btn-ghost flex-1 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-primary flex-1 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}