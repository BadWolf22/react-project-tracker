import { Timestamp, addDoc, collection, deleteDoc, doc, getFirestore } from 'firebase/firestore';
import { useReducer, useState } from "react";
import { useUserContext } from "./useUserContext";

const initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null,
};

const firestoreReducer = (state, action) => {
    switch (action.type) {
        case 'IS_PENDING':
            return { ...initialState, isPending: true };
        case 'ERROR':
            return { ...initialState, error: action.payload, isPending: false, success: false, document: null };
        case 'ADDED_DOCUMENT':
            return { ...initialState, document: action.payload, isPending: false, success: true, error: null };
        case 'DELETED_DOCUMENT':
            return { ...initialState, document: null, isPending: false, success: true, error: null };
        default:
            return state;
    }
};

export const useFirestore = (collectionName) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState);
    const [isCancelled, setIsCancelled] = useState(false);
    const { user } = useUserContext();

    const tryDispatch = (action) => !isCancelled && dispatch(action);
    const conn = collection(getFirestore(), collectionName);

    const addDocument = async (doc) => {
        tryDispatch({ type: 'IS_PENDING' });
        try {
            const createdAt = Timestamp.now();
            const newDoc = await addDoc(conn, { ...doc, createdAt, uid: user.uid });
            tryDispatch({ type: 'ADDED_DOCUMENT', payload: newDoc });
        } catch (error) {
            tryDispatch({ type: 'ERROR', payload: error.message });
        }
    }

    const removeDocument = async (docId) => {
        tryDispatch({ type: 'IS_PENDING' });
        try {
            const docRef = doc(conn, docId);
            await deleteDoc(docRef);
            tryDispatch({ type: 'DELETED_DOCUMENT' });
        } catch (error) {
            tryDispatch({ type: 'ERROR', payload: error.message });
        }
    }

    // This is only suppposed to run on unmount but does always. Figure out why eventually.
    // useEffect(() => {
    //     return () => setIsCancelled(true);
    // }, []);

    return { addDocument, removeDocument, response };
}