"use client";

import Text from "@/components/ui/Text";
import { MessageCircle } from "lucide-react";
import { Metadata } from "next";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <>
      <MessageCircle size={48} />
      <Text className="font-bold" size="3xl">
        MeChat
      </Text>
    </>
  );
};

export default page;
