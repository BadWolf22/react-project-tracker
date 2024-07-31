import { NavLink } from 'react-router-dom';
import AddIcon from '../assets/add_icon.svg';
import DashboardIcon from '../assets/dashboard_icon.svg';
import { useUserContext } from '../hooks/useUserContext';
import Avatar from './Avatar';
import './Sidebar.css';

export default function Sidebar() {
    const { user } = useUserContext();

    return (
        <div className='sidebar'>
            <div className='sidebar-content'>
                <Avatar
                    uid={user?.uid}
                    src={user?.photoURL}
                    displayName={user?.displayName ?? "Hey, Unknown User!"}
                    isLargeDisplay={true}
                />
            </div>
            <nav className='links'>
                <ul>
                    <li>
                        <NavLink to='/'>
                            <img src={DashboardIcon} alt='dashboard icon' />
                            <span>Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/create'>
                            <img src={AddIcon} alt='add project icon' />
                            <span>New Project</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
