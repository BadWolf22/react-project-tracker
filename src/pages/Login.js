import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import './Login.css';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login, isPending, error } = useLogin();

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password);
    }

    return (
        <form className='login-form' onSubmit={handleSubmit}>
            <h2>Login</h2>
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
                <span>Password</span>
                <input
                    required
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <button className='btn' disabled={isPending}>{isPending ? "Loading..." : "Login"}</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}
