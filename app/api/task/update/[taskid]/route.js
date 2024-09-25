import { NextResponse } from 'next/server';
import {Task} from '../../../../../db/models/task'
import { connectToMongoDB } from '../../../../../utils/dbConnect';

export async function POST(req, {params}){
    await connectToMongoDB();
    const id = params.taskid;
    const reqBody = await req.json();
    const {taskId, taskTitle, taskDesc, taskstatus, taskpriority, taskdate} =  reqBody;
    console.log(taskTitle);
    console.log(taskDesc);
    console.log(taskstatus);
    console.log(taskpriority);
    try {
        const updatedTask = await Task.findByIdAndUpdate(id,
            {
                $set:{
                    title : taskTitle,
                    description : taskDesc,
                    status : taskstatus,
                    priority : taskpriority
                }
            },{
                new: true
            }
        )
        return NextResponse.json({"message" : "Task Updated successfully", "success" : true});
    } catch (error) {
        return NextResponse.json({"message" : "done", "success" : false});
    }
    
}