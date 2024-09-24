"use client"; 

import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Header from '../../components/shared/Header';

const Page = ({children}) => {
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
            <Header userEmail={userEmail} userId={userId} />
            {children}
        </div>
    );
};

export default Page;
