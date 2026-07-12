import { ActivityLevel, AppGoal, Gender, Diet } from "@/app/generated/prisma/enums";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface UpdateUser {
    gender: Gender,
    age: number,
    heightCm: number,
    weightKg: number,
    activity: ActivityLevel,
    diet: Diet,
    appGoal: AppGoal
}

export async function POST(request: Request) {
    const { } = await request.json() as UpdateUser;
    
}