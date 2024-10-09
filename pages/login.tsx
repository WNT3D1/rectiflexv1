import { useState } from 'react';
import { signIn } from 'next-auth/react';
import styles from '../styles/Login.module.css'; // Ensure the CSS file path is correct

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        await signIn('credentials', { username, password, redirect: false });
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.logoContainer}>
                {/* Update the logo path and CSS class */}
                <img src="/rectiflex.png" alt="Rectiflex Logo" className={styles.logo} />
            </div>
            <form onSubmit={handleLogin} className={styles.loginForm}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
