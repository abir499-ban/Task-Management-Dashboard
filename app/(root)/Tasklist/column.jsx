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

import { ArrowUpDown } from "lucide-react";
import React, { useState } from 'react'
import { Ellipsis } from 'lucide-react'
import { set } from 'date-fns';
import {Button, buttonVariants} from '../../../components/ui/button'


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
      const task = row.original;// Access the task's _id

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger><Ellipsis className="hover: cursor-pointer" /></DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuSeparator />
              <DropdownMenuItem><Button variant='ghost' onClick={()=> setsetDetailsDialogOPen(true)}>View Details</Button></DropdownMenuItem>
              <DropdownMenuItem><Button variant='ghost' >Edit</Button></DropdownMenuItem>
              <DropdownMenuItem><Button variant='destructive' >Delete</Button></DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog open={setDetailsDialogOPen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Task Details</DialogTitle>
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
              <Button variant='ghost' onClick={()=> setsetDetailsDialogOPen(false)}>Close</Button>
            </DialogContent>
          </Dialog>


        </>
      );
    },
  }
];
