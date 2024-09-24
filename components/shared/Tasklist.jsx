"use client"
import React, { useState } from 'react'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import axios from 'axios'


const Tasklist = () => {
  const [openDialog, setopenDialog] = useState(false)
  const [taskTitle, settaskTitle] = useState("")
  const [taskdesc, settaskdesc] = useState("")
  const [status, setstatus] = useState("To Do")
  const [priority, setpriority] = useState("Medium");
  const [date, setdate] = useState();
  const handlesubmit = async (e) => {
    e.preventDefault();
    const formData = {
      taskTitle: taskTitle,
      taskDesc: taskdesc,
      taskstatus: status,
      taskpriority: priority,
      taskdate: date,
    }
    try {
      const res = await axios.post('/api/task/create', formData);
      console.log("Sucess");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Button onClick={() => setopenDialog(true)}>Add a new Task</Button>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a Task</DialogTitle>
            <DialogDescription>
              <form onSubmit={handlesubmit}>
                <div className='my-5'>
                  <Label>Task Title</Label>
                  <Input required type='text' value={taskTitle} onChange={(e) => settaskTitle(e.target.value)}></Input>
                </div>
                <div className='my-5'>
                  <Label>Task Description</Label>
                  <Input required type='text' value={taskdesc} onChange={(e) => settaskdesc(e.target.value)}></Input>
                </div>
                <div className='my-5'>
                  <Label>Task Priority</Label>
                  <RadioGroup defaultValue="Medium" onValueChange={setpriority}>
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
                  <Label>Task Due Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[280px] justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setdate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className='flex flex-wrap flex-row justify-end gap-2'>
                  <Button type='submit'>Add a Task</Button>
                  <Button variant="ghost" onClick={() => setopenDialog(false)}>Close</Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Tasklist