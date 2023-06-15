"use client";

import Text from "@/components/ui/Text";
import { MessageCircle } from "lucide-react";
import { Metadata } from "next";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div
      className="fixed left-[250px] bg-secondary border-r border-slate-300 shadow-sm p-3 flex justify-center items-center"
      style={{
        height: "calc(100vh - 5rem)",
        width: "calc(100vw - 250px)",
      }}
    >
      <MessageCircle size={48} />
      <Text className="font-bold" size="3xl">
        MeChat
      </Text>
    </div>
  );
};

export default page;
