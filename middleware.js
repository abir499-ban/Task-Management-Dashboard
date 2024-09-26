import { NextResponse } from 'next/server'

export async function middleware(req) {
    if (req.nextUrl.pathname == '/' || req.nextUrl.pathname === '/Tasklist' || req.nextUrl.pathname === '/kanban') {
        console.log("Middleware executed for '/' route");
        const token = req.cookies.get("token");
        if (!token) {
            return NextResponse.redirect(new URL('/login', req.url));
        }
        const { value } = token;
        const uri = `${req.nextUrl.origin}/api/users/token`;
        const res = await fetch(uri, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ value }),
        });
        const result = await res.json();
        if (!result.success) {
            return NextResponse.redirect(new URL('/login', req.url));
        }

        const response = NextResponse.next();
        response.cookies.set('user_email', result.user_email);
        response.cookies.set('user_id', result.user_id);
        return response;
    }else if(req.nextUrl.pathname == '/sign-up'){

        const token = req.cookies.get('token');
        if(token) return NextResponse.redirect(new URL('/', req.url));
        return NextResponse.next();

    }else if(req.nextUrl.pathname == '/login'){
        const token = req.cookies.get('token');
        if(token) return NextResponse.redirect(new URL('/', req.url));
        return NextResponse.next();
    }
}


export const config = {
    matcher: ['/', '/sign-up', '/login', '/Tasklist', '/kanban'],
};