"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "../../../lib/utils"
import { Calendar } from '../../../components/ui/calendar'
import { Label } from '../../../components/ui/label'
import { Input } from '../../../components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../components/ui/alert-dialog"


import { ArrowUpDown } from "lucide-react";
import React, { useState } from 'react'
import { Ellipsis } from 'lucide-react'
import { set } from 'date-fns';
import { Button, buttonVariants } from '../../../components/ui/button'
import axios from 'axios';


// This type is used to define the shape of our data.
export const columns = [
  {
    accessorKey: "title", // Ensure your data has this key
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "status", // Ensure your data has this key and matches the casing
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    sortingFn: (rowA, rowB) => {
      const titleA = rowA.getValue("status").toLowerCase();
      const titleB = rowB.getValue("status").toLowerCase();

      // Custom sorting logic, e.g., alphabetical order
      if (titleA == 'to do' && titleB == 'in progress') return 1; // A should come before B
      else if (titleA == 'to do' && titleB == 'completed') return 1;  // A should come after B
      else if (titleA == 'in progress' && titleB == 'completed') return 1;
      else return -1;
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Priority
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    sortingFn: (rowA, rowB) => {
      const titleA = rowA.getValue("priority").toLowerCase();
      const titleB = rowB.getValue("priority").toLowerCase();

      // Custom sorting logic, e.g., alphabetical order
      if (titleA == 'low' && titleB == 'medium') return 1; // A should come before B
      else if (titleA == 'low' && titleB == 'high') return 1;  // A should come after B
      else if (titleA == 'medium' && titleB == 'high') return 1;
      else return -1;
    },
  },
  {
    accessorKey: "dueDate",
    header: "Date",
  },
  {
    id: "options",
    cell: ({ row }) => {
      const [setDetailsDialogOPen, setsetDetailsDialogOPen] = useState(false)
      const [deleteBoxopen, setdeleteBoxopen] = useState(false)
      const [editBoxOpen, seteditBoxOpen] = useState(false)
      const task = row.original;

      const [taskTitle, settaskTitle] = useState(task.title);
      const [taskDesc, settaskDesc] = useState(task.description);
      const [taskstatus, settaskstatus] = useState(task.status);
      const [taskpriority, settaskpriority] = useState(task.priority);

      async function deleteTask(taskId) {
        console.log(taskId);
        const res = await axios.delete(`/api/task/delete/${taskId}`);
        console.log(res.data.message);
      }
      const handlesubmit = async(e) => {
        e.preventDefault();
        const formData = {
          taskId : task._id,
          taskTitle: taskTitle,
          taskDesc: taskDesc,
          taskstatus: taskstatus,
          taskpriority: taskpriority,
          taskdate: task.dueDate,
        }
        try {
          const res = await axios.post(`/api/task/update/${task._id}`, formData);
          console.log(res.data.message);
        } catch (error) {
          console.log(error);
        }
        seteditBoxOpen(false);
      }

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger><Ellipsis className="hover: cursor-pointer" /></DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuSeparator />
              <DropdownMenuItem><Button variant='ghost' onClick={() => setsetDetailsDialogOPen(true)}>View Details</Button></DropdownMenuItem>
              <DropdownMenuItem><Button variant='ghost' onClick={() => seteditBoxOpen(true)}>Edit</Button></DropdownMenuItem>
              <DropdownMenuItem><Button variant='destructive' onClick={() => setdeleteBoxopen(true)}>Delete</Button></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog open={setDetailsDialogOPen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Task Details</DialogTitle>
                <br></br>
                <DialogDescription>
                  <div className='flex flex-wrap flex-col gap-4'>
                    <p><strong className='font-semibold font-sans text-black px-7'>Task Title</strong>{task.title}</p>
                    <p><strong className='font-semibold font-sans text-black px-7'>Task Description</strong>{task.description}</p>
                    <p><strong className='font-semibold font-sans text-black px-7'>Task Status</strong>{task.status}</p>
                    <p><strong className='font-semibold font-sans text-black px-7'>Task Priority</strong>{task.priority}</p>
                    <p><strong className='font-semibold font-sans text-black px-7'>Task Due Date</strong>{task.dueDate}</p>
                  </div>
                </DialogDescription>
              </DialogHeader>
              <Button variant='ghost' onClick={() => setsetDetailsDialogOPen(false)}>Close</Button>
            </DialogContent>
          </Dialog>

          <AlertDialog open={deleteBoxopen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your created task.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setdeleteBoxopen(false)}>Cancel</AlertDialogCancel>
                <Button variant='destructive' onClick={() => deleteTask(task._id)}>Delete</Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>


          <Dialog open={editBoxOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Task</DialogTitle>
                <DialogDescription>
                  <form onSubmit={handlesubmit}>
                    <div className='my-5'>
                      <Label>Task Title</Label>
                      <Input required type='text' value={taskTitle} onChange={(e) => settaskTitle(e.target.value)}></Input>
                    </div>
                    <div className='my-5'>
                      <Label>Task Description</Label>
                      <Input required type='text' value={taskDesc} onChange={(e) => settaskDesc(e.target.value)}></Input>
                    </div>
                    <div className='my-5'>
                      <Label>Task Priority</Label>
                      <RadioGroup defaultValue={taskpriority} onValueChange={settaskpriority}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Low" id="option-one" />
                          <Label htmlFor="Low"><p className='text-green-800'>Low</p></Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Medium" id="option-two" />
                          <Label htmlFor="Medium"><p className='text-yellow-500'>Medium</p></Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="High" id="option-three" />
                          <Label htmlFor="High"><p className='text-orange-600'>High</p></Label>
                        </div>
                      </RadioGroup>

                    </div>

                    <div className='my-5'>
                      <Label>Task Status</Label>
                      <RadioGroup defaultValue={taskstatus} onValueChange={settaskstatus}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Completed" id="option-one" />
                          <Label htmlFor="Completed"><p className='text-green-800'>Completed</p></Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Progress" id="option-two" />
                          <Label htmlFor="Progress"><p className='text-yellow-500'>Progress</p></Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="To Do" id="option-three" />
                          <Label htmlFor="To Do"><p className='text-orange-600'>To Do</p></Label>
                        </div>
                      </RadioGroup>

                    </div>

                    <div className='flex flex-wrap flex-row justify-end gap-2'>
                      <Button type='submit'>Edit Task</Button>
                      <Button variant="ghost" onClick={() => seteditBoxOpen(false)}>Close</Button>
                    </div>
                  </form>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>



        </>
      );
    },
  }
];
