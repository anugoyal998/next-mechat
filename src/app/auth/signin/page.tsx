"use client";

import Button from "@/components/ui/Button";
import CenterContainer from "@/components/ui/CenterContainer";
import Input from "@/components/ui/Input";
import Text from "@/components/ui/Text";
import { toast } from "@/components/ui/Toast";
import { Mail } from "lucide-react";
import { Metadata } from "next";
import { signIn } from "next-auth/react";
import { FC, FormEvent, useState } from "react";

export const metadata: Metadata = {
  title: "MeChat | Signin",
  description: "Signin"
}

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  async function handleRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signIn("email", { email });
    } catch (err) {
      toast({
        title: "Sign in failed",
        message: "Server error",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="flex justify-center items-center h-screen bg-secondary">
      <CenterContainer className="w-[600px]">
        <div className="flex space-x-3">
          {/* <Image /> */}
          <Text size="3xl" className="pb-8 font-bold">
            MeChat
          </Text>
        </div>
        <Text size="3xl" className="pb-1">
          Create your account
        </Text>
        <Text className="pb-3" variant="ghost">
          Chat with your friends
        </Text>
        <form className="flex flex-col space-y-3" onSubmit={handleRegister}>
          <Input
            icon={<Mail className="m-3 text-gray-500" />}
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            isRequired
            required
          />
          <Button size="xl" type="submit" isLoading={isLoading}>
            Get Magic Link
          </Button>
        </form>
      </CenterContainer>
    </div>
  );
};

export default page;
