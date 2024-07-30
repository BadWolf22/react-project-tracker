import { collection, getFirestore, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from "react";

export const useCollection = (collectionName) => {
    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);

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
        const collectionSubscription = onSnapshot(ref, handleSnapshot, handleSnapshotError);
        return () => handleUnmount(collectionSubscription);
    }, [collectionName]);

    return { documents, error };
}