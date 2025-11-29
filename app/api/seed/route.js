import { NextResponse } from 'next/server';
import connectDB from '@/config/db';
import Product from '@/models/Product';
import { productsDummyData } from '@/assets/assets';

export async function GET() {
    try {
        await connectDB();
        // Optional: Clear existing products to avoid duplicates if re-running
        // await Product.deleteMany({}); 

        // Check if products already exist to avoid duplicates if we don't delete
        const existingProducts = await Product.countDocuments();
        if (existingProducts > 0) {
            return NextResponse.json({ success: true, message: 'Products already exist, skipping seed.' });
        }

        await Product.insertMany(productsDummyData);
        return NextResponse.json({ success: true, message: 'Database seeded successfully' });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
