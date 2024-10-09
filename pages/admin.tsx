import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const AdminDashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;  // Do nothing while loading

    if (!session || session.user.role !== 'admin') {
      router.push('/login');  // Redirect if not logged in or not admin
    }
  }, [session, status]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {/* Add Admin Dashboard Content */}
    </div>
  );
};

export default AdminDashboard;
