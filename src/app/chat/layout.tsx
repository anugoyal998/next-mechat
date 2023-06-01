import Navbar from "@/components/Navbar";
import Route from "@/components/Route";
import UsersSidebar from "@/components/UsersSidebar";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <Route matchedStatus="unauthenticated" redirect="/auth/signin">
      <div className="min-h-screen bg-secondary">
        {/* @ts-expect-error Server Component */}
        <Navbar />
        <div className="pt-20 relative">
          <UsersSidebar />
          <main
            className="fixed left-[250px] bg-secondary border-r border-slate-300 shadow-sm p-3 flex justify-center items-center"
            style={{
              height: "calc(100vh - 5rem)",
              width: "calc(100vw - 250px)",
            }}
          >
            {children}
          </main>
        </div>
      </div>
    </Route>
  );
};

export default layout;
