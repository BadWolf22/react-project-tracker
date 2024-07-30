import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { useState } from "react";
import { useUserContext } from './useUserContext';

export const useSignup = () => {
    // const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useUserContext();

    const signup = async (email, password, name, photoFile) => {
        setError(null);
        setIsPending(true);
        let err = null;
        const displayName = name.trim() === "" ? email.split("@")[0] : name;

        try {
            const res = await createUserWithEmailAndPassword(getAuth(), email, password);
            if (!res) throw new Error("User not created");

            const photoURL = await tryUploadProfilePic(res.user.uid, photoFile);

            await updateProfile(res.user, { displayName, photoURL });

            // Add user to documents
            const userDoc = doc(getFirestore(), "users", res.user.uid);
            await setDoc(userDoc, {
                online: true,
                displayName: displayName,
                photoURL,
            });

            dispatch({ type: 'LOGIN', payload: res.user });
        } catch (error) {
            console.error(error);
            err = error.message;
        }

        // This is tweaking
        // if (!isCancelled) {
        setIsPending(false);
        setError(err);
        // }
    }

    const tryUploadProfilePic = async (userId, photoFile) => {
        if (!photoFile) return null;

        const uploadPath = `profile-pics/${userId}/${photoFile.name}`;
        const uploadRef = ref(getStorage(), uploadPath);
        const uploadResult = await uploadBytes(uploadRef, photoFile);
        const photoURL = await getDownloadURL(uploadResult.ref);
        return photoURL;
    }

    // useEffect(() => {
    //     return () => setIsCancelled(true);
    // }, []);

    return { error, isPending, signup };
}