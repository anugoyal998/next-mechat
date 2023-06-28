"use client";

import { RouteContext } from "@/components/Route";
import ChatNavbar from "@/components/chat/ChatNavbar";
import Editor from "@/components/chat/Editor";
import Text from "@/components/ui/Text";
import useCurrentChat from "@/zustand/currentChat.zustand";
import { MessageCircle } from "lucide-react";
import { Metadata } from "next";
import { FC, useState, useContext } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const currentChat = useCurrentChat((state) => state.currentChat);
  const [msg, setMsg] = useState("");
  const [msgs, setMsgs] = useState([]);
  const session = useContext(RouteContext);
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
      <div
        className="fixed bottom-2"
        style={{ width: "calc(100vw - 250px - 24px)", height: "3rem" }}
      >
        <Editor
          msg={msg}
          setMesg={setMsg}
          currentChat={currentChat.email}
          sndEmail={session?.user?.email as string}
        />
      </div>
    </div>
  );
};

export default page;
