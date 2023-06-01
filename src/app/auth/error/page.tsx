import Route from "@/components/Route";
import Button from "@/components/ui/Button";
import CenterContainer from "@/components/ui/CenterContainer";
import Text from "@/components/ui/Text";
import { Metadata } from "next";
import Link from "next/link";
import { FC } from "react";

export const metadata: Metadata = {
  title: "MeChat | Signin Error",
  description: "Signin error",
};

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <Route matchedStatus="authenticated" redirect="/chat" >
      <div className="flex justify-center items-center h-screen bg-secondary">
        <CenterContainer
          className="w-[500px] h-[300px] space-y-3"
          variant="flex"
        >
          <Text size="2xl" className="font-bold">
            Unable to sign in
          </Text>
          <Text size="lg">The sign in link is no longer valid.</Text>
          <Text size="lg" className="text-center">
            It may have been used already or it may have expired.
          </Text>
          <Link href="/auth/signin">
            <Button>SignIn</Button>
          </Link>
        </CenterContainer>
      </div>
    </Route>
  );
};

export default page;
