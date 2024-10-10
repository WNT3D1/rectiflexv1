import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/router'; // Import to check the current route
import '../styles/globals.css';
import Sidebar from '../components/Sidebar'; // Import Sidebar

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();

  // Define the routes where you don't want to display the Sidebar
  const noNavRoutes = ['/login', '/signup']; // Add any other pages like signup

  return (
    <SessionProvider session={session}>
      {/* Conditionally render the Sidebar only if the current route is not in noNavRoutes */}
      {noNavRoutes.includes(router.pathname) ? null : <Sidebar />}

      {/* Main Content */}
      <div style={noNavRoutes.includes(router.pathname) ? {} : { marginLeft: '200px' }}>
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}

export default MyApp;
