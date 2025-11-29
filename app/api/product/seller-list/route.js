import connectDB from "@/config/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Product from "@/models/Product";

export async function GET(request) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        await connectDB();
        const products = await Product.find({ userId });

        return NextResponse.json({ success: true, products });
    }
    catch (error) {
        console.error("Error fetching seller products:", error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}