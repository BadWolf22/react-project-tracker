import { getAuth } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Select from 'react-select';
import { useCollection } from '../hooks/useCollection';
import { useFirestore } from '../hooks/useFirestore';
import './CreateProject.css';

export default function CreateProject() {
    const [name, setName] = useState("");
    const [details, setDetails] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [category, setCategory] = useState(null);
    const [assignedUsers, setAssignedUsers] = useState([]);

    const [userList, setUserList] = useState([]);
    const [categoriesError, setCategoriesError] = useState(null);
    const [usersError, setUsersError] = useState(null);
    const [isPending, setIsPending] = useState(false);

    const { isPending: categoriesIsPending, documents: categories } = useCollection("categories");
    const { isPending: usersIsPending, documents: userDocuments } = useCollection("users");

    const { addDocument, response } = useFirestore("projects");

    useEffect(() => {
        setUsersError(null);
        if (userDocuments?.length === 0) setUsersError("No Users could be fetched!");
        const ul = userDocuments?.map(user => ({
            label: user.displayName,
            value: user,
        }));
        setUserList(ul);
    }, [userDocuments]);

    useEffect(() => {
        setCategoriesError(null);
        if (categories?.length === 0) setCategoriesError("No Categories could be fetched!");
    }, [categories]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsPending(true);
        const project = {
            archived: false,
            name,
            details,
            dueDate: Timestamp.fromDate(new Date(dueDate)),
            category: category.value,
            comments: [],
            createdBy: getAuth().currentUser.uid,
            assignedUsersList: assignedUsers.map(user => user.value.id),
        }
        addDocument(project);
    }

    return (
        <form className='create-form' onSubmit={handleSubmit}>
            <h2 className='page-title'>Create a new project!</h2>
            <label>
                <span>Project Name</span>
                <input
                    required
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
            <label>
                <span>Project Details</span>
                <textarea
                    required
                    type='text'
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                />
            </label>
            <label>
                <span>Project Due Date</span>
                <input
                    required
                    type='date'
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
            </label>
            <label>
                <span>Project Category</span>
                {categoriesError && <span className='error'>{categoriesError}</span>}
                <Select
                    options={!!categories ? categories[0]?.categories : []}
                    onChange={option => setCategory(option)}
                    isLoading={categoriesIsPending}
                    required
                />
            </label>
            <label>
                <span>Users</span>
                {usersError && <span className='error'>{usersError}</span>}
                <Select
                    options={userList}
                    onChange={multiValue => setAssignedUsers(multiValue)}
                    isMulti
                    isLoading={usersIsPending}
                    required
                />
            </label>
            {response?.error && <p className='error'>{response.error}</p>}
            <button className='btn' disabled={isPending}>{isPending ? "Loading..." : "Add Project!"}</button>
            {response?.success && <Navigate to="/" />}
        </form>
    )
}
