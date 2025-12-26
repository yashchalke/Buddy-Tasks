import {prisma} from "@/lib/prisma"
import jwt from "jsonwebtoken"
import { NextResponse,NextRequest } from "next/server";
import { JsonWebTokenError } from "jsonwebtoken";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const token = req.cookies.get("token")?.value;
    const decoded = jwt.verify(token!, process.env.JWT_SECRET!) as { userId: number };

    const { task } = await req.json();
    const {id} = await params;
    const taskid = Number(id);

    const updated = await prisma.task.update({
      where: { id: taskid, userId: decoded.userId },
      data: { task }
    });

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
