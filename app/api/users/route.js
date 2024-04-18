import prisma from "@/config/db";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            enrollNo: true,
            name: true,
        }
    });
    return NextResponse.json(users);
}