import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest, { params }: { params: Promise<{ date: string }> }) {
    const { date } = await params;
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json([]);

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };

    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    const tasks = await prisma.task.findMany({
      where: {
        userId: decoded.userId,
        createdAt: { gte: start, lte: end }
      },
      orderBy: { id: "desc" }
    });

    return NextResponse.json(tasks);
  } catch {
    return NextResponse.json([]);
  }
}
