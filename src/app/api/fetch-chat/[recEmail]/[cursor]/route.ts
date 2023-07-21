import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { TAKE_THRESHOLD } from "@/lib/utils";
import { Message } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { recEmail: string, cursor: string } }
) {
  const { recEmail, cursor } = params;
  if(cursor === "@")return NextResponse.json({ data: []})
  let messages: Message[] = []
  let userEmail = ""
  try {
    const user = await getServerSession(authOptions).then((res) => res?.user);
    if (!user) {
        return NextResponse.json({ msg: "UnAuthorized"}, { status: 400})
    }
    userEmail = user.email as string;
    // userEmail = "anubhav@conceptdash.ca"
    messages = await db.message.findMany({
      where: {
        OR: [
          {AND: [{ sndEmail: { equals: userEmail as string}}, { recEmail: { equals: recEmail}}]},
          {AND: [{ recEmail: { equals: userEmail as string}}, { sndEmail: { equals: recEmail}}]},
        ]
      },
      orderBy: { createdAt: "desc"},
      take: TAKE_THRESHOLD,
      ...(cursor !== "$" && { cursor: { id: cursor }})
    })
  } catch (err) {
    return NextResponse.json({ msg: "Server error"}, { status: 500})    
  }

  let lastCursor: string = "$";
  if(messages.length === TAKE_THRESHOLD)
  lastCursor = messages.pop()?.id ?? "$"
  else lastCursor = "@"

  return NextResponse.json({ data: messages, lastCursor }, { status: 200 })
}
