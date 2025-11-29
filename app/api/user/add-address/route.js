import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Address from "@/models/Address";

export async function POST(request) {
    try {
        const { userId } = auth();
        const { address } = await request.json();
        await connectDB();
        const newAddress = await Address.create({
            userId,
            ...address
        })
        return NextResponse.json({ success: true, message: "Address added successfully", address: newAddress }, { status: 201 })

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 })
    }
}