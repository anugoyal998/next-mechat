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

let onlineUsers: {
  email: string;
  socketId: string;
  name: string | null;
  image: string | null;
}[] = [];

function addUserToOnlineUsers(
  email: string,
  socketId: string,
  name: string | null,
  image: string | null
) {
  const findUser = onlineUsers.find((user) => user.email === email);
  if (findUser) return;
  onlineUsers.push({ email, socketId, name, image });
}

function removeUserFromOnlineUsers(socketId: string){
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
}

export default async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (res.socket.server.io) {
    res.end();
    return;
  }
  const httpServer: NetServer = res.socket.server as any;
  const io = new ServerIO(httpServer, {
    path: "/api/socket_io",
    addTrailingSlash: false,
  });
  res.socket.server.io = io;

  io.on("connection", (socket) => {
    let socketId = socket.id;
    socket.on(
      "user_online",
      ({
        name,
        email,
        image,
      }: {
        name: string | null;
        email: string;
        image: string | null;
      }) => {
        addUserToOnlineUsers(email, socketId,name,image);
        console.log(onlineUsers);
        io.emit("online_users", onlineUsers);
      }
    );

    //disconnect
    socket.on("disconnect",() => {
      removeUserFromOnlineUsers(socketId)
      io.emit("online_users", onlineUsers);
    })
  });

  res.end();
};
