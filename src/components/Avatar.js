import { Link } from 'react-router-dom';
import AddIcon from '../assets/add_icon.svg';
import './Avatar.css';

export default function Avatar({ prefix, uid, hideImg, src, displayName, isLargeDisplay, isOnline, postfix }) {
    const usrSrc = src ?? AddIcon;
    return (
        <div className={`avatar ${isLargeDisplay ? "avatar-large" : "avatar-small"}`}>
            {prefix && <><span>{prefix}</span><span>&nbsp;-&nbsp;</span></>}
            {!hideImg && <img src={usrSrc} alt={`${displayName}'s profile`} />}
            {displayName && <Link to={`/profiles/${uid}`}>
                <p>{displayName}</p>
            </Link>}
            {postfix && <><span>&nbsp;-&nbsp;</span><span>{postfix}</span></>}
            {isOnline && <span className='online-indicator'>🟢</span>}
        </div>
    )
}
