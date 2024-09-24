"use client"
import React,{useState} from 'react'
import Link from 'next/link'
import { Button, buttonVariants } from '@/components/ui/button'
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
import axios from 'axios'
import { useRouter } from 'next/navigation'
const page = () => {
  const router = useRouter();
  const [openDialog, setopenDialog] = useState(true)
  const [password, setpassword] = useState("");
    const [email, setemail] = useState("");
    const handlesubmit = async(e)=>{
      e.preventDefault();
        const formData = {
          email : email,
          password : password,
        }
        console.log(formData);
        try{
          const new_user = await axios.post('/api/users/login', formData);
          console.log("Successful LogIn ", new_user);
          router.push('/');
      }catch(err){
          console.log(err);
      }
      
    }
  return (
    <>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter Details and Log In</DialogTitle>
            <DialogDescription>
              <form onSubmit={handlesubmit}>
                <div className='my-5'>
                  <Label>Email</Label>
                  <Input required type='email' value={email} onChange={(e) => setemail(e.target.value)}></Input>
                </div>
                <div className='my-5'>
                  <Label>Password</Label>
                  <Input required type='password' value={password} onChange={(e) => setpassword(e.target.value)}></Input>
                </div>
                <div className='my-5'>
                  <p className='text-blue-400 hover:underline'><Link href='/sign-up'>New here? Sign up  to create an account</Link></p>
                </div>
                <div className='flex flex-wrap flex-row justify-end gap-2'>
                  <Button type='submit'>Log In</Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default page