import {prisma} from "@/lib/prisma"
import { NextResponse, NextRequest} from "next/server";
import jwt from "jsonwebtoken"

export async function POST(req:NextRequest){
    try{
        const token = req.cookies.get("token")?.value;
        if(!token){
            return NextResponse.json({
                error:"Unauthorized"
            },{status:401})
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET!) as {userId:number};

        const { task } = await req.json();

        if (!task || task.trim() === "") {
            return NextResponse.json({ error: "Task cannot be empty" }, { status: 400 });
        }

        const newTask = await prisma.task.create({
            data:{
                task,
                userId:decoded.userId
            }
        });

        return NextResponse.json({newTask},{status:201});
    }
    catch(err){
        console.error("ADD TASK ERROR:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
   
}