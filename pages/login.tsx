import { signIn, useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      username,
      password
    });

    if (result?.error) {
      alert('Invalid credentials');
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      // Redirect user based on role in the session
      if (session?.user.role === 'admin') {
        router.push('/admin');
      } else if (session?.user.role === 'supervisor') {
        router.push('/supervisor');
      } else if (session?.user.role === 'subcontractor') {
        router.push('/subcontractor');
      }
    }
  }, [session, status, router]);

  return (
    <form onSubmit={handleLogin}>
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
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
