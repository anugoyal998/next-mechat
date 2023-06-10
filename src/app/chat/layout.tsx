"use client";

import Navbar from "@/components/Navbar";
import Route from "@/components/Route";
import UsersSidebar from "@/components/UsersSidebar";
import Toast from "@/components/Toast";
import { useToastData, useToastOpen } from "@/zustand/toast.zustand";
import { Metadata } from "next";
import { ReactNode, useEffect, useState } from "react";
import {
  GetFriendRequestType,
  GetUserTextResponseType,
} from "@/types/api.types";
import { useChatFetch } from "@/zustand/chatFetch.zustand";

export const metadata: Metadata = {
  title: "MeChat | Chat",
};

const layout = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useToastOpen((state) => [state.open, state.setOpen]);
  const [toastData, setToastData] = useToastData((state) => [
    state.toastData,
    state.setToastData,
  ]);
  const [chatFetch, setChatFetch] = useChatFetch((state) => [
    state.chatFetch,
    state.setChatFetch,
  ]);
  const [friendRequest, setFriendRequest] = useState<GetFriendRequestType[]>(
    []
  );
  const [text, setText] = useState("");
  const [users, setUsers] = useState<GetUserTextResponseType[]>([]);
  const [usersSidebarLoading, setUsersSidebarLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setUsersSidebarLoading(true);
        const responses = await Promise.all([
          fetch("/api/get-friend-request").then((res) => res.json()),
          // fetch(`/api/get-user/${text ? text : "*"}/$`).then((res) => res.json()),
        ]);
        setFriendRequest(responses[0]?.data as GetFriendRequestType[]);
        // setUsers(responses[1]?.data as GetUserTextResponseType[]);
      } catch (err) {
      } finally {
        setUsersSidebarLoading(false);
      }
    })();
  }, [chatFetch]);

  return (
    <Route matchedStatus="unauthenticated" redirect="/auth/signin">
      <Toast open={open} onOpenChange={setOpen} toastData={toastData} />
      <div className="min-h-screen bg-secondary">
        <Navbar
          setOpen={setOpen}
          setToastData={setToastData}
          friendRequest={friendRequest}
          setFriendRequest={setFriendRequest}
          setChatFetch={setChatFetch}
        />
        <div className="pt-20 relative">
          <UsersSidebar
            text={text}
            setText={setText}
            isLoading={usersSidebarLoading}
            setIsLoading={setUsersSidebarLoading}
            users={users}
            setUsers={setUsers}
          />
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
