import { useParams } from 'react-router-dom';
import CommentsPane from '../components/CommentsPane';
import ProjectSummary from '../components/ProjectSummary';
import useDocument from '../hooks/useDocument';
import { useUserContext } from '../hooks/useUserContext';
import './Project.css';

export default function Project() {
    const { id: projectId } = useParams();
    const { document: project, error } = useDocument("projects", projectId);
    const { user } = useUserContext();

    if (error) {
        return <div className='error'>{error}</div>;
    }

    if (!project) {
        return <div className='loading'>Loading...</div>;
    }

    return (
        <div className='project-details'>
            <ProjectSummary project={project} />
            <CommentsPane project={project} allowPosting={!!user} />
        </div>
    )
}
