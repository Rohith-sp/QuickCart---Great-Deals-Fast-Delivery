import connectDB from "@/config/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import User from "@/models/User";

export async function POST(request) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const { cartData } = await request.json();
        await connectDB();

        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        user.cartItems = cartData;
        await user.save();

        return NextResponse.json({ success: true, message: "Cart updated successfully" });
    }
    catch (error) {
        console.error("Error updating cart:", error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}