import { FC, ReactNode } from "react";
import {
  HoverCardRoot,
  HoverCardTrigger,
  HoverCardPortal,
  HoverCardContent,
  HoverCardArrow,
} from "@/components/ui/HoverCard";

interface HoverCardProps {
  cardTrigger: ReactNode;
  card: ReactNode;
}

const HoverCard: FC<HoverCardProps> = ({ cardTrigger, card }) => {
  return (
    <HoverCardRoot>
      <HoverCardTrigger asChild>{cardTrigger}</HoverCardTrigger>
      <HoverCardPortal>
        <HoverCardContent className="z-50">
          {card}
          <HoverCardArrow />
        </HoverCardContent>
      </HoverCardPortal>
    </HoverCardRoot>
  );
};

export default HoverCard;
