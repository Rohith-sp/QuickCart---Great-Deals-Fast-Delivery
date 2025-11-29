import Order from "@/models/Order";
import connectDB from "@/config/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        await connectDB();
        const orders = await Order.find({ userId });
        return NextResponse.json({ success: true, orders }, { status: 200 })

    } catch (error) {
        console.error("Error fetching orders:", error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 })
    }
}