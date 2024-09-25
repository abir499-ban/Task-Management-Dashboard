"use client"
import React,{useState, useEffect} from 'react'
import Tasklist from "../../../components/shared/Tasklist";
import { columns } from "./column";
import { DataTable } from "./data-table";
import axios from "axios";


export default function DemoPage() {
  const [allTasks, setallTasks] = useState([]);

  useEffect(() => {
      const fetchTasks = async () => {
          try {
              const response = await axios.get('/api/task/fetchTask');
              const tasksWithFormattedDates = response.data.allTasks.map((task) => {
                if (task.dueDate) {
                  task.dueDate = task.dueDate.substring(0, 10);
                }
                return task;
              });
              setallTasks(tasksWithFormattedDates);
          } catch (error) {
              console.error('Error fetching tasks:', error);
          }
      };
      fetchTasks(); 
  }, []);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={allTasks} />
      <div className="my-28">
        <Tasklist />
      </div>
    </div>
  );
}


// async function getData() {
//   return [
//     {
//       title: "Task 1", 
//       status: "To Do", 
//       priority: "Low",
//       date : "2024-25-23"
//     },
//     {
//       title: "Task 2",
//       status: "To Do",
//       priority: "Medium",
//       date : "null"
//     },
//     {
//       title: "Task 3",
//       status: "Progress",
//       priority: "Low",
//       date : "2024-12-5"
//     },
//     {
//       title: "Task 3",
//       status: "Completed",
//       priority: "High",
//       date : "2024-12-5"
//     },
//   ];
// }


