"use client"
import React,{useState} from 'react'
import {toast, useToast} from '../../../hooks/use-toast'
import {Toaster} from '../../../components/ui/toaster'
import Link from 'next/link'
import { Button, buttonVariants } from '../../../components/ui/button'
import Image from 'next/image'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog"
import { Label } from '../../../components/ui/label'
import { Input } from '../../../components/ui/input'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Description } from '@radix-ui/react-toast'
const page = () => {
  const {toast} = useToast();
  const router = useRouter();
  const [openDialog, setopenDialog] = useState(true)
  const [password, setpassword] = useState("");
    const [email, setemail] = useState("");
    const [loader, setloader] = useState(false);
    const handlesubmit = async(e)=>{
      setloader(true)
      e.preventDefault();
        const formData = {
          email : email,
          password : password,
        }
        console.log(formData);
        try{
          const new_user = await axios.post('/api/users/login', formData);
          if(new_user.data.success){
            toast({
              description : new_user.data.message,
              className : 'bg-green-500 text-white'
            })
          }else{
            toast({
              description : new_user.data.message,
              variant : "destructive"
            })
          }
          router.push('/');
      }catch(err){
          console.log(err);
      }finally{
        setloader(false);
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
                  {loader ? (
                    <Button type='submit' disabled='true'><Image src={'/loader.svg'} height='20' width='20' alt='loader'/>Log In</Button>
                  ):(
                    <Button type='submit'>Log In</Button>
                  )}
                  
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