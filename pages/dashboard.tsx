import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Link from 'next/link';  // For navigation links
import styles from '../styles/dashboard.module.css';  // Custom styles

ChartJS.register(ArcElement, Tooltip, Legend);

interface Task {
    id: number;
    description: string;
    status: string;
    assignedTo: string;
    classification: string;
    date: string;
}

const AdminDashboard = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [taskStats, setTaskStats] = useState({
        pending: 0,
        inProgress: 0,
        completed: 0,
    });
    const [filterStatus, setFilterStatus] = useState<string>('All');
    const [filterAssignedTo, setFilterAssignedTo] = useState<string>('All');
    const [filterClassification, setFilterClassification] = useState<string>('All');
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

    useEffect(() => {
        if (status !== 'loading' && (!session || session.user.role !== 'admin')) {
            router.push('/login'); // Redirect if not an admin
        }
    }, [session, status, router]);

    useEffect(() => {
        const mockTasks: Task[] = [
            { id: 1, description: 'Fix plumbing in Lot 45', status: 'Pending', assignedTo: 'Subcontractor 1', classification: '3MTR', date: '2024-01-15' },
            { id: 2, description: 'Inspect roof on Lot 20', status: 'In Progress', assignedTo: 'Supervisor 2', classification: 'IAS', date: '2024-01-10' },
            { id: 3, description: 'Paint walls in Lot 12', status: 'Completed', assignedTo: 'Subcontractor 3', classification: 'Supplier Maintenance', date: '2024-01-12' }
        ];

        setTasks(mockTasks);
        setFilteredTasks(mockTasks);

        const pending = mockTasks.filter(task => task.status === 'Pending').length;
        const inProgress = mockTasks.filter(task => task.status === 'In Progress').length;
        const completed = mockTasks.filter(task => task.status === 'Completed').length;

        setTaskStats({
            pending,
            inProgress,
            completed,
        });
    }, []);

    const filterTasks = () => {
        let filtered = tasks;
        if (filterStatus !== 'All') filtered = filtered.filter(task => task.status === filterStatus);
        if (filterAssignedTo !== 'All') filtered = filtered.filter(task => task.assignedTo === filterAssignedTo);
        if (filterClassification !== 'All') filtered = filtered.filter(task => task.classification === filterClassification);
        setFilteredTasks(filtered);
    };

    useEffect(() => {
        filterTasks();  // Apply filter when the filter options change
    }, [filterStatus, filterAssignedTo, filterClassification]);

    if (status === 'loading' || !session) {
        return <p>Loading...</p>;
    }

    const pieData = {
        labels: ['Pending', 'In Progress', 'Completed'],
        datasets: [
            {
                label: 'Tasks by Status',
                data: [taskStats.pending, taskStats.inProgress, taskStats.completed],
                backgroundColor: ['#ff6384', '#36a2eb', '#4caf50'],
                hoverBackgroundColor: ['#ff6384', '#36a2eb', '#4caf50'],
            },
        ],
    };

    return (
        <div className={styles.container}>
            {/* Sidebar */}
            <div className={styles.sidebar}>
                <ul>
                    <li>
                        <Link href="/admin">
                            <i className="fas fa-home"></i> {/* Home Icon */}
                        </Link>
                    </li>
                    <li>
                        <Link href="/report">
                            <i className="fas fa-chart-bar"></i> {/* Reports Icon */}
                        </Link>
                    </li>
                    <li>
                        <Link href="/company-setup">
                            <i className="fas fa-cogs"></i> {/* Company Setup Icon */}
                        </Link>
                    </li>
                    <li>
                        <Link href="/login">
                            <i className="fas fa-sign-out-alt"></i> {/* Logout Icon */}
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Main content */}
            <div className={styles.mainContent}>
                <h1>Admin Dashboard</h1>

                {/* Filter Section */}
                <div className={styles.filterContainer}>
                    <label>Status:</label>
                    <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                        <option value="All">All</option>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>

                    <label>Assigned To:</label>
                    <select value={filterAssignedTo} onChange={(e) => setFilterAssignedTo(e.target.value)}>
                        <option value="All">All</option>
                        <option value="Supervisor 1">Supervisor 1</option>
                        <option value="Supervisor 2">Supervisor 2</option>
                        <option value="Subcontractor 1">Subcontractor 1</option>
                        <option value="Subcontractor 2">Subcontractor 2</option>
                        <option value="Subcontractor 3">Subcontractor 3</option>
                    </select>

                    <label>Classification:</label>
                    <select value={filterClassification} onChange={(e) => setFilterClassification(e.target.value)}>
                        <option value="All">All</option>
                        <option value="3MTR">3 Months Maintenance (3MTR)</option>
                        <option value="IAS">Instant Action Sheet (IAS)</option>
                        <option value="Supplier Maintenance">Supplier Maintenance</option>
                        <option value="Critical (Leaks)">Critical (Leaks)</option>
                    </select>
                </div>

                {/* Task List */}
                <div className={styles.taskList}>
                    <h2>Outstanding Jobs</h2>
                    <table className={styles.taskTable}>
                        <thead>
                            <tr>
                                <th>Task</th>
                                <th>Status</th>
                                <th>Assigned To</th>
                                <th>Classification</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTasks.map((task) => (
                                <tr key={task.id}>
                                    <td>{task.description}</td>
                                    <td>{task.status}</td>
                                    <td>{task.assignedTo}</td>
                                    <td>{task.classification}</td>
                                    <td>{task.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Chart Section */}
                <div className={styles.chartContainer}>
                    <h3>Task Distribution by Status</h3>
                    <div style={{ width: '250px', height: '250px' }}> {/* Adjusted chart size */}
                        <Pie data={pieData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
