import { Dispatch, FC, MouseEventHandler, SetStateAction } from "react";
import { Send } from "lucide-react";

interface EditorProps {
  msg: string;
  setMesg: Dispatch<SetStateAction<string>>;
  params: { snd: string; rec: string };
}

const Editor: FC<EditorProps> = ({ msg, setMesg, params }) => {
  const handleSendMessage: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    if (!msg) return;
    try {
      await fetch("/api/chat/send-msg", {
        method: "POST",
        body: JSON.stringify({
          sndEmail: "anubhav@conceptdash.ca",
          recEmail: "ziiiro52@gmail.com",
          type: "text",
          text: msg,
        }),
      });
    } catch (err) {}
  };
  return (
    <div className="w-full h-full rounded-md flex justify-between items-center space-x-3">
      <input
        type="text"
        className="flex-1 outline-none p-3 bg-white border-2 rounded-md"
        autoFocus
        placeholder="Type a message"
        value={msg}
        onChange={(e) => setMesg(e.target.value)}
      />
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
