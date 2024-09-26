import { NextResponse } from "next/server";
import { Task } from "../../../../db/models/task";
import { connectToMongoDB } from "../../../../utils/dbConnect";

export async function POST(req){
    await connectToMongoDB();
    const reqBody = await req.json();
    const{taskTitle, taskDesc, taskstatus, taskpriority, taskdate} = reqBody;
    try{
        const created_task = new Task({
            title : taskTitle,
            description : taskDesc,
            status : taskstatus,
            priority : taskpriority,
            dueDate : taskdate,
        })
        const task = await created_task.save();
        return NextResponse.json({"message" : "Task created successfully", "success": true});
    }catch(err){
        console.log("Error ", err);
        return NextResponse.json({"message" : "Failed to add task", "success" : false})
    }
}