import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Order from "@/models/Order";
import connectDB from "@/config/db";

export async function GET(request) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        await connectDB();

        // Get all orders (seller can see all orders for their products)
        const orders = await Order.find({});

        return NextResponse.json({ success: true, orders }, { status: 200 });

    } catch (error) {
        console.error("Error fetching seller orders:", error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}