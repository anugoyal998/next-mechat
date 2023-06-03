// import { Server } from "socket.io"

// /**@ts-ignore */
// export default function handler(req,res){
//     if(res.socket.server.io){
//         res.end()
//         return
//     }
//     const io = new Server(req.socket.server,{
//         path: "/api/socket_io",
//         addTrailingSlash: false
//     })
//     res.socket.server.io = io

//     io.on("connection",(socket) => {
//         console.log(socket.id)
//     })

//     res.end()
// }

import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "@/types/socket.types";
import { Server as ServerIO } from "socket.io";
import { Server as NetServer } from "http";

export const config = {
    api: {
      bodyParser: false,
    },
};

export default async (req: NextApiRequest, res: NextApiResponseServerIO) => {
        if(res.socket.server.io){
            res.end()
            return
        }
        const httpServer: NetServer = res.socket.server as any;
        const io = new ServerIO(httpServer,{
            path: "/api/socket_io",
            addTrailingSlash: false
        })   
        res.socket.server.io = io;

        io.on("connection",(socket) => {
            console.log(socket.id)
        })
            
        res.end()
}