import React from 'react'
import Link from 'next/link'
import Cookies from 'js-cookie'
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "../ui/hover-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import Tasklist from './Tasklist';
import { Button } from '../ui/button';
import { ModeToggle } from '../shared/ToggleMode'
import { LogOut } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
const Header = (props) => {
    const router = useRouter();
    const pathname = usePathname();
    const Logout = () => {
        const allCookies = Cookies.get();
        Object.keys(allCookies).forEach((cookieName) => {
            Cookies.remove(cookieName);
        })
        router.push('/');
    }
    return (
        <>



            <header>
                <div className='absolute top-0 left-0'>
                    <ModeToggle />
                </div>
                <div className='flex justify-center flex-row flex-wrap gap-10'>
                    <Link href='/Tasklist'
                        className={`${pathname === '/Tasklist' ?
                                "font-bold bg-black text-white p-2 rounded-lg" : "text-black"
                            }`}>Task List </Link>
                    <Link href='/kanban'
                        className={`${pathname === '/kanban' ?
                                "font-bold bg-black text-white p-2 rounded-lg" : "text-black"
                            }`}>Kanban </Link>

                </div>

                <div className='absolute top-0 right-2'>
                    <HoverCard>
                        <HoverCardTrigger><p className='hover: cursor-pointer hover:underline font-bold'>User</p></HoverCardTrigger>
                        <HoverCardContent>
                            <h5 className='font-semibold'>User Info</h5>
                            <p>{props.userId}</p>
                            <p>{props.userEmail}</p>
                            <Button variant='destructive' onClick={() => Logout()}><LogOut />Log out</Button>
                        </HoverCardContent>
                    </HoverCard>


                </div>
            </header>
        </>
    )
}

export default Header