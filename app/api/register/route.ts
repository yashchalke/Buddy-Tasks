import {prisma} from "@/lib/prisma"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"

export async function POST(req:Request){
    try{
        const {email,password} = await req.json()
        if(!email || !password){
            return NextResponse.json({
                error:"Email and password Required"
            },{
                status:400
            })
        }

        const existingUser = await prisma.user.findUnique({
            where:{email}
        })


        if(existingUser){
            return NextResponse.json({error:"User Already Exist"},{status:409})
        }

        const hashedpassword = await bcrypt.hash(password,10);

        const user = await prisma.user.create({
            data:{email,password:hashedpassword}
        })

        return NextResponse.json({data:{id:user.id , email:user.email}},{status:201});
    }
    catch(err){
        return NextResponse.json({ error: "Registration failed" }, { status: 500 });
    }
}