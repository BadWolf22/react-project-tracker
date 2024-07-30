import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from "react";
import { useUserContext } from './useUserContext';

export const useLogin = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useUserContext();

    const login = async (email, password) => {
        setError(null);
        setIsPending(true);
        let err = null;

        try {
            const res = await signInWithEmailAndPassword(getAuth(), email, password);
            if (!res || !res.user) throw new Error("Login failed");

            // Set online
            var userDoc = doc(getFirestore(), "users", res.user.uid);
            updateDoc(userDoc, { online: true });

            dispatch({ type: 'LOGIN', payload: res.user })
        } catch (error) {
            console.error(error);
            err = error.message;
        }

        if (!isCancelled) {
            setIsPending(false);
            setError(err);
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true);
    }, [])

    return { error, isPending, login }
}