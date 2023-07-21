import { NextApiResponseServerIO } from "@/types/socket.types";
import { NextApiRequest } from "next";
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
    const sch = z.object({
        sndEmail: z.string().email(),
        recEmail: z.string().email(),
        type: z.string(),
        text: z.string().optional(),
        uploadId: z.string().optional()
    }).strict()
    const payload = sch.parse(JSON.parse(req.body))
    await db.message.create({
        data: { ...payload }
    })
    // emit socket event
    res?.socket?.server?.io?.emit(`incoming_message:${payload.recEmail as string}`,{
        sndEmail: payload.sndEmail,
        recEmail: payload.recEmail,
        type: payload.type,
        text: payload.text,
        uploadId: payload.uploadId
    })
    
    res.status(200).json({ msg: "message sent" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Server error" });
  }
};
