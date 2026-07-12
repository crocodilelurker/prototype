interface LoginUser {
    email: string,
    password: string
}
import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json() as LoginUser;
        const existingUser = await prisma.user.findUnique({
            where: { email: email },
            select: {
                id: true,
                name: true,
                password: true,
                isNewUser: true
            }
        })
        if (!existingUser)
            return NextResponse.json({ message: "User Not Found" }, { status: 400 })
        //we compare hashed Password and password 
        const isPasswordValid = await bcrypt.compare(password, existingUser.password)
        if (isPasswordValid) {
            const secretString = process.env.JWT_SECRET as string;
            const secretKey = new TextEncoder().encode(secretString);

            const token = await new SignJWT({
                userId: existingUser.id,
                new: existingUser.isNewUser
            })
                .setProtectedHeader({ alg: "HS256" })
                .setIssuedAt()
                .setExpirationTime("7d")
                .sign(secretKey);

            const cookieStore = await cookies();
            cookieStore.set({
                name: "auth_token",
                value: token,
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                maxAge: 60 * 60 * 24 * 7,
                path: "/",
            })

            // we make the token
            return NextResponse.json({ message: "Login Successful", name: existingUser.name, isNewUser: existingUser.isNewUser, id: existingUser.id }, { status: 200 });
        }
        else
            return NextResponse.json({ message: "Error in Passkey" }, { status: 400 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}