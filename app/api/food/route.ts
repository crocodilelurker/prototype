import { NextResponse } from "next/server";

export async function GET(request: Request) {
    return NextResponse.json({ message: "Hello from protected" }, { status: 200 })
}
export async function POST(request: Request) {

}