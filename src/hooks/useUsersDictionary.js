import { useEffect, useState } from 'react';
import { useCollection } from '../hooks/useCollection';

export default function useUsersDictionary() {
    const { documents: userDocuments, error } = useCollection("users");
    const [usersDictionary, setUsersDictionary] = useState(null);

    useEffect(() => {
        if (userDocuments === null) return;
        const entriesList = userDocuments.map(doc => [doc.id, doc]);
        setUsersDictionary(Object.fromEntries(entriesList));
    }, [userDocuments]);

    return { usersDictionary, error };
}
