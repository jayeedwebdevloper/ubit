/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

const useAdmin = (email) => {

    const [isAdmin, setAdmin] = useState(false);
    const [adminLoading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://ubit-back-end.vercel.app/admin/${email}`)
            .then(res => res.json())
            .then(data => {
                setAdmin(data.isAdmin);
                setLoading(false);
            })
    }, [email]);

    return [isAdmin, adminLoading]
};

export default useAdmin;