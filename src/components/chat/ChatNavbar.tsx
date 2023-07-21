"use client";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";
import Text from "../ui/Text";
import { ArrowLeft } from "lucide-react";
import useOnlineUsers from "@/zustand/onlineUsers.zustand";
import useCurrentChat from "@/zustand/currentChat.zustand";
import useWindowSize from "@/hooks/useWindowSize";

const ChatNavbar = () => {
  const [currentChat, setCurrentChat] = useCurrentChat((state) => [
    state.currentChat,
    state.setCurrentChat,
  ]);
  const onlineUsers = useOnlineUsers((state) => state.onlineUsers);
  const windowSize = useWindowSize();

  return (
    <div className="flex space-x-2 items-center">
      {windowSize.width < 768 ? (
        <ArrowLeft
          className="cursor-pointer"
          onClick={() => setCurrentChat(null)}
        />
      ) : null}
      <Image
        src={getImageUrl(currentChat?.image, currentChat?.email as string)}
        width={50}
        height={50}
        alt="user_image"
        className="rounded-full"
      />
      <div>
        <Text variant="primaryBold" size="lg" className="text-black">
          {currentChat?.email?.split("@")[0]}
        </Text>
        <Text size="sm">
          {onlineUsers.find((user) => user.email === currentChat?.email)
            ? "Online"
            : "Offline"}
        </Text>
      </div>
    </div>
  );
};

export default ChatNavbar;
