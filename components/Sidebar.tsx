import Link from 'next/link';
import styles from '../styles/dashboard.module.css';

const Sidebar = () => {
    return (
        <div className={styles.sidebar}>
            <div className={styles.logo}>
                <img src="/logo.png" alt="Logo" />
                <h2>Dashboard</h2>
            </div>
            <ul className={styles.navList}>
                <li>
                    <Link href="/home">
                        <i className="fas fa-home"></i>
                    </Link>
                </li>
                <li>
                    <Link href="/analytics">
                        <i className="fas fa-chart-bar"></i>
                    </Link>
                </li>
                <li>
                    <Link href="/reports">
                        <i className="fas fa-file-alt"></i>
                    </Link>
                </li>
                {/* Add more navigation links here */}
            </ul>
        </div>
    );
};

export default Sidebar;
