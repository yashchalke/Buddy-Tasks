import { prisma } from "@/lib/prisma"
import { NextResponse,NextRequest } from "next/server"
import jwt from "jsonwebtoken"

export async function DELETE(req:NextRequest,{params}:{params:Promise<{id:string}>}){
    try{
        const token = req.cookies.get("token")?.value;
        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };

        const { id } = await params;
        const taskid = Number(id);

        await prisma.task.delete({where:{id:taskid}});

        return NextResponse.json({ success: true });
    }
    catch (err) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }

}