import { useState, useEffect } from 'react';
import styles from '../styles/dashboard.module.css';

interface Task {
    id: number;
    description: string;
    status: string;
    assignedTo: string;
    classification: string;
    date: string;
}

const ReportPage = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
    const [statusFilter, setStatusFilter] = useState<string>('All');
    const [classificationFilter, setClassificationFilter] = useState<string>('All');
    const [assignedToFilter, setAssignedToFilter] = useState<string>('All');

    useEffect(() => {
        // Fetch mock tasks or use a backend API call here
        const mockTasks: Task[] = [
            { id: 1, description: 'Fix plumbing in Lot 45', status: 'Pending', assignedTo: 'Subcontractor 1', classification: '3MTR', date: '2024-01-15' },
            { id: 2, description: 'Inspect roof on Lot 20', status: 'In Progress', assignedTo: 'Supervisor 2', classification: 'IAS', date: '2024-01-10' },
            { id: 3, description: 'Paint walls in Lot 12', status: 'Completed', assignedTo: 'Subcontractor 3', classification: 'Supplier Maintenance', date: '2024-01-12' }
        ];
        setTasks(mockTasks);
        setFilteredTasks(mockTasks);
    }, []);

    // Filter tasks based on selected criteria
    const filterTasks = () => {
        let updatedTasks = tasks;

        if (statusFilter !== 'All') {
            updatedTasks = updatedTasks.filter(task => task.status === statusFilter);
        }
        if (classificationFilter !== 'All') {
            updatedTasks = updatedTasks.filter(task => task.classification === classificationFilter);
        }
        if (assignedToFilter !== 'All') {
            updatedTasks = updatedTasks.filter(task => task.assignedTo === assignedToFilter);
        }

        setFilteredTasks(updatedTasks);
    };

    const exportToCSV = () => {
        const csvRows = [
            ['ID', 'Description', 'Status', 'Assigned To', 'Classification', 'Date'],  // Header row
            ...filteredTasks.map(task => [
                task.id,
                task.description,
                task.status,
                task.assignedTo,
                task.classification,
                task.date
            ])
        ];

        const csvContent = csvRows.map(e => e.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'maintenance-report.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className={styles.dashboardContainer}>
            <h1 className={styles.dashboardTitle}>Maintenance Report</h1>

            {/* Filters */}
            <div>
                <label>Status:</label>
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value="All">All</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>

                <label>Classification:</label>
                <select value={classificationFilter} onChange={(e) => setClassificationFilter(e.target.value)}>
                    <option value="All">All</option>
                    <option value="3MTR">3MTR</option>
                    <option value="IAS">IAS</option>
                    <option value="Supplier Maintenance">Supplier Maintenance</option>
                    <option value="Critical (Leaks)">Critical (Leaks)</option>
                </select>

                <label>Assigned To:</label>
                <select value={assignedToFilter} onChange={(e) => setAssignedToFilter(e.target.value)}>
                    <option value="All">All</option>
                    <option value="Supervisor 1">Supervisor 1</option>
                    <option value="Supervisor 2">Supervisor 2</option>
                    <option value="Subcontractor 1">Subcontractor 1</option>
                    <option value="Subcontractor 2">Subcontractor 2</option>
                    <option value="Subcontractor 3">Subcontractor 3</option>
                </select>

                <button onClick={filterTasks}>Filter</button>
                <button onClick={exportToCSV}>Export to CSV</button>
            </div>

            {/* Report Table */}
            <table className={styles.taskTable}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Assigned To</th>
                        <th>Classification</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTasks.map((task) => (
                        <tr key={task.id}>
                            <td>{task.id}</td>
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
    );
};

export default ReportPage;
