import React from 'react'
import Link from 'next/link'
import  Cookies from 'js-cookie'
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "../ui/hover-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import Tasklist from './Tasklist'; 
import { Button } from '../ui/button';
import {LogOut} from 'lucide-react'
import { useRouter } from 'next/navigation'

const Header = (props) => {
    const router = useRouter();
    const Logout = ()=>{
        const allCookies = Cookies.get();
        Object.keys(allCookies).forEach((cookieName)=>{
            Cookies.remove(cookieName);
        })
        router.push('/');
    }
    return (
        <>
            <header class="bg-white">
                <div class="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">


                    <div class="flex flex-1 items-center justify-end md:justify-between">
                        <div className='flex justify-center items-center mx-96 my-52'>
                        <Tabs defaultValue="account" className="w-[400px]">
                            <div className='flex flex-row flex-wrap gap-10'>
                                <Link href='/Tasklist'>Task List</Link>
                                <Link href='#'>Kanban</Link>
                            </div>
                        </Tabs>
                        </div>

                        <div class="-mx-44">
                            <HoverCard>
                                <HoverCardTrigger><p className='hover: cursor-pointer hover:underline font-bold'>User</p></HoverCardTrigger>
                                <HoverCardContent>
                                    <h5 className='font-semibold'>User Info</h5>
                                    <p>{props.userId}</p>
                                    <p>{props.userEmail}</p>
                                    <Button variant='destructive' onClick={()=> Logout()}><LogOut />Log out</Button>
                                </HoverCardContent>
                            </HoverCard>


                        </div>
                    </div>
                </div>
            </header></>
    )
}

export default Header