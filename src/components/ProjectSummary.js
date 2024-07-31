import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../hooks/useUserContext';
import useUsersDictionary from '../hooks/useUsersDictionary';
import Avatar from './Avatar';
import './ProjectSummary.css';

export default function ProjectSummary({ project }) {
    const { usersDictionary } = useUsersDictionary();
    const { user } = useUserContext();
    const [redirect, setRedirect] = useState(false);

    const archiveProject = async (e) => {
        var projectDoc = doc(getFirestore(), "projects", project.id);
        updateDoc(projectDoc, { archived: true });
        setRedirect(true);
    }

    if (usersDictionary == null) return;

    if (redirect) return <Navigate to="/" />

    return (
        <div className='project-summary'>
            <h2 className='page-title'>{project.name}</h2>
            <p className='due-date'>Project due by: {project.dueDate.toDate().toDateString()}</p>
            <div className='created-by'>
                <Avatar
                    prefix={"Created by"}
                    uid={project.createdBy}
                    displayName={usersDictionary[project.createdBy].displayName}
                    hideImg={true}
                    postfix={`on ${project.createdAt.toDate().toDateString()}`}
                />
            </div>
            <p className='details'>
                {project.details}
            </p>
            <h4>Project is assigned to:</h4>
            <ul className='assigned-users'>
                {project.assignedUsersList.map(userId => {
                    const user = usersDictionary[userId];
                    return (
                        <li key={user.id}>
                            <Avatar uid={userId} displayName={user.displayName} isLargeDisplay={false} src={user.photoURL} />
                        </li>
                    );
                })}
            </ul>
            {user?.uid === project.createdBy && <button className='btn' onClick={archiveProject}>Archive Project</button>}
        </div>
    )
}
