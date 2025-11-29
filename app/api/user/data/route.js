import { auth, currentUser } from "@clerk/nextjs/server";
import connectDB from "@/config/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        await connectDB();
        let user = await User.findById(userId);

        // If user not found in DB, create them using Clerk data
        if (!user) {
            const clerkUser = await currentUser();

            if (clerkUser) {
                user = await User.create({
                    _id: userId,
                    name: `${clerkUser.firstName} ${clerkUser.lastName}`,
                    email: clerkUser.emailAddresses[0]?.emailAddress,
                    imageUrl: clerkUser.imageUrl,
                    cartItems: {}
                });
            } else {
                return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
            }
        }

        return NextResponse.json({ success: true, userData: user, user: user }, { status: 200 });
    }
    catch (err) {
        console.error("Error fetching user data:", err);
        return NextResponse.json({ success: false, message: err.message }, { status: 500 });
    }
}