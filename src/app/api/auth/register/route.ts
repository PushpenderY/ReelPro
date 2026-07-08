import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs"
import { registerSchema } from "@/schemas/userSchema";
import { success } from "zod";


export async function POST(request: Request) {
    const body = await request.json();
    const validation = registerSchema.safeParse(body);
    if(!validation.success){
        return NextResponse.json(
            {
                success: false,
                message: "Validation failed",
                errors: validation.error.flatten().fieldErrors,
            },
            {
                status: 400
            }
        );
    }

    const {name, email, password} = validation.data;
    await connectDB;

    const existingUser = await User.findOne({email});

    if(existingUser){
        return NextResponse.json({
            success: false,
            message: "User already exists",
        },
        {
            status: 409
        });
        
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name, 
        email,
        password: hashedPassword,
    });



    console.log(hashedPassword);

    return NextResponse.json({
        success: true,
        message: "User registered successfully",
        user,
    },
    {
        status: 201
    }
);
    
}