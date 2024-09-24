import { User } from "../../../../db/models/user";
import { verifyToekn } from "../../../../service/auth";
import { NextResponse } from "next/server";

export async function POST(req){
    const reqBody = await req.json();
    const {value} = reqBody;
    console.log(value);
    if(!value) return NextResponse.json({"message": "No Token","success": false });
    const payload = await verifyToekn(value);
    console.log("verfiied")
    const user = await User.findById(payload.id);
    return NextResponse.json({"message":"Verified", "success":true, "user_email" : user.email, "user_id" : user.name})
}