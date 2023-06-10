import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { fetchAll } from "@/lib/utils";
import { GetUserTextResponseType } from "@/types/api.types";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

type friendRequestsType = {
    id: string;
    sndEmail: string;
    recEmail: string;
}

const TAKE_THRESHOLD = 4;

export async function GET(
  req: Request,
  { params }: { params: { text: string; cursor: string } }
) {
    const { text, cursor } = params;
    if(cursor === "@")return NextResponse.json({ data: []})
    let friendRequests: friendRequestsType[] = []
    let userEmail: string = ''
    try {
        // const user = await getServerSession(authOptions).then((res) => res?.user);
        // if (!user) {
        //     return NextResponse.json({ msg: "UnAuthorized"}, { status: 400})
        // }
        let user = { email: "anubhav@conceptdash.ca"}
        userEmail = user.email as string
        friendRequests = await db.friendRequest.findMany({
            where: {
                status: "ACCEPTED",
                OR: [   
                    { AND: [ { sndEmail: { equals: userEmail}}, ...(text !== "*" ? [{ recEmail: { startsWith: text}}] : [])] },
                    { AND: [ { recEmail: { equals: userEmail}}, ...(text !== "*" ? [{ sndEmail: { startsWith: text}}] : [])] },
                ]
            },
            select: {id: true, sndEmail: true, recEmail: true},
            orderBy: { updatedAt: 'asc'},
            take: TAKE_THRESHOLD,
            ...(cursor !== "$" && { cursor: { id: cursor }})
        })
    } catch (err) {
        return NextResponse.json({ msg: "Server error"}, { status: 500})
    }

    let lastCursor: string = "$";
    if(friendRequests.length === TAKE_THRESHOLD)lastCursor = friendRequests.pop()?.id ?? "$"
    else lastCursor = "@"

    let promises = fetchAll<GetUserTextResponseType, friendRequestsType>(friendRequests,async (resolve, reject, ele) => {
        try {
            const email = ele.sndEmail === userEmail ? ele.recEmail : ele.sndEmail
            const findUser = await db.user.findFirst({
                where: { email: { equals: email }},
                select: { id: true, name: true, email: true, image: true }
            })
            if(findUser){ resolve({...findUser})}
            else reject(null)
        } catch (err) {
            reject(null);
        }
    })

    try {
        const data = await Promise.all(promises)
        return NextResponse.json({ data: data.filter((ele) => ele), lastCursor }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ msg: "Server error"}, { status: 500})
    }

}
