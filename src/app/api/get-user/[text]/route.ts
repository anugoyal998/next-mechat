import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"
import { GetUserTextResponseType } from "@/types/api.types"

export async function GET(
  req: Request,
  { params }: { params: { text: string } }
) {
    const text = params.text
    const user = await getServerSession(authOptions).then((res) => res?.user)
    if(!user){
        return new Response('Unauthorized to perform this action', {
            status: 401
        })
    }
    let users: GetUserTextResponseType[] = []
    if(text === "*"){
        users = await db.user.findMany({
            select: {
                email: true,
                name: true,
                image: true,
                id: true
            }
        })
    }else {
        users = await db.user.findMany({
            where: {
                OR: [
                    {
                        email: {
                            startsWith: text
                        }
                    },
                    {
                        name: {
                            startsWith: text
                        }
                    }
                ]
            },
            select: {
                email: true,
                name: true,
                image: true,
                id: true
            }
       })
    }
    return NextResponse.json(users)
}
