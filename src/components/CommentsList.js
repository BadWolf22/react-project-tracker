import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import useUsersDictionary from "../hooks/useUsersDictionary";
import Avatar from "./Avatar";
import './CommentsList.css';

export default function CommentsList({ comments }) {
    const { usersDictionary } = useUsersDictionary();

    if (usersDictionary == null) return;

    return (
        <div className='comments-list'>
            <h4>Posted Comments</h4>
            {comments.length === 0 && <p>No comments yet</p>}
            <ul>
                {comments.map(comment => {
                    const postingUser = usersDictionary[comment.postedBy];
                    return (
                        <li key={comment.createdAt} className='comment'>
                            <p>{comment.content}</p>
                            <em className="faded">
                                <Avatar
                                    displayName={postingUser.displayName}
                                    src={postingUser.photoURL}
                                    postfix={formatDistanceToNow(comment.createdAt.toDate(), { addSuffix: true })}
                                />
                            </em>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
