"use client"

import Navbar from "@/components/Navbar";
import Route from "@/components/Route";
import UsersSidebar from "@/components/UsersSidebar";
import Toast from "@/components/Toast";
import { useToastData, useToastOpen } from "@/zustand/toast.zustand";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "MeChat | Chat",
};

const layout = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useToastOpen((state) => [state.open, state.setOpen]);
  const [toastData, setToastData] = useToastData((state) => [
    state.toastData,
    state.setToastData,
  ]);
  return (
    <Route matchedStatus="unauthenticated" redirect="/auth/signin">
      <Toast open={open} onOpenChange={setOpen} toastData={toastData} />
      <div className="min-h-screen bg-secondary">
        <Navbar setOpen={setOpen} setToastData={setToastData} />
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
