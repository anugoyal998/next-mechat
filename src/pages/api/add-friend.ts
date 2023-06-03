import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "@/types/socket.types";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { db } from "@/lib/db";

export default async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (req.method !== "POST") {
    return res.status(404).json({ msg: "Method not supported" });
  }
  try {
    const user = await getServerSession(req, res, authOptions).then(
      (r) => r?.user
    );
    if (!user) {
      return res.status(400).json({ msg: "UnAuthenticated" });
    }
    const payload = JSON.parse(req.body);
    const schema = z
      .object({
        friendEmail: z.string().email(),
      })
      .strict();
    const { friendEmail } = schema.parse(payload);
    const friend = await db.user.findFirst({
      where: {
        email: friendEmail,
      },
      select: {
        email: true,
      },
    });

    if (!friend) return res.status(404).json({ msg: "Friend not found" });

    const friendRequest = await db.friendRequest.findFirst({
      where: {
        OR: [
          {
            sndEmail: {
              equals: user.email as string,
            },
            recEmail: {
              equals: friend.email as string,
            },
          },
          {
            recEmail: {
              equals: user.email as string,
            },
            sndEmail: {
              equals: friend.email as string,
            },
          },
        ],
      },
    });

    if (friendRequest) {
      return res.status(403).json({
        msg: "Your friend have already been sent you request. Kindly accept that.",
      });
    }

    await db.friendRequest.create({
      data: {
        sndEmail: user.email as string,
        recEmail: friend.email as string,
      },
    });

    // emit socket event
    res?.socket?.server?.io?.emit(`incoming_friend_request:${friend.email}`, {
      sndEmail: user.email as string,
    });

    res.status(200).json({ msg: "friend request sent" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Server error" });
  }
};
