export interface Instructor {
  id: string;
  name: string;
  avatar: string;
  title: string;
}

export interface Course {
  id: string;
  title: string;
  thumbnail: string;
  instructor: Instructor;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  duration: string;
  lessonsCount: number;
  category: string;
  tags: string[];
  isNew?: boolean;
  isBestseller?: boolean;
}