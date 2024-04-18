import prisma from "@/config/db";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    const admins = await prisma.admins.findMany({
        select: {
            id: true,
            name: true,
            email: true,
        }
    });
    return NextResponse.json(admins);
}