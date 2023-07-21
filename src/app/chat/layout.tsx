"use client"

import Navbar from "@/components/Navbar";
import Route from "@/components/Route";
import UsersSidebar from "@/components/UsersSidebar";
import Toast from "@/components/Toast";
// import { Metadata } from "next";
import { ReactNode, useState } from "react";
import useWindowSize from "@/hooks/useWindowSize";
import useCurrentChat from "@/zustand/currentChat.zustand";

// export const metadata: Metadata = {
//   title: "MeChat | Chat",
// };

const layout = ({ children }: { children: ReactNode }) => {
  const windowSize = useWindowSize()
  const currentChat = useCurrentChat((state) => state.currentChat);
  console.log(windowSize)
  return (
    <Route matchedStatus="unauthenticated" redirect="/auth/signin">
      <Toast />
      <div className="min-h-screen bg-secondary">
        <Navbar />
        <div className="pt-20 relative">
          { !(currentChat && windowSize.width < 768) ? <UsersSidebar /> : null }
          {children}
        </div>
      </div>
    </Route>
  );
};

export default layout;
