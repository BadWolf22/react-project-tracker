import { getAuth, signOut } from "firebase/auth";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useUserContext } from './useUserContext';

export const useLogout = () => {
    // const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch, user } = useUserContext();

    const logout = async () => {
        setError(null);
        setIsPending(true);
        let err = null;

        try {
            // Set offline
            var userDoc = doc(getFirestore(), "users", user.uid);
            await updateDoc(userDoc, { online: false });

            await signOut(getAuth());
            dispatch({ type: 'LOGOUT' })
        } catch (error) {
            console.error(error);
            err = error.message;
        }

        // if (!isCancelled) {
        setIsPending(false);
        setError(err);
        // }
    }

    // useEffect(() => {
    //     return () => setIsCancelled(true);
    // }, [])

    return { error, isPending, logout }
}