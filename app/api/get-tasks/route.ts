import { prisma} from "@/lib/prisma"
import { NextResponse, NextRequest } from "next/server"
import jwt from "jsonwebtoken"
export async function GET(req:NextRequest){
    try{
        const token = req.cookies.get("token")?.value;
        const decoded = jwt.verify(token!, process.env.JWT_SECRET!) as { userId: number };

        const tasks = await prisma.task.findMany({
            where:{userId:decoded.userId},
            orderBy:{id:"desc"}
        });

        return NextResponse.json(tasks,{status:200});
    }
    catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}