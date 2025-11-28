import { getAuth } from "@clerk/nextjs/server";
import connectDB from "@/config/db";
import User from "@/models/User";
import { NextResponse } from "next/server";


export async function GET(request) {
    try{
        const {userID} =getAuth(request);

        await connectDB();
        const user = await User.findById(userID);
        if(!user){
            return NextResponse.json({success:false, message:"User not found"}, {status:404});
        }
        return NextResponse.json({success:true, data:user}, {status:200});
    }
    catch(err){
        return NextResponse.json({success:false, message:err.message}, {status:404});
    }

}    