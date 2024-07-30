import AddIcon from '../assets/add_icon.svg';
import './Avatar.css';

export default function Avatar({ src, displayName, isLargeDisplay, isOnline }) {
    const usrSrc = src ?? AddIcon;
    return (
        <div className={`avatar ${isLargeDisplay ? "avatar-large" : "avatar-small"}`}>
            <img src={usrSrc} alt={`${displayName}'s profile`} />
            <p>{displayName}</p>
            {isOnline && <span className='online-indicator'>🟢</span>}
        </div>
    )
}
