import { where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { useCollection } from '../hooks/useCollection';
import useUsersDictionary from '../hooks/useUsersDictionary';
import './ProjectFilter.css';

const archivedOptions = [
    { label: "Archived", value: true },
    { label: "Unarchived", value: false }
];

// INVESTIGATE: why this is rerendering at mach mol

export default function ProjectFilter({ }) {
    const { usersDictionary } = useUsersDictionary();
    const { documents: categories } = useCollection("categories");

    const [userSelections, setUsers] = useState([]);
    const [categorySelections, setCategory] = useState([]);
    const [archived, setArchived] = useState(archivedOptions[1]);

    const getUserOptions = () => {
        if (!usersDictionary) return;
        return Object.entries(usersDictionary).map(entry => ({ label: entry[1].displayName, value: entry[1] }));
    }

    const getCategoryOptions = () => {
        if (!categories) return;
        return categories[0].categories;
    }

    useEffect(() => {
        const filters = [];
        if (userSelections.length) {
            const userIds = userSelections.map(sel => sel.value.id);
            filters.push(where("assignedUsersList", "array-contains-any", userIds));
        }
        if (categorySelections.length) {
            const categories = categorySelections.map(sel => sel.value);
            filters.push(where("category", "in", categories));
        }
        if (archived) {
            // filters.push(where("archived", "==", archived.value));
        }
        // setFilters(filters);
    }, [userSelections, categorySelections, archived]);

    return (
        <div className="project-filter">
            <h2 className='page-title'>Project Filters</h2>
            <nav className='dropdowns'>
                <div className='dropdown'>
                    <span>Assigned To:</span>
                    <Select
                        isMulti
                        options={getUserOptions()}
                        onChange={option => setUsers(option)}
                        isClearable
                    />
                </div>
                <div className='dropdown'>
                    <span>Categories:</span>
                    <Select
                        isMulti
                        options={getCategoryOptions()}
                        isClearable
                        onChange={option => setCategory(option)}
                    />
                </div>
                <div className='dropdown'>
                    <span>Archived:</span>
                    <Select
                        options={archivedOptions}
                        onChange={option => setArchived(option)}
                        isClearable
                        defaultValue={archivedOptions[1]}
                    />
                </div>
            </nav>
        </div>
    )
}
