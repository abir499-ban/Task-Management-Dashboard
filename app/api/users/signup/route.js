import { User } from '../../../../db/models/user';
import {connectToMongoDB} from '../../../../utils/dbConnect'
import { NextRequest,NextResponse } from 'next/server';
import bycryptjs from 'bcrypt'

export async function POST(request ){
    await connectToMongoDB();
    const reqBody = await request.json();
    const{email, name, password} = reqBody;
    console.log(email);
    console.log(name);
    console.log(password);
    try{
        const user = await User.findOne({email: email});
        if(user){
            return NextResponse.json({"message":"Email already exists", "success":false})
        }
        const salt = await bycryptjs.genSalt(10);
        const hashedPassword = await bycryptjs.hash(password, salt);
        const created_user = new User({
            email: email,
            name : name,
            password : hashedPassword,
        })
        const new_user = await created_user.save();
        return NextResponse.json({"message":"User registered suceesfully", "success": true, "user" : new_user})
    }
    catch(err){
        console.log(err);
        return NextResponse.json({"Error" : err, "success":false})
    }
}