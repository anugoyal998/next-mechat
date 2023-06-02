"use client";

import { getImageUrl } from "@/lib/utils";
import Image from "next/image";
import { FC, FormEvent, useState } from "react";
import Input from "./ui/Input";
import Button from "./ui/Button";
import { ToastDataType, ToastDataTypeEnum } from "@/types";

interface AddFriendProps {
  email: string | null | undefined;
  image: string | null | undefined;
  name: string | null | undefined;
  setOpen: (open: boolean) => void;
  setToastData: (toastData: ToastDataType | undefined) => void;
}

const AddFriend: FC<AddFriendProps> = ({
  email,
  image,
  name,
  setOpen,
  setToastData,
}) => {
  const [friendEmail, setFriendEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  async function handleAddFriend(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await fetch("/api/add-friend", {
        method: "POST",
        body: JSON.stringify({ friendEmail }),
      })
      const json = await res.json();
      if(res.ok){
        setToastData({ type: ToastDataTypeEnum.Success, text: json?.msg })
      }else{
        setToastData({ type: ToastDataTypeEnum.Error, text: json?.msg })
      }
      setOpen(true);
    } catch (err) {
      /**@ts-ignore */
      setToastData({ type: ToastDataTypeEnum.Success, text: err?.msg })
      setOpen(true);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-[7px]">
      <Image
        className="block rounded-full"
        src={getImageUrl(image, email)}
        height={60}
        width={60}
        alt="profile image"
      />
      <div className="flex flex-col gap-[15px]">
        <div>
          <div className="text-mauve12 m-0 text-[15px] font-medium leading-[1.5]">
            {name}
          </div>
          <div className="text-mauve10 m-0 text-[15px] leading-[1.5]">
            {email ? `@${email.split("@")[0]}` : null}
          </div>
        </div>
        <div className="text-mauve12 m-0 text-[15px] leading-[1.5]">
          <form className="flex flex-col space-y-3" onSubmit={handleAddFriend}>
            <Input
              label="Enter Friend's Email"
              labelSize="xs"
              type="email"
              isRequired
              required
              value={friendEmail}
              onChange={(e) => setFriendEmail(e.target.value)}
            />
            <Button type="submit" size="lg" isLoading={isLoading}>
              Add Friend
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFriend;
