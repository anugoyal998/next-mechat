"use client";

import { useContext } from "react";
import Link from "next/link";
import Button, { buttonVariants } from "./ui/Button";
import SignOutButton from "./SignOutButton";
import Menu from "./Menu";
import { MessageCircle } from "lucide-react";
import Image from "next/image";
import AddFriend from "./AddFriend";
import { RouteContext } from "./Route";
import { ToastDataType } from "@/types";
import HoverCard from "./HoverCard";

interface NavbarProps {
  setOpen: (open: boolean) => void;
  setToastData: (toastData: ToastDataType | undefined) => void;
}

const Navbar = ({ setOpen, setToastData }: NavbarProps) => {
  const session = useContext(RouteContext);
  return (
    <div className="fixed backdrop-blur-sm bg-white/75 z-50 top-0 left-0 right-0 h-20 border-b border-slate-300 shadow-sm flex items-center justify-between">
      <div className="container max-w-7xl mx-auto w-full flex justify-between items-center">
        <Link
          href="/chat"
          className={buttonVariants({
            variant: "link",
            className: "font-bold text-xl space-x-1",
          })}
        >
          <MessageCircle />
          <p>MeChat</p>
        </Link>
        <div className="md:hidden">
          {" "}
          <Menu
            isSession={session ? true : false}
            email={session?.user?.email}
          />
        </div>
        <div className="hidden md:flex gap-4">
          <Link
            href={`/profile/${session?.user?.email}`}
            className={buttonVariants({ variant: "ghost" })}
          >
            Profile
          </Link>
          <HoverCard
            cardTrigger={
              <Button variant="link">
                <Image
                  src="/add-friend.png"
                  width={28}
                  height={28}
                  alt="add-friend"
                />
              </Button>
            }
            card={
              <AddFriend
                email={session?.user?.email}
                image={session?.user?.image}
                name={session?.user?.name}
                setOpen={setOpen}
                setToastData={setToastData}
              />
            }
          />
          <SignOutButton email={session?.user?.email} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
