import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Signup.module.css'; // Assuming you're using a CSS module

const Signup = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation (you can add more complex validation here)
    if (userData.password !== userData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Call the API to create a new user
    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (res.ok) {
      alert('User registered successfully');
      router.push('/login'); // Redirect to login page after successful sign up
    } else {
      alert('Failed to register user');
    }
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.logoContainer}>
        <img src="/rectiflex.png" alt="Rectiflex Logo" className={styles.logo} />
      </div>
      <form onSubmit={handleSignup} className={styles.signupForm}>
        <h2>Sign Up</h2>
        <input
          type="text"
          placeholder="Username"
          value={userData.username}
          onChange={(e) => setUserData({ ...userData, username: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={userData.password}
          onChange={(e) => setUserData({ ...userData, password: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={userData.confirmPassword}
          onChange={(e) => setUserData({ ...userData, confirmPassword: e.target.value })}
          required
        />
        <button type="submit">Sign Up</button>
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
