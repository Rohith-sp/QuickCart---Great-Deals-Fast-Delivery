import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Product from "@/models/Product";
import User from "@/models/User";
import { inngest } from "@/config/inngest";
import connectDB from "@/config/db";

export async function POST(request) {
    try {
        const { userId } = auth();
        const { address, items } = await request.json();

        if (!address || items.length === 0) {
            return NextResponse.json({ message: "Address or items not found" }, { status: 400 });
        }

        await connectDB();

        // Calculate amount using items
        let amount = 0;
        for (const item of items) {
            const product = await Product.findById(item.productId);
            if (product) {
                amount += product.price * item.quantity;
            }
        }

        await inngest.send("order/created", {
            data: {
                userId,
                items,
                address,
                amount: amount + Math.floor(amount * 0.02), // Adding 2% tax/fee?
                date: Date.now()
            }
        });

        // Clear user cart
        const user = await User.findById(userId);
        user.cartItems = {};
        await user.save();

        return NextResponse.json({ success: true, message: "Order created successfully" }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Failed to create order" }, { status: 500 });
    }
}