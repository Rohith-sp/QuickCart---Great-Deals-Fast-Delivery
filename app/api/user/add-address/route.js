import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Address from "@/models/Address";

export async function POST(request) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ success: false, message: "Unauthorized - Please log in" }, { status: 401 });
        }

        const { address } = await request.json();
        await connectDB();

        // Convert pincode to number if it's a string
        const addressData = {
            userId,
            ...address,
            pincode: Number(address.pincode)
        };

        const newAddress = await Address.create(addressData);
        return NextResponse.json({ success: true, message: "Address added successfully", address: newAddress }, { status: 201 })

    } catch (error) {
        console.error("Error adding address:", error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 })
    }
}