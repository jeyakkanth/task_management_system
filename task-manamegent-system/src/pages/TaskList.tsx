import React, { useEffect, useState } from 'react';
import type { Task, TaskStatus } from '../types';
import { User as UserIcon } from 'lucide-react';
import Pagination from '../components/UI/Pagination';
import { api } from '../api/Api';
import type { userData } from './UserManagement';
import styles from './TaskList.module.css';
import { useToast } from '../context/ToastContext';

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const { showToast } = useToast();

    const [userDetails, setUserDetails] = useState<userData[]>([])
    const itemsPerPage = 6;

    const activeUsers = userDetails.filter(u => u.active === true);

    const assignTask = async (taskId: string, userId: string) => {
        try {
            const userName = userDetails.find(u => u.id.toString() === userId)?.name || 'User';
            await api.put(`/task/${taskId}/assign/${userId}`);

            setTasks(prev => prev.map(task =>
                task.id === taskId ? { ...task, assignedUserId: userId } : task
            ));

            showToast('success', 'Task Assigned', `Task has been assigned to ${userName}.`);
        } catch (error: any) {
            const errorMessage = error.response?.data || error.message || "Failed to assign task";
            showToast('error', 'Assignment Error', errorMessage);
        }
    };

    const handleStatusChange = async (taskId: string, currentStatus: TaskStatus, newStatus: TaskStatus) => {
        if (currentStatus === 'DONE' && newStatus === 'OPEN') {
            showToast('error', 'Invalid Status Change', "Cannot shift from DONE to OPEN");
            return;
        }
        if (currentStatus === 'OPEN' && newStatus === 'DONE') {
            showToast('error', 'Invalid Status Change', "Task must be IN PROGRESS before DONE");
            return;
        }

        try {
            await api.put(`/task/${taskId}`, { status: newStatus });

            setTasks(prev => prev.map(task =>
                task.id === taskId ? { ...task, status: newStatus } : task
            ));

            showToast('success', 'Status Updated', `Task status changed to ${newStatus.replace('_', ' ')}.`);
        } catch (error: any) {
            const errorMessage = error.response?.data || error.message || "Failed to update status";
            showToast('error', 'Update Error', errorMessage);
        }
    };

    const fetAllTask = async () => {
        try {
            const response = await api.get("/task/getAllTask");
            setTasks(response.data)
        } catch (error: any) {
            showToast('error', 'Fetch Error', "Failed to load tasks.");
            console.error(error);
        }
    }

    const fetAllUser = async () => {
        try {
            const response = await api.get<userData[]>("/user/getAllUser");
            setUserDetails(Array.isArray(response.data) ? response.data : []);
        } catch (error: any) {
            showToast('error', 'Fetch Error', "Failed to load users.");
            setUserDetails([]);
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetAllTask()
        fetAllUser()
    }, [])

    return (
        <div className={styles.pageContainer}>
            <header className={styles.pageHeader}>
                <h1>Task Inventory</h1>
                <p>Assign tasks to active users and track their progress.</p>
            </header>

            <div className="glass-card">
                <div className="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Priority</th>
                                <th>Due Date</th>
                                <th>Assignee</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className={styles.emptyState}>No tasks found. Create one to get started.</td>
                                </tr>
                            ) : (
                                tasks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map(task => {
                                    return (
                                        <tr key={task.id}>
                                            <td className={styles.taskTitleCell}>
                                                <div className={styles.titleContainer}>
                                                    <strong>{task.title}</strong>
                                                </div>
                                            </td>
                                            <td>
                                                <span className={`badge badge-${task.priority.toLowerCase()}`}>
                                                    {task.priority}
                                                </span>
                                            </td>
                                            <td>{task.dueDate}</td>
                                            <td>
                                                <div className={styles.assignmentControl}>
                                                    <UserIcon size={14} className={styles.iconMuted} />
                                                    <select
                                                        className={styles.selectMinimal}
                                                        value={task.assignedUserId || ""}
                                                        onChange={(e) => assignTask(task.id, e.target.value)}
                                                        disabled={activeUsers.length === 0}
                                                    >
                                                        <option value="">Unassigned</option>
                                                        {userDetails.map(user => (
                                                            <option
                                                                key={user.id}
                                                                value={user.id}
                                                                disabled={!user.active}
                                                            >
                                                                {user.name} {user.active === false ? '(Inactive)' : ''}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </td>
                                            <td>
                                                <select
                                                    className={`${styles.statusSelect} ${styles[`status${task.status.charAt(0).toUpperCase() + task.status.slice(1).toLowerCase().replace(/_([a-z])/g, (g) => g[1].toUpperCase())}`]}`}
                                                    value={task.status}
                                                    onChange={(e) => handleStatusChange(task.id, task.status, e.target.value as TaskStatus)}
                                                >
                                                    <option value="OPEN">Open</option>
                                                    <option value="IN_PROGRESS">In Progress</option>
                                                    <option value="DONE">Done</option>
                                                </select>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(tasks.length / itemsPerPage)}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    );
};

export default TaskList;
