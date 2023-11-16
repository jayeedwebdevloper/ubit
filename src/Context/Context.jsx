/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase.init';
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";


export const AuthProvider = createContext();
const auth = getAuth(app);

const Context = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const google = new GoogleAuthProvider();
    const github = new GithubAuthProvider();
    const [user, setUser] = useState();

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const updateUser = (userInfo) => {
        setLoading(true)
        return updateProfile(auth.currentUser, userInfo)
    }
    const login = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }
    const googleSign = () => {
        setLoading(true)
        return signInWithPopup(auth, google)
    }
    const githubSign = () => {
        setLoading(true)
        return signInWithPopup(auth, github)
    }
    const verify = () => {
        return sendEmailVerification(auth.currentUser)
    }
    const forgetPass = (email) => {
        return sendPasswordResetEmail(auth, email)
    }



    useEffect(() => {
        const checkUser = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });
        return checkUser
    }, []);

    const data = { loading, user, createUser, googleSign, githubSign, logOut, login, updateUser, verify, forgetPass };
    return (
        <AuthProvider.Provider value={data}>
            {children}
        </AuthProvider.Provider>
    );
};

export default Context;