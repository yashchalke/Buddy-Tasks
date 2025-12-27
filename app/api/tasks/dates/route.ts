import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json([]);

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };

    const tasks = await prisma.task.findMany({
      where: { userId: decoded.userId },
      select: { createdAt: true },
      orderBy: { createdAt: "desc" }
    });

    const uniqueDates = [
      ...new Set(tasks.map(t => t.createdAt.toISOString().split("T")[0]))
    ];

    return NextResponse.json(uniqueDates);
  } catch {
    return NextResponse.json([]);
  }
}