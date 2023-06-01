import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { buttonVariants } from "./ui/Button";
import SignOutButton from "./SignOutButton";
import Menu from "./Menu";
import { MessageCircle } from "lucide-react";

const Navbar = async ({}) => {
  const session = await getServerSession(authOptions);
  return (
    <div className="fixed backdrop-blur-sm bg-white/75 z-50 top-0 left-0 right-0 h-20 border-b border-slate-300 shadow-sm flex items-center justify-between">
      <div className="container max-w-7xl mx-auto w-full flex justify-between items-center">
        <Link
          href="/"
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
          <SignOutButton email={session?.user?.email} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
