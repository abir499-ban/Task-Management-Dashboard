import { NextResponse } from 'next/server';
import { Task } from '../../../../db/models/task'; // Adjust the path as needed

export async function GET(req) {
    try {
        const allTasks = await Task.find({});
        console.log(allTasks);
        return NextResponse.json({ allTasks });
    } catch (error) {
        console.error(error);
       return NextResponse.json({"message" : error})
    }
}
