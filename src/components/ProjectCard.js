import { Link } from 'react-router-dom';
import useUsersDictionary from '../hooks/useUsersDictionary';
import Avatar from './Avatar';
import './ProjectCard.css';

export default function ProjectCard({ project }) {
    const { usersDictionary } = useUsersDictionary();

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
