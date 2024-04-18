import prisma from "@/config/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req) => {
	const { enrollNo, password, name } = await req.json();
	try {
        const user = await prisma.user.findUnique({
            where: {
                enrollNo,
            },
        });
        if (user) {
            return NextResponse.error(new Error("Account Already Exists"));
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            await prisma.user.create({
                data: {
                    enrollNo,
                    name,
                    password: hashedPassword,
                },
            });
            return NextResponse.json({
                message: "User Created",
                status: 200,
            });
        }
    } catch (error) {
        return NextResponse.error(new Error("Invalid Credentials"));
    }
};
