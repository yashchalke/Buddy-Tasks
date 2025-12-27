import {prisma} from "@/lib/prisma"
import { NextResponse,NextRequest } from "next/server"
import jwt from "jsonwebtoken"

export async function PATCH(req:NextRequest,{params}:{params:Promise<{id:string}>}){
    const {id} = await params;
    try{
        const token = req.cookies.get("token")?.value;
        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };

        const updated = await prisma.task.update({
            where: { id: Number(id), userId: decoded.userId },
            data: { isComplete: true }
        });

        return NextResponse.json(updated);
    }catch {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}