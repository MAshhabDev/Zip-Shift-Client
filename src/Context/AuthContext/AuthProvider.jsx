import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { auth } from '../../Firebase/Firebase.init';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

const AuthProvider = ({ children }) => {
    const provider = new GoogleAuthProvider();

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true)


    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUser = (email, password) => {
        setLoading(true)

        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleLogIn = () => {
        setLoading(true)

        return signInWithPopup(auth, provider)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })

        return () => unSubscribe();
    }, [])

    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }


    const authInfo = {
        user,
        setUser,
        setLoading,
        logOut,
        createUser,
        signInUser,
        googleLogIn
    }
    return (
        <AuthContext value={authInfo}>
            {
                children
            }
        </AuthContext>
    );
};

export default AuthProvider;