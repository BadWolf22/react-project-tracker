import { useEffect, useState } from 'react';
import AddIcon from '../assets/add_icon.svg';
import { useSignup } from '../hooks/useSignup';
import './Signup.css';

export default function Signup() {
    const [email, setEmail] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [profilePic, setProfilePic] = useState(null);
    const [profilePicFile, setProfilePicFile] = useState(null);
    const [profilePicError, setProfilePicError] = useState(null);

    const { signup, isPending, error } = useSignup();

    const handleSubmit = (e) => {
        e.preventDefault();
        signup(email, password, displayName, profilePicFile);
    }

    const handleFileChange = (e) => {
        setProfilePicFile(null);
        let selected = e.target.files[0];

        if (!selected)
            return setProfilePicError("Image deselected, a default image will be used");
        if (!selected.type.includes('image'))
            return setProfilePicError("Selected file must be an image");
        if (selected.size > 1000000)
            return setProfilePicError("Image filesize must be less than 1mb");

        setProfilePicError(null);
        setProfilePicFile(selected);

        console.log(selected);
    };

    useEffect(() => {
        setProfilePic(null);
        if (!profilePicFile) return;
        var reader = new FileReader();
        reader.onloadend = function () {
            setProfilePic(reader.result);
        }
        reader.readAsDataURL(profilePicFile);
    }, [profilePicFile]);

    return (
        <form className='signup-form' onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <label>
                <span>Email Address</span>
                <input
                    required
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </label>
            <label>
                <span>Display Name</span>
                <input
                    type='text'
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                />
            </label>
            <label>
                <span>Password</span>
                <input
                    required
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <label>
                <span>Confirm Password</span>
                <input
                    required
                    type='password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    pattern={password}
                />
            </label>
            <label className='add-profile-pic'>
                <span>Select Profile Picture</span>
                <img src={profilePic ?? AddIcon} alt="profile" />
                <input
                    type='file'
                    onChange={handleFileChange}
                    accept='image/*'
                />
                {profilePicError && <p className='error'>{profilePicError}</p>}
            </label>
            <button className='btn' disabled={isPending}>{isPending ? "Loading..." : "Sign Up!"}</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}
