"use client";

import { useState } from "react"
import ChatNavbar from "@/components/chat/ChatNavbar";
import Editor from "@/components/chat/Editor";
// import Message from "@/components/chat/Message";
import Message1 from "@/components/chat/Message1";
import Text from "@/components/ui/Text";
import useCurrentChat from "@/zustand/currentChat.zustand";
import { MessageCircle } from "lucide-react";
import { Metadata } from "next";
import { cn } from "@/lib/utils";
import useWindowSize from "@/hooks/useWindowSize";
import { Message } from "@prisma/client";

const page = ({}) => {
  const currentChat = useCurrentChat((state) => state.currentChat);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [items, setItems] = useState<Message[]>([])
  const windowSize = useWindowSize()
  return !currentChat ? (
    <div
      className="hidden fixed left-[250px] bg-secondary border-r border-slate-300 shadow-sm p-3 md:flex justify-center items-center"
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
      className={cn("fixed bg-[#F1F4F5] border-r border-slate-300 shadow-sm p-3", windowSize.width >= 768 && "left-[250px]" )}
      id="chat"
      style={{
        height: "calc(100vh - 5rem)",
        width: windowSize.width < 768 ? "100vw" : "calc(100vw - 250px)",
      }}
    >
      <ChatNavbar />
      <div className="my-2 border" />
      <Message1 items={items} setItems={setItems} />
      <div
        className="fixed bottom-2"
        style={{ width: windowSize.width < 768 ? "100vw" : "calc(100vw - 250px - 24px)", height: "3rem" }}
      >
        <Editor setItems={setItems} />
      </div>
    </div>
  );
};

export default page;
