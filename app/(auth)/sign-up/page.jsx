"use client";
import React, { useState } from 'react'
import { Button, buttonVariants } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Label} from '@/components/ui/label'
import {Input} from '@/components/ui/input'
import axios from 'axios';
import { useRouter } from 'next/navigation';
const page = () => {
    const [openDialog, setopenDialog] = useState(false);
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const router = useRouter();

    const handlesubmit  = async(e)=>{
        e.preventDefault();
        const formData={
            name:name,
            email : email,
            password : password,
        }
        console.table(formData);
        try{
            const new_user = await axios.post('/api/users/signup', formData);
            console.log("Success ", new_user);
        }catch(err){
            console.log(err);
        }
        router.push('/login');
    }
    return (
        <>
            <Button onClick={() => setopenDialog(true)}>Sign Up</Button>
            <Dialog open={openDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Enter Details and Sign-Up</DialogTitle>
                        <DialogDescription>
                            <form onSubmit={handlesubmit}>
                                <div className='my-5'>
                                    <Label>Email</Label>
                                    <Input required type='email' value={email} onChange={(e)=> setemail(e.target.value)}></Input>
                                </div>
                                <div className='my-5'>
                                    <Label>Name</Label>
                                    <Input required type='text' value={name} onChange={(e)=> setname(e.target.value)}></Input>
                                </div>
                                <div className='my-5'>
                                    <Label>Password</Label>
                                    <Input required type='password' value={password} onChange={(e)=> setpassword(e.target.value)}></Input>
                                </div>
                                <div className='flex flex-wrap flex-row justify-end gap-2'>
                                    <Button type='submit'>Sign Up</Button>
                                    <Button variant="ghost" onClick={()=>setopenDialog(false)}>Close</Button>
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