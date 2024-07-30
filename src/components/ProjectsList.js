import ProjectCard from './ProjectCard';
import './ProjectsList.css';

export default function ProjectsList({ projects }) {
    return (
        <div className='project-list'>
            {projects.length === 0 && <p>No projects yet. Add one!</p>}
            {projects.map(project => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </div>
    )
}
