import React from 'react'
import Link from 'next/link'
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Tasklist from './Tasklist'; 


const Header = (props) => {
    return (
        <>
            <header class="bg-white">
                <div class="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">


                    <div class="flex flex-1 items-center justify-end md:justify-between">
                        <div className='flex justify-center items-center mx-96 my-52'>
                        <Tabs defaultValue="account" className="w-[400px]">
                            <TabsList>
                                <TabsTrigger value="account">Task List</TabsTrigger>
                                <TabsTrigger value="password">Kanban</TabsTrigger>
                            </TabsList>
                            <TabsContent value="account"><Tasklist/></TabsContent>
                            <TabsContent value="password">Change your password here.</TabsContent>
                        </Tabs>
                        </div>

                        <div class="flex items-center gap-4">
                            <HoverCard>
                                <HoverCardTrigger><p className='hover: cursor-pointer hover:underline font-bold'>User</p></HoverCardTrigger>
                                <HoverCardContent>
                                    <h5 className='font-semibold'>User Info</h5>
                                    <p>{props.userId}</p>
                                    <p>{props.userEmail}</p>
                                </HoverCardContent>
                            </HoverCard>


                        </div>
                    </div>
                </div>
            </header></>
    )
}

export default Header