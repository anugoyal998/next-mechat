import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { pusherServer } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    const user = await getServerSession(authOptions).then((res) => res?.user);
    if (!user) {
      return NextResponse.json({ msg: "UnAuthorized" }, { status: 400 });
    }
    const payload = await req.json();
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
    if (!friend) {
      return NextResponse.json(
        { msg: "Couldn't find friend" },
        { status: 400 }
      );
    }
    const friendRequest = await db.friendRequest.findFirst({
      where: {
        sndEmail: {
          equals: user.email as string,
        },
        recEmail: {
          equals: friend.email as string,
        },
      },
    });
    if (friendRequest) {
      return NextResponse.json(
        {
          msg: "Your friend have already been sent you request. Kindly accept that.",
        },
        { status: 400 }
      );
    }
    await db.friendRequest.create({
      data: {
        sndEmail: user.email as string,
        recEmail: friend.email as string,
      },
    });
    pusherServer.trigger(
      toPusherKey(`user:${friendEmail}:incoming_friend_requests`),
      "incoming_friend_requests",
      {
        sndEmail: user.email as string,
      }
    );
    return NextResponse.json({ msg: "Friend request sent" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ msg: "Server error" }, { status: 500 });
  }
}
