import { FC } from "react";
import CenterContainer from "./ui/CenterContainer";
import Text from "./ui/Text";
import Button from "./ui/Button";

interface LoadingProps {}

const Loading: FC<LoadingProps> = ({}) => {
  return (
    <div className="flex justify-center items-center h-screen bg-secondary">
      <CenterContainer className="w-[500px] h-[300px] space-y-3" variant="flex">
        <Text size="2xl" className="font-bold">
          Loading...
        </Text>
        {/* <Text size="lg">
          Fetching details
        </Text> */}
        <Button isLoading>fetching...</Button>
      </CenterContainer>
    </div>
  );
};

export default Loading;
