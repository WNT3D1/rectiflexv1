import Sidebar from '../components/Sidebar';
import styles from '../styles/Dashboard.module.css';
import { useState } from 'react';

interface Task {
    id: number;
    description: string;
    status: string;
    assignedTo: string;
    classification: string;
    date: string;
}

const Dashboard = () => {
    const [tasks, setTasks] = useState<Task[]>([
        { id: 1, description: 'Fix plumbing in Lot 45', status: 'Pending', assignedTo: 'Subcontractor 1', classification: '3MTR', date: '2024-01-15' },
        { id: 2, description: 'Inspect roof on Lot 20', status: 'In Progress', assignedTo: 'Supervisor 2', classification: 'IAS', date: '2024-01-10' },
        { id: 3, description: 'Paint walls in Lot 12', status: 'Completed', assignedTo: 'Subcontractor 3', classification: 'Supplier Maintenance', date: '2024-01-12' },
    ]);
    const [newTask, setNewTask] = useState('');

    const handleAddTask = () => {
        if (newTask.trim() === '') return;
        const newTaskObj = {
            id: tasks.length + 1,
            description: newTask,
            status: 'Pending',
            assignedTo: 'Subcontractor 1',
            classification: '3MTR',
            date: new Date().toISOString().split('T')[0],
        };
        setTasks([...tasks, newTaskObj]);
        setNewTask('');
    };

    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.mainContent}>
                <h1>Admin Dashboard</h1>

                {/* Add New Job */}
                <div className={styles.filterContainer}>
                    <h2>Add New Job</h2>
                    <input
                        type="text"
                        placeholder="Job Description"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                    />
                    <button onClick={handleAddTask}>Add Task</button>
                </div>

                {/* Outstanding Jobs */}
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
                            {tasks.map((task) => (
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

                {/* Task Distribution Chart */}
                <div className={styles.chartContainer}>
                    <h3>Task Distribution by Status</h3>
                    <div style={{ width: '250px', height: '250px' }}>
                        {/* You can place a chart here (e.g., using Chart.js) */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
