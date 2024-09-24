import { User } from "../../../../db/models/user";
import { connectToMongoDB } from "../../../../utils/dbConnect";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import {createToken} from '../../../../service/auth'
import { response } from "express";

export async function POST(request){
    await connectToMongoDB();
    const reqBody  = await request.json();
    const {email, password}  = reqBody;
    try{
        const doesUserexist = await User.findOne({email : email});
        if(!doesUserexist) return NextResponse.json({"message":"Email not found. First create your account", "success":false});
        const validatePassword = await bcrypt.compare(password, doesUserexist.password);
        if(!validatePassword) return NextResponse.json({"message":"Wrong Password", "success": false})
        const token = await createToken(doesUserexist);
        const response = NextResponse.json({"message":"Login succesfull", "success":true})
        response.cookies.set("token", token);
        return response;
    }catch(err){
        return NextResponse.json({"message" : "Error occured", "success" : false});
    }
}