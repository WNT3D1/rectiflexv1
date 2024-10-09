import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../styles/dashboard.module.css';

interface Task {
    id: number;
    description: string;
    status: string;
    assignedTo: string;
    classification: string;
}

const SupervisorDashboard = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        if (status !== 'loading' && (!session || session.user.role !== 'supervisor')) {
            router.push('/login'); // Redirect if not a supervisor
        }
    }, [session, status, router]);

    useEffect(() => {
        const mockTasks: Task[] = [
            { id: 2, description: 'Inspect roof on Lot 20', status: 'In Progress', assignedTo: 'Supervisor 2', classification: 'IAS' },
        ];
        setTasks(mockTasks);
    }, []);

    const handleStatusChange = (id: number, newStatus: string) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, status: newStatus } : task
            )
        );
    };

    if (status === 'loading' || !session) {
        return <p>Loading...</p>;
    }

    return (
        <div className={styles.dashboardContainer}>
            <h1>Supervisor Dashboard</h1>
            <table className={styles.taskTable}>
                <thead>
                    <tr>
                        <th>Task</th>
                        <th>Status</th>
                        <th>Assigned To</th>
                        <th>Classification</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <tr key={task.id}>
                            <td>{task.description}</td>
                            <td>{task.status}</td>
                            <td>{task.assignedTo}</td>
                            <td>{task.classification}</td>
                            <td>
                                <select
                                    value={task.status}
                                    onChange={(e) =>
                                        handleStatusChange(task.id, e.target.value)
                                    }
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SupervisorDashboard;
