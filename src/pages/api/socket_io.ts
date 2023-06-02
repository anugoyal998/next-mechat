import { Server } from "socket.io"

/**@ts-ignore */
export default function handler(req,res){
    if(res.socket.server.io){
        res.end()
        return
    }
    const io = new Server(req.socket.server,{
        path: "/api/socket_io",
        addTrailingSlash: false
    })
    res.socket.server.io = io

    io.on("connection",(socket) => {
        console.log(socket.id)
    })

    res.end()
}