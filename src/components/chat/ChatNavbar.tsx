"use client";

import { FC, useContext } from "react";
import { RouteContext } from "../Route";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";
import Text from "../ui/Text";

interface ChatNavbarProps {}

const ChatNavbar: FC<ChatNavbarProps> = ({}) => {
  const session = useContext(RouteContext);
  return (
    <div className="flex space-x-2 items-center">
      <Image
        src={getImageUrl(session?.user?.image, session?.user?.email)}
        width={50}
        height={50}
        alt="user_image"
        className="rounded-full"
      />
      <div>
        <Text variant="primaryBold" size="lg" className="text-black">
          {session?.user?.email?.split("@")[0]}
        </Text>
        <Text size="sm" >{session?.user?.name}Anubhav</Text>
      </div>
    </div>
  );
};

export default ChatNavbar;
