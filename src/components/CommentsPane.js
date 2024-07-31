import CommentForm from './CommentForm';
import CommentsList from './CommentsList';
import './CommentsPane.css';

export default function CommentsPane({ project, allowPosting }) {
    return (
        <div className='comments-pane'>
            {allowPosting && <CommentForm projectId={project.id} />}
            <CommentsList comments={project.comments} />
        </div>
    )
}
