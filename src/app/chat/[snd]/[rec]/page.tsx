"use client"

import { useState } from "react";
import ChatNavbar from "@/components/chat/ChatNavbar";
import Editor from "@/components/chat/Editor";

const page = ({ params }: { params: { snd: string; rec: string } }) => {
  const [msg, setMsg] = useState('')
  const [msgs, setMsgs] = useState([])
  return (
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
        <Editor msg={msg} setMesg={setMsg} params={params} />
      </div>
    </div>
  );
};

export default page;
