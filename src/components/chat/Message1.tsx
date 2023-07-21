import { cn, formatTimeToNow } from "@/lib/utils";
import useCurrentChat from "@/zustand/currentChat.zustand";
import { Message } from "@prisma/client";
import axios from "axios";
import { FC, forwardRef, useRef, useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

interface Message1Props {}

const Message1: FC<Message1Props> = ({}) => {
  const ref = useRef();
  const [items, setItems] = useState<Message[]>([]);
  const [disabled, setDisabled] = useState(false);
  const [cursor, setCursor] = useState("$");
  const [hasMore, setHasMore] = useState(true);
  const currentChat = useCurrentChat((state) => state.currentChat);
  
  const fetch = (flag = false) => {
    flag && setItems((prev) => []);
    flag && setHasMore((prev) => true);
    flag && setCursor("$");
    axios({
      method: "GET",
      url: `/api/fetch-chat/${currentChat?.email}/${flag ? "$" : cursor}`,
    })
      .then((res) => {
        const resData = res.data?.data as Message[];
        const resCursor = res.data?.lastCursor as string;
        setItems((prev) => [...prev, ...resData]);
        setCursor(resCursor);
        if (resCursor === "@") setHasMore(false);
        else setHasMore(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetch(true);
  }, [currentChat]);

  return (
    <div
      id="scrollableDiv"
      // @ts-ignore
      ref={ref}
      style={{
        maxHeight: "calc(100% - 7.5rem)",
        overflow: "auto",
        display: "flex",
        flexDirection: "column-reverse",
      }}
    >
      <InfiniteScroll
        dataLength={items.length}
        next={fetch}
        style={{
          display: "flex",
          flexDirection: "column-reverse",
          gap: "0.75rem",
        }}
        inverse={true}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        scrollableTarget="scrollableDiv"
        endMessage={
          <p style={{ textAlign: "center" }}>No more chats to show</p>
        }
      >
        {items.map((item, index) => (
          <MessageCard
            key={index.toString()}
            msg={item}
            currentChat={currentChat?.email as string}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Message1;

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
          <p className="text-right text-xs text-gray-400">
            {formatTimeToNow(new Date(msg.createdAt))}
          </p>
        </div>
      </div>
    );
  }
);
