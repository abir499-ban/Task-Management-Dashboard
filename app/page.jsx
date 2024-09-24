"use client"; 

import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const Page = () => {
    const [userEmail, setUserEmail] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const email = Cookies.get('user_email');
        const id = Cookies.get('user_id');

        if (email) {
            setUserEmail(email);
        }
        if (id) {
            setUserId(id);
        }
    }, []);

    return (
        <div>
            <h1>User Info</h1>
            <p>Email: {userEmail}</p>
            <p>ID: {userId}</p>
        </div>
    );
};

export default Page;
