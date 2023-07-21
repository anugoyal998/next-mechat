import useInfiniteCursor from "@/hooks/useInfiniteCursor";
import { cn, formatTimeToNow, reverseAppendList } from "@/lib/utils";
import useCurrentChat from "@/zustand/currentChat.zustand";
import { Message } from "@prisma/client";
import {
  FC,
  useState,
  useRef,
  useCallback,
  forwardRef,
  useEffect,
} from "react";

interface MessageProps {}

const Message: FC<MessageProps> = ({}) => {
  const [cursor, setCursor] = useState("$");
  const currentChat = useCurrentChat((state) => state.currentChat);
  const {
    isLoading,
    hasMore,
    data: msgs,
    newCursor,
  } = useInfiniteCursor<Message, any>(
    { method: "GET", url: `/api/fetch-chat/${currentChat?.email}/${cursor}` },
    (prev, next) => reverseAppendList<Message>(prev, next),
    cursor,
    currentChat
  );

  useEffect(() => {
    setCursor("$");
  }, [currentChat]);

  const observer = useRef();
  /**@ts-ignore */
  const lastMsgElement = useCallback(
    /**@ts-ignore */
    (node) => {
      if (isLoading) return;
      /**@ts-ignore */
      if (observer.current) observer.current.disconnect();
      /**@ts-ignore */
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setCursor(newCursor);
        }
      });
      /**@ts-ignore */
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  console.log(msgs);

  return (
    <div
      className="overflow-y-scroll flex flex-col space-y-3 mb-3"
      style={{ height: "calc(100% - 7.5rem)" }}
    >
      {msgs.length > 0 &&
        msgs.map((msg, index) =>
          index === 0 ? (
            <MessageCard
              msg={msg}
              currentChat={currentChat?.email as string}
              ref={lastMsgElement}
            />
          ) : (
            <MessageCard msg={msg} currentChat={currentChat?.email as string} />
          )
        )}
    </div>
  );
};

export default Message;

interface MessageCardProps {
  msg: Message;
  currentChat: string;
}

const MessageCard = forwardRef(
  ({ msg, currentChat }: MessageCardProps, ref) => {
    return (
      <div
        // @ts-ignore
        ref={ref}
        className={cn(
          "w-full flex",
          currentChat === msg.sndEmail ? "justify-start" : "justify-end"
        )}
      >
        <div
          className={cn(
            "w-[70%] p-3 rounded-md",
            currentChat === msg.sndEmail ? "bg-primary" : "bg-white"
          )}
        >
          <p>{msg.text}</p>
          <p className="text-right text-xs text-gray-400">{formatTimeToNow(new Date(msg.createdAt))}</p>
        </div>
      </div>
    );
  }
);
