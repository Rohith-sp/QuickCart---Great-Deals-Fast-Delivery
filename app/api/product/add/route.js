import { getAuth } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";
import authSeller from "@/lib/authSeller";
import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Product from "@/models/Product";

//configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    const isSeller = await authSeller(userId);
    if (!isSeller) {
      return NextResponse.json({ success: false, message: "Unauthorized! You are not a seller" });
    }
    const formData = await request.formData();

    const name = formData.get("name");
    const description = formData.get("description");
    const price = formData.get("price");
    const category = formData.get("category");
    const offerPrice = formData.get("offerPrice");
    const files = formData.getAll("images");

    if (!files || files.length === 0) {
      return NextResponse.json({ success: false, message: "Please provide product images" });
    }

    const result = await Promise.all(
      files.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { resource_type: 'auto' },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            }
          );
          stream.end(buffer);
        });
      })
    );

    const images = result.map((res) => res.secure_url);

    const productData = {
      userId,
      name,
      description,
      price: Number(price),
      offerPrice: Number(offerPrice),
      image,
      category,
      date: Date.now()
    };

    await connectDB();
    const newProduct = await Product.create(productData);

    return NextResponse.json({ success: true, message: "Product added successfully",newProduct });  
  }
  catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: "Error adding product" });
  }
}