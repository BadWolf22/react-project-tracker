import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { useLogout } from '../hooks/useLogout';
import { useUserContext } from '../hooks/useUserContext';
import './Navbar.css';

export default function Navbar() {
    const { user } = useUserContext();
    const { logout, isPending } = useLogout();

    return (
        <nav className='navbar'>
            <ul>
                <li className='logo'>
                    <img src={logo} alt="tracker logo" />
                    <span>My Project Tracker</span>
                </li>
                {!user && <>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/signup">Signup</Link></li>
                </>}
                {!!user && <>
                    <li><Link to={`/profiles/${user.uid}`}>{user.displayName}</Link></li>
                    <li><button className='btn' onClick={logout} disabled={isPending}>{!isPending ? "Logout" : "Logging out..."}</button></li>
                </>}
            </ul>
        </nav>
    )
}