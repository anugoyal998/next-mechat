import Route from "@/components/Route";
import CenterContainer from "@/components/ui/CenterContainer";
import Text from "@/components/ui/Text";
// import { Metadata } from "next";
import Link from "next/link";
import { FC } from "react";

// export const metadata: Metadata = {
//   title: "MeChat | Verify",
//   description: "Verify",
// };

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <Route matchedStatus="authenticated" redirect="/chat">
      <div className="flex justify-center items-center h-screen bg-secondary">
        <CenterContainer
          className="w-[500px] h-[300px] space-y-3"
          variant="flex"
        >
          <Text size="2xl" className="font-bold">
            Check your Email
          </Text>
          <Text size="lg">
            A sign in link has been sent to your email address.
          </Text>
          <Link href="/" className="underline outline-none">
            {process.env.NEXTAUTH_URL}
          </Link>
        </CenterContainer>
      </div>
    </Route>
  );
};

export default page;
