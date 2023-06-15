import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request){
    return NextResponse.json(await db.message.findMany())
}