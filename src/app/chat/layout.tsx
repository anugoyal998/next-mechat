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
          <div
            className="fixed left-[250px] bg-secondary border-r border-slate-300 shadow-sm p-3 flex justify-center items-center"
            style={{
              height: "calc(100vh - 5rem)",
              width: "calc(100vw - 250px)",
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </Route>
  );
};

export default layout;
