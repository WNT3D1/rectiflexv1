import { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import Sidebar from '../components/Sidebar'; 
import styles from '../styles/dashboard.module.css';

interface Task {
  id: number;
  description: string;
  status: string;
  assignedTo: string;
  classification: string;
  date: string;
}

const AdminDashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);
  const [newJob, setNewJob] = useState({
    description: '',
    status: 'Pending',
    assignedTo: '',
    classification: '3MTR',
    date: '',
  });

  const addNewJob = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedTasks = [...tasks, { ...newJob, id: tasks.length + 1 }];
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
    setNewJob({
      description: '',
      status: 'Pending',
      assignedTo: '',
      classification: '3MTR',
      date: '',
    });
  };

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.mainContent}>
        <h1>Admin Dashboard</h1>

        {/* New Job Form */}
        <div className={styles.jobForm}>
          <h2>Add New Job</h2>
          <form onSubmit={addNewJob}>
            <input
              type="text"
              placeholder="Job Description"
              value={newJob.description}
              onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Assigned To"
              value={newJob.assignedTo}
              onChange={(e) => setNewJob({ ...newJob, assignedTo: e.target.value })}
              required
            />
            <input
              type="date"
              value={newJob.date}
              onChange={(e) => setNewJob({ ...newJob, date: e.target.value })}
              required
            />
            <select
              value={newJob.classification}
              onChange={(e) => setNewJob({ ...newJob, classification: e.target.value })}
            >
              <option value="3MTR">3 Months Maintenance (3MTR)</option>
              <option value="IAS">Instant Action Sheet (IAS)</option>
              <option value="Supplier Maintenance">Supplier Maintenance</option>
              <option value="Critical (Leaks)">Critical (Leaks)</option>
            </select>
            <button type="submit">Add Job</button>
          </form>
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
      </div>
    </div>
  );
};

export default AdminDashboard;
