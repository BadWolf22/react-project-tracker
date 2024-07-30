import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCollection } from '../hooks/useCollection';
import Avatar from './Avatar';
import './ProjectCard.css';

export default function ProjectCard({ project }) {
    const { documents: userDocuments, error } = useCollection("users");
    const [usersDictionary, setUsersDictionary] = useState(null);

    useEffect(() => {
        if (userDocuments === null) return;
        const entriesList = userDocuments.map(doc => [doc.id, doc]);
        setUsersDictionary(Object.fromEntries(entriesList));
    }, [userDocuments]);

    return (
        <Link className='project-card' to={`/projects/${project.id}`}>
            <h4>{project.name}</h4>
            <p>Due by {project.dueDate.toDate().toDateString()}</p>
            {usersDictionary && <div className='assigned-to'>
                <ul>
                    {project.assignedUsersList.map(user => {
                        const userInfo = usersDictionary[user];
                        return (
                            <li key={user}>
                                <Avatar
                                    // displayName={userInfo.displayName}
                                    isLargeDisplay={false}
                                    src={userInfo.photoURL}
                                />
                            </li>
                        )
                    })}
                </ul>
            </div>}
        </Link>
    )
}
