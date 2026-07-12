interface LoginUser {
    email: string,
    password: string
}
import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
    try {
        const { email, password } = await request.json() as LoginUser;
        const existingUser = await prisma.user.findUnique({
            where: { email: email },
            select: {
                id: true,
                password: true
            }
        })
        if (!existingUser)
            return NextResponse.json({ message: "User Not Found" }, { status: 400 })
        //we compare hashed Password and password 
        const isPasswordValid = await bcrypt.compare(password, existingUser.password)
        if (isPasswordValid) {
            // we make the token
            return NextResponse.json({ message: "Login Successful" }, { status: 200 });
        }
        else
            return NextResponse.json({ message: "Error in Passkey" }, { status: 400 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}