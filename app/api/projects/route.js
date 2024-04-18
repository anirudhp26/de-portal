import prisma from "@/config/db";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    const projects = await prisma.projects.findMany();
    return NextResponse.json(projects);
}

export const POST = async (req) => {
    const { title, description, coordinator, members } = await req.json();
    try {
        await prisma.projects.create({
            data: {
                name: title,
                description,
                adminsId: coordinator,
                members: {
                    connect: members.map((member) => ({ id: member })),
                },
                leaderId: members[0]
            },
        });
        return NextResponse.json({
            message: "Project Created",
            status: 200,
        });
    } catch (error) {
        return NextResponse.error(new Error("Error Creating Project"));
    }
}