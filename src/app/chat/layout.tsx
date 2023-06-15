import Navbar from "@/components/Navbar";
import Route from "@/components/Route";
import UsersSidebar from "@/components/UsersSidebar";
import Toast from "@/components/Toast";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "MeChat | Chat",
};

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <Route matchedStatus="unauthenticated" redirect="/auth/signin">
      <Toast />
      <div className="min-h-screen bg-secondary">
        <Navbar />
        <div className="pt-20 relative">
          <UsersSidebar />
          {children}
        </div>
      </div>
    </Route>
  );
};

export default layout;
