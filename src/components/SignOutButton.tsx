"use client";

import { signOut } from "next-auth/react";
import { FC, useState } from "react";
import { toast } from "./ui/Toast";
import Button from "./ui/Button";
import { Loader2, LogOut } from "lucide-react";
import { DropdownMenuItem } from "./ui/DropdownMenu";

interface SignOutButtonProps {
  email: string | null | undefined;
  isDropdownMenuItem?: boolean;
}

const SignOutButton: FC<SignOutButtonProps> = ({
  email,
  isDropdownMenuItem,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const signUserOut = async () => {
    setIsLoading(true);
    try {
      await signOut();
    } catch (err) {
      toast({
        title: "Error signing out",
        message: "Please try again",
        type: "error",
      });
    } finally {
      setIsLoading;
    }
  };

  if (isDropdownMenuItem) {
    return (
      <DropdownMenuItem onClick={signUserOut}>
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <LogOut className="mr-2 h-4 w-4" />
        )}
        <span>Sign out</span>
      </DropdownMenuItem>
    );
  }

  return (
    <Button
      onClick={signUserOut}
      isLoading={isLoading}
      className="w-32 space-x-3"
    >
      <p className="truncate">{email}</p>
      <LogOut size={42} />
    </Button>
  );
};

export default SignOutButton;
