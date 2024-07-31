import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function useDocument(collectionName, documentId) {
    const [document, setDocument] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const docRef = doc(getFirestore(), "projects", documentId);
        const unsubscribe = onSnapshot(docRef, snapshot => {
            if (snapshot.data()) {
                setDocument({ ...snapshot.data(), id: snapshot.id });
                setError(null);
            } else {
                setError("There is no data here...");
            }
        }, error => {
            console.error(error);
            setError(`Failed to get document "${collectionName}/${documentId}"`);
        });

        return () => unsubscribe();
    }, [collectionName, documentId]);

    return { document, error };
}
