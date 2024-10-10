import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Sidebar.module.css';

const Sidebar = () => {
    const router = useRouter();

    return (
        <div className={styles.sidebar}>
            <ul className={styles.navList}>
                <li className={router.pathname == "/dashboard" ? `${styles.navItem} ${styles.active}` : styles.navItem}>
                    <Link href="/dashboard" className={styles.navLink}>
                        <i className={`fas fa-home ${styles.navIcon}`}></i> {/* Home Icon */}
                    </Link>
                </li>
                <li className={router.pathname == "/report" ? `${styles.navItem} ${styles.active}` : styles.navItem}>
                    <Link href="/report" className={styles.navLink}>
                        <i className={`fas fa-chart-bar ${styles.navIcon}`}></i> {/* Reports Icon */}
                    </Link>
                </li>
                <li className={router.pathname == "/company-setup" ? `${styles.navItem} ${styles.active}` : styles.navItem}>
                    <Link href="/company-setup" className={styles.navLink}>
                        <i className={`fas fa-cogs ${styles.navIcon}`}></i> {/* Settings Icon */}
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="/login" className={styles.navLink}>
                        <i className={`fas fa-sign-out-alt ${styles.navIcon}`}></i> {/* Logout Icon */}
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
