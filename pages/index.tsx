import { useState } from 'react';
import { useRouter } from 'next/router';

const IndexPage = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const router = useRouter();

    const handleLogin = (): void => {
        if (username === 'admin') {
            router.push('/dashboard');
        } else if (username === 'supervisor') {
            router.push('/supervisor');
        } else if (username === 'subcontractor') {
            router.push('/subcontractor');
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <div className="loginContainer">
            <h1>Builders Maintenance Management</h1>
            <div className="loginForm">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
};

export default IndexPage;
