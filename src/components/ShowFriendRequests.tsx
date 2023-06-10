import { Dispatch, SetStateAction } from "react"
import { getImageUrl } from "@/lib/utils";
import { GetFriendRequestType } from "@/types/api.types";
import Image from "next/image";
import {
  ScrollAreaRoot,
  ScrollAreaViewport,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaCorner,
} from "@/components/ui/ScrollArea";
import Text from "./ui/Text";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import Button from "./ui/Button";

interface ShowFriendRequestsProps {
  email: string | null | undefined;
  image: string | null | undefined;
  name: string | null | undefined;
  friendRequest: GetFriendRequestType[];
  recEmail: string | null | undefined;
  setReFetch: Dispatch<SetStateAction<boolean>>;
}

const ShowFriendRequests = ({
  email,
  image,
  name,
  friendRequest,
  recEmail,
  setReFetch
}: ShowFriendRequestsProps) => {
  async function handleFriendRequestAction(sndEmail: string, action: string) {
    try {
      await fetch("/api/update-friend-request", {
        method: "POST",
        body: JSON.stringify({ action, sndEmail, recEmail }),
      });
      setReFetch((prev) => !prev);
    } catch (err) {}
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
            {name}Anubhav
          </div>
          <div className="text-mauve10 m-0 text-[15px] leading-[1.5]">
            {email ? `@${email.split("@")[0]}` : null}
          </div>
        </div>
        <div className="text-mauve12 m-0 text-[15px] font-semibold leading-[1.5]">
          Friend Requests
        </div>
        {friendRequest.length > 0 ? (
          <ScrollAreaRoot className="w-[300px] h-[150px]">
            <ScrollAreaViewport>
              <div className="text-mauve12 m-0 text-[15px] leading-[1.5] flex flex-col space-y-2">
                {friendRequest.map((fr) => (
                  <div
                    key={`${fr.sndEmail}`}
                    className="flex items-center space-x-2"
                  >
                    <Text>{fr.sndEmail}</Text>
                    <Button
                      variant="link"
                      size="sm"
                      className="px-1"
                      onClick={(e) =>
                        handleFriendRequestAction(fr.sndEmail, "ACCEPTED")
                      }
                    >
                      <CheckCircleRoundedIcon color="success" />
                    </Button>
                    <Button
                      variant="link"
                      size="sm"
                      className="px-1"
                      onClick={(e) =>
                        handleFriendRequestAction(fr.sndEmail, "REJECTED")
                      }
                    >
                      <CancelRoundedIcon color="error" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollAreaViewport>
            <ScrollAreaScrollbar>
              <ScrollAreaThumb />
            </ScrollAreaScrollbar>
            <ScrollAreaScrollbar orientation="horizontal">
              <ScrollAreaThumb />
            </ScrollAreaScrollbar>
            <ScrollAreaCorner />
          </ScrollAreaRoot>
        ) : null}
      </div>
    </div>
  );
};

export default ShowFriendRequests;
