import connectDB from "@/config/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Address from "@/models/Address";

export async function GET(request) {
    try {
        const { userId } = auth();
        await connectDB();
        const addresses = await Address.find({ userId });
        return NextResponse.json({ success: true, addresses });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 })

    }

}   