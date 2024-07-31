import { useState } from 'react';
import ProjectFilter from '../components/ProjectFilter';
import ProjectsList from '../components/ProjectsList';
import { useCollection } from '../hooks/useCollection';

export default function Dashboard() {
    const [filters, setFilters] = useState([]);
    const { documents: projects, error } = useCollection("projects", filters);

    return (
        <div>
            {error && <p className='error'>{error}</p>}
            <ProjectFilter setFilters={setFilters} />
            <h2 className='page-title'>Projects</h2>
            {projects && <ProjectsList projects={projects} />}
        </div>
    )
}
