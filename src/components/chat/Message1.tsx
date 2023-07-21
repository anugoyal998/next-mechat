import { cn, formatTimeToNow } from "@/lib/utils";
import useCurrentChat from "@/zustand/currentChat.zustand";
import { Message } from "@prisma/client";
import axios from "axios";
import {
  FC,
  forwardRef,
  useRef,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { RouteContext } from "../Route";
import io from "socket.io-client";
import uniqBy from "lodash/uniqBy";

interface Message1Props {
  items: Message[];
  setItems: Dispatch<SetStateAction<Message[]>>;
}

/**@ts-ignore */
let socket;

const Message1: FC<Message1Props> = ({ items, setItems }) => {
  const ref = useRef();
  const [disabled, setDisabled] = useState(false);
  const [cursor, setCursor] = useState("$");
  const [hasMore, setHasMore] = useState(true);
  const currentChat = useCurrentChat((state) => state.currentChat);
  const session = useContext(RouteContext);

  const socketInit = async () => {
    await fetch("/api/socket_io");
    /**@ts-ignore */
    socket = io(undefined, {
      path: "/api/socket_io",
    });
    socket.on(
      `incoming_message:${session?.user?.email as string}`,
      (d: any) => {
        const date = Date.now();
        // @ts-ignore
        setItems((prev) =>
          uniqBy([{ ...d, createdAt: date }, ...prev], (obj) => obj.createdAt)
        );
      }
    );
  };

  useEffect(() => {
    socketInit();
    /**@ts-ignore */
    if (socket) return () => socket.disconnect();
  }, []);

  const fetch1 = (flag = false) => {
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
    fetch1(true);
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
        next={fetch1}
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
