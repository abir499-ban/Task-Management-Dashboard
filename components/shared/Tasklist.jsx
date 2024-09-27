"use client"
import React, { useState } from 'react'
import { Button } from '../../components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog"
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "../../lib/utils"
import { Calendar } from "../ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover"
import axios from 'axios'

import { useToast } from '../../hooks/use-toast'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const Tasklist = () => {
  const router=useRouter();
  const {toast} = useToast();
  const [openDialog, setopenDialog] = useState(false)
  const [taskTitle, settaskTitle] = useState("")
  const [taskdesc, settaskdesc] = useState("")
  const [status, setstatus] = useState("To Do")
  const [priority, setpriority] = useState("Medium");
  const [date, setdate] = useState(null);
  const [loader, setloader] = useState(false);

  const handlesubmit = async (e) => {
    setloader(true);
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
      if(res.data.success){
        toast({
          description: res.data.message,
          className: 'bg-green-500 text-white'
        })
      }else{
        toast({
          description: res.data.message,
          variant: "destructive"
        })
      }
      setopenDialog(false);
    } catch (error) {
      console.log(error);
    }finally{
      setloader(false);
      setopenDialog(false);
    }
    router.push('/Tasklist')
  }
  return (
    <>
    <div className='flex justify-center'>
      <Button  onClick={() => setopenDialog(true)}><strong>+</strong> Add a new Task</Button></div>
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
                  {!loader ? (
                    <Button type='submit'>Add a Task</Button>
                  ) : (
                    <Button disabled='true'><Image src={'/loader.svg'} height='20' width='20' alt='loader' />Add a Task</Button>
                  )}
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