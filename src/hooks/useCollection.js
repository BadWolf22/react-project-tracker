import { collection, getFirestore, onSnapshot, query } from 'firebase/firestore';
import { useEffect, useState } from "react";

export const useCollection = (collectionName, conditions) => {
    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);
    conditions ??= [];

    const handleSnapshot = (snapshot) => {
        let results = snapshot.docs.map(doc => (
            { ...doc.data(), id: doc.id }
        ));
        setDocuments(results);
        setError(null);
    };

    const handleSnapshotError = (snapshotError) => {
        console.error(snapshotError);
        setError("Could not fetch the data...");
    };

    const handleUnmount = (unsubscriber) => {
        unsubscriber();
    }

    useEffect(() => {
        let ref = collection(getFirestore(), collectionName);
        let q = query(ref, conditions);
        const collectionSubscription = onSnapshot(q, handleSnapshot, handleSnapshotError);
        return () => handleUnmount(collectionSubscription);
    }, [collectionName, conditions]);

    return { documents, error };
}