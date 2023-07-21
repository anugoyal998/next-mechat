import { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
} from "@/components/ui/DropdownMenu";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";
import {
  Menu as MenuIcon,
  Sun,
  Moon,
  Laptop,
  File,
  LayoutDashboard,
  User2,
  Github,
} from "lucide-react";
import SignOutButton from "@/components/SignOutButton";
import HoverCard from "./HoverCard";
import Image from "next/image";
import AddFriend from "./AddFriend";
import { Session } from "next-auth";
import { useToastData, useToastOpen } from "@/zustand/toast.zustand";
import ShowFriendRequests from "./ShowFriendRequests";
import { GetFriendRequestType } from "@/types/api.types";
import { useFriendRequestFetch } from "@/zustand/friendRequestFetch.zustand";
import { StyledBadge } from "./Navbar";

interface MenuProps {
  isSession: boolean;
  email: string | null | undefined;
  session: Session | null;
  friendRequest: GetFriendRequestType[];
}

const Menu: FC<MenuProps> = ({ isSession, email, session, friendRequest }) => {
  const setOpen = useToastOpen((state) => state.setOpen);
  const setToastData = useToastData((state) => state.setToastData);
  const [reFetch, setReFetch] = useFriendRequestFetch((state) => [
    state.friendRequestFetch,
    state.setFriendRequestFetch,
  ]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="hover:opacity-90">
          <MenuIcon className="rotate-0 scale-100 transition-all" />
          <MenuIcon className="absolute rotate-90 scale-0 transition-all" />
          <span className="sr-only">Menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" forceMount>
        {/* <DropdownMenuItem>
          <Link href={`/profile/${email}`} className="flex items-center" >
            <User2 className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem> */}
        <HoverCard
          cardTrigger={
            <DropdownMenuItem>
              <Image
                src="/add-friend.png"
                width={16}
                height={16}
                alt="add-friend"
                className="mr-2"
              />
              <span>Add Friend</span>
            </DropdownMenuItem>
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
        <HoverCard
            cardTrigger={
              <DropdownMenuItem>
                <StyledBadge badgeContent={friendRequest.length} max={99}>
                  <Image src="/bell.png" width={16} height={16} alt="bell" className="mr-2" />
                </StyledBadge>
                <span>Friend Requests</span>
              </DropdownMenuItem>
            }
            card={
              <ShowFriendRequests
                email={session?.user?.email}
                image={session?.user?.image}
                name={session?.user?.name}
                friendRequest={friendRequest}
                recEmail={session?.user?.email}
                setReFetch={setReFetch}
              />
            }
          />
        <SignOutButton email={null} isDropdownMenuItem />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Menu;
