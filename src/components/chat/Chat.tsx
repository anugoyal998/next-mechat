import { FC } from "react";

interface ChatProps {}

const Chat: FC<ChatProps> = ({}) => {
  return (
    <div
      className="fixed left-[250px] bg-white border-r border-slate-300 shadow-sm p-3"
      style={{ height: "calc(100vh - 5rem)", width: "calc(100vw - 250px)" }}
    >
      chat
    </div>
  );
};

export default Chat;
