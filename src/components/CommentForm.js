import { doc, getDoc, getFirestore, Timestamp, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useUserContext } from '../hooks/useUserContext';
import './CommentForm.css';

export default function CommentForm({ projectId }) {
    const [comment, setComment] = useState("");
    const { user } = useUserContext();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newComment = {
            postedBy: user.uid,
            content: comment,
            createdAt: Timestamp.fromDate(new Date()),
        }

        var projectDoc = doc(getFirestore(), "projects", projectId);
        const snapshot = await getDoc(projectDoc);
        updateDoc(projectDoc, { comments: [...snapshot.data().comments, newComment] });

        setComment("");
    }

    return (
        <form className="add-comment" onSubmit={handleSubmit}>
            <label>
                <h4>Add a comment</h4>
                <textarea
                    required
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                />
            </label>
            <button className="btn">Post</button>
        </form>
    )
}
