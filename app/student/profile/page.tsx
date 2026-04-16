"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  User,
  Calendar,
  GraduationCap,
  Edit3,
  X,
} from "lucide-react";
import CourseCard from "@/src/components/CourseCard";
import {
  useLoadUserQuery,
  useUpdateUserMutation,
} from "@/src/features/api/authApi";
import { Course } from "@/src/types/course";

const userData = {
  name: "John Doe",
  email: "john.doe@example.com",
  role: "Student",
  photoUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
  joinedDate: "January 2024",
};

interface LoadUserResponse {
  _id: string;
  name: string;
  email: string;
  role: string;
  photoUrl: string;
  enrolledCourses: Course[];
  createdAt: string;
  updatedAt: string;
}

export default function ProfilePage() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);

  const { data, isLoading, refetch } = useLoadUserQuery();
  const [updateUser, { isLoading: updateUserLoading }] =
    useUpdateUserMutation();

  // ✅ FIX: safe optional chaining (NO casting)
  const apiUser = data?.user ?? undefined;

  const displayUser = {
    name: apiUser?.name || userData.name,
    email: apiUser?.email || userData.email,
    role: apiUser?.role || userData.role,
    photoUrl:
      apiUser?.photoUrl && apiUser.photoUrl.trim() !== ""
        ? apiUser.photoUrl
        : userData.photoUrl,
    createdAt: apiUser?.createdAt || userData.joinedDate,
    enrolledCourses: apiUser?.enrolledCourses || [],
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setProfilePhoto(file);
  };

  const openEditModal = () => {
    setName(displayUser.name);
    setIsEditModalOpen(true);
  };

  const updateUserHandler = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name || displayUser.name);

      if (profilePhoto) {
        formData.append("profilePhoto", profilePhoto);
      }

      await updateUser(formData).unwrap();

      await refetch();

      setIsEditModalOpen(false);
      setName("");
      setProfilePhoto(null);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-elevated pb-16">
      {/* Profile Card */}
      <div className="bg-surface border-b border-border">
        <div className="page-container py-8 md:py-12">
          <div className="card p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8">

              {/* Avatar */}
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

              {/* Info */}
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-bold mb-4">
                  {displayUser.name}
                </h1>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {displayUser.email}
                  </div>

                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span className="capitalize">{displayUser.role}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Joined{" "}
                    {new Date(displayUser.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* Edit Button */}
              <button
                onClick={openEditModal}
                className="btn btn-outline btn-sm"
              >
                <Edit3 className="w-4 h-4" />
                Edit Profile
              </button>

            </div>
          </div>
        </div>
      </div>

      {/* Courses */}
      <div className="page-container mt-8">
        <h2 className="text-heading-2 mb-6">Courses You're Enrolled In</h2>

        {displayUser.enrolledCourses.length === 0 ? (
          <div className="text-center py-16">
            <GraduationCap className="w-10 h-10 mx-auto mb-4" />
            <h3>No courses found</h3>
            <Link href="/courses" className="btn btn-primary mt-4">
              Explore Courses
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayUser.enrolledCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">

            <div className="flex justify-between mb-4">
              <h2>Edit Profile</h2>
              <button onClick={() => setIsEditModalOpen(false)}>
                <X />
              </button>
            </div>

            <form onSubmit={updateUserHandler}>
              <input
                type="text"
                value={name}
                placeholder={displayUser.name}
                onChange={(e) => setName(e.target.value)}
                className="input-field w-full mb-4"
              />

              <input type="file" onChange={onChangeHandler} />

              <button
                type="submit"
                disabled={updateUserLoading}
                className="btn btn-primary w-full mt-4"
              >
                {updateUserLoading ? "Updating..." : "Save Changes"}
              </button>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}