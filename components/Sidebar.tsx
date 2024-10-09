import Link from 'next/link';
import styles from '../styles/Sidebar.module.css';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <img src="/rectiflex.png" alt="RectiFlex Logo" /> {/* Update with your logo path */}
      </div>
      <ul className={styles.navList}>
        <li>
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link href="/report">Reports</Link>
        </li>
        <li>
          <Link href="/company-setup">Company Setup</Link>
        </li>
        <li>
          <Link href="/login">Logout</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
