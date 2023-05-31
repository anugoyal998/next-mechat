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

interface MenuProps {
  isSession: boolean;
  email: string | null | undefined;
}

const Menu: FC<MenuProps> = ({ isSession, email }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="hover:opacity-90" >
          <MenuIcon className="rotate-0 scale-100 transition-all" />
          <MenuIcon className="absolute rotate-90 scale-0 transition-all" />
          <span className="sr-only">Menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" forceMount>
        <DropdownMenuItem>
          <Link href={`/profile/${email}`} className="flex items-center" >
            <User2 className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <SignOutButton email={null} isDropdownMenuItem />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Menu;
