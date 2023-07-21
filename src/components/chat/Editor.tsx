import {
  MouseEventHandler,
  useState,
  useContext,
} from "react";
import { Send, Plus } from "lucide-react";
import useCurrentChat from "@/zustand/currentChat.zustand";
import { RouteContext } from "../Route";

const Editor = ({}) => {
  const [msg, setMsg] = useState("");
  const currentChat = useCurrentChat((state) => state.currentChat?.email as string);
  const sndEmail = useContext(RouteContext)?.user?.email as string;
  const handleSendMessage: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    if (!msg) return;
    try {
      await fetch("/api/chat/send-msg", {
        method: "POST",
        body: JSON.stringify({
          sndEmail,
          recEmail: currentChat,
          type: "text",
          text: msg,
        }),
      });
      setMsg("");
    } catch (err) {}
  };
  return (
    <div className="w-full h-full rounded-md flex justify-between items-center space-x-3">
      <div className="flex flex-1 items-center p-3 border-2 rounded-md bg-white space-x-3">
        <Plus className="text-gray-400 cursor-pointer" />
        <input
          type="text"
          className="flex-1 outline-none"
          autoFocus
          placeholder="Type a message"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
      </div>
      <button
        className="hover:scale-110 outline-none p-3 flex justify-center items-center bg-black rounded-md"
        onClick={handleSendMessage}
      >
        <Send color="#fff" />
      </button>
    </div>
  );
};

export default Editor;
