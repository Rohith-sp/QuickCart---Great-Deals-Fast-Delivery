import { getAuth } from "@clerk/nextjs/dist/types/server";
import { NextResponse } from "next/server";


export async function POST(request) {

    try {
        const { userId } = getAuth(request)
        const { address, items } = await request.json()
        if (!address || items.length === 0) {
            return NextResponse.json({ message: "Address or items not found" }, { status: 400 })
        }
        //calculate amount using items
        const amount = await items.reduce(async (acc, item) => {
            const product = await Product.findById(item.productId)
            return acc + product.price * item.quantity
        }, 0)

        await inngest.send("order/created", {
            data: {
                userId,
                items,
                address,
                amount: amount + Math.floor(amount * 0.02),
                date: Date.now()
            }
        })
        //clear user cart
        const user = await User.findById(userId)
        user.cart = []
        await user.save()

        return NextResponse.json({ success: true, message: "Order created successfully" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ success: false, message: "Failed to create order" }, { status: 500 })
    }
}   