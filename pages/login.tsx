import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import styles from '../styles/Login.module.css'; // Ensure this path is correct

const Login = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn('credentials', {
      redirect: false,
      username: credentials.username,
      password: credentials.password,
    });

    if (res?.error) {
      alert('Invalid credentials');
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.logoContainer}>
        <img src="/rectiflex.png" alt="Rectiflex Logo" className={styles.logo} />
      </div>
      <form onSubmit={handleLogin} className={styles.loginForm}>
        <input
          type="text"
          placeholder="Username"
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          required
        />
        <button type="submit">Login</button>
        <p>
          Don&apos;t have an account? <a href="/signup">Sign Up</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
