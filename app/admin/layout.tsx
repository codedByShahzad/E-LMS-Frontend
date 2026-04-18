// app/admin/layout.tsx
import { ReactNode } from "react";
import Sidebar from "@/src/components/SideBar"; // or wherever your Sidebar is

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-white">
        {children}
      </main>
    </div>
  );
}