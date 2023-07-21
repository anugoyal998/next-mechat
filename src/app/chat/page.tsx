"use client";

import ChatNavbar from "@/components/chat/ChatNavbar";
import Editor from "@/components/chat/Editor";
// import Message from "@/components/chat/Message";
import Message1 from "@/components/chat/Message1";
import Text from "@/components/ui/Text";
import useCurrentChat from "@/zustand/currentChat.zustand";
import { MessageCircle } from "lucide-react";
import { Metadata } from "next";

const page = ({}) => {
  const currentChat = useCurrentChat((state) => state.currentChat);
  return !currentChat ? (
    <div
      className="fixed left-[250px] bg-secondary border-r border-slate-300 shadow-sm p-3 flex justify-center items-center"
      style={{
        height: "calc(100vh - 5rem)",
        width: "calc(100vw - 250px)",
      }}
    >
      <MessageCircle size={48} />
      <Text className="font-bold" size="3xl">
        MeChat
      </Text>
    </div>
  ) : (
    <div
      className="fixed left-[250px] bg-[#F1F4F5] border-r border-slate-300 shadow-sm p-3"
      style={{
        height: "calc(100vh - 5rem)",
        width: "calc(100vw - 250px)",
      }}
    >
      <ChatNavbar />
      <div className="my-2 border" />
      <Message1 />
      <div
        className="fixed bottom-2"
        style={{ width: "calc(100vw - 250px - 24px)", height: "3rem" }}
      >
        <Editor />
      </div>
    </div>
  );
};

export default page;
