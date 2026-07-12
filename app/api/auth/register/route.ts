interface RegisterUser {
    email: string;
    name: string;
    password: string;
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
export async function GET(request: Request) {
    return NextResponse.json({ message: "Register Route Active" })
}

export async function POST(request: Request) {
    // we need to extract 
    // we need email name password for register 
    const { email, name, password } = await request.json() as RegisterUser;
    if (!email || !password)
        return NextResponse.json({ mesage: "All fields required" }, { status: 400 });
    //get existing user 
    const existingUser = await prisma.user.findUnique({
        where: { email: email }
    })
    if (existingUser) {
        return NextResponse.json({ message: "User already found" }, { status: 400 })
    }
    // now we add the user 
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
        data: {
            email,
            name,
            password: hashedPassword
        },
        select: {
            id: true,
            email: true,
            name: true,
            isNewUser: true,
            createdAt: true
        }
    })
    return NextResponse.json({ message: "New Usere Created Succesfully", data: newUser }, { status: 201 });
}