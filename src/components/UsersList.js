import { useCollection } from '../hooks/useCollection';
import Avatar from './Avatar';
import './UsersList.css';

export default function UsersList() {
    const { error, documents } = useCollection("users");

    return (
        <div className='user-list'>
            <h2>All Users</h2>
            {error && <div className='error'>{error}</div>}
            {documents && documents.map(user => (
                <Avatar uid={user.id} key={user.id} src={user.photoURL} displayName={user.displayName} isLargeDisplay={false} isOnline={user.online} />
            ))}
        </div>
    )
}
