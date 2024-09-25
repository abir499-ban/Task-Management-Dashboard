import { NextResponse } from "next/server";
import { Task } from "../../../../../db/models/task";

export async function DELETE(req, {params}){
    console.log(params.taskId)
    const taskId = params.taskId;
    try{
        await Task.findByIdAndDelete(taskId);
        return NextResponse.json({"message" : "Task successfully deleted", "success" : true});
    }catch(err){
        return NextResponse.json({"message" : err, "success" : false});
    }
}