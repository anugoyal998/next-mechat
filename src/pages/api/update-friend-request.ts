import { NextApiResponseServerIO } from "@/types/socket.types";
import { NextApiRequest } from "next";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
import { z } from "zod"

export default async (req: NextApiRequest,res: NextApiResponseServerIO) => {
    try {
        const user = await getServerSession(req,res,authOptions).then((res) => res?.user);
        if (!user) {
            return res.status(400).json({ msg: "UnAuthorized" });
        }
        const schema = z.object({
            action: z.enum(["ACCEPTED","REJECTED"]),
            sndEmail: z.string().email(),
            recEmail: z.string().email()
        })
        const { action, recEmail, sndEmail } = schema.parse(JSON.parse(req.body))
        const data = await db.friendRequest.findFirst({
            where: {
                sndEmail: {
                    equals: sndEmail
                },
                recEmail: {
                    equals: recEmail
                }
            },
            select: {
                id: true
            }
        })
        if(!data){
            return res.status(400).json({ msg: "Something went wrong"})
        }
        await db.friendRequest.update({
            where: {
                id: data.id
            },
            data: {
                status: action
            }
        })
        // emit socket event
        res?.socket?.server?.io?.emit(`friend_request_updated:${sndEmail}`,{})

        return res.status(200).json({ msg: "success" });
    } catch (error) {
        return res.status(500).json({ msg: "Server error"})
    }
} 