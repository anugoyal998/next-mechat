import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request){
    try {
        const user = await getServerSession(authOptions).then((res) => res?.user);
        if (!user) {
            return NextResponse.json({ msg: "UnAuthorized" }, { status: 400 });
        }
        const friendRequest = await db.friendRequest.findMany({
            where: {
                recEmail: user.email as string,
                status: "PENDING"
            },
            select: {
                sndEmail: true,
            },
            orderBy: {
                createdAt: "desc"
            }
        })
        return NextResponse.json({ msg: "success", data: friendRequest }, { status: 200})
    } catch (err) {
        return NextResponse.json({ msg: "Server error"}, { status: 400});
    }
}