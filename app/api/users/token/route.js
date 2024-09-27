import { User } from "../../../../db/models/user";
import { verifyToekn } from "../../../../service/auth";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const reqBody = await req.json();
        const { value } = reqBody;
        console.log(value);
        if (!value) return NextResponse.json({ "message": "No Token", "success": false });

        const payload = await verifyToekn(value);
        if (!payload) {
            return NextResponse.json({ "message": "User not found", "success": false });
        }

        console.log("verfiied")
        const user = await User.findById(payload.id);
        if (!user) {
            return NextResponse.json({ "message": "User not found", "success": false });
        }

        return NextResponse.json({ "message": "Verified", "success": true, "user_email": user.email, "user_id": user.name })
    } catch (err) {
        console.error("Error in /api/users/token:", err);
        return NextResponse.json({ "message": "Token verification failed", "success": false });
    }
}