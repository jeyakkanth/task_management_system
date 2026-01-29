import React, { useEffect, useState } from 'react';
import { AlertCircle, User as UserIcon } from 'lucide-react';
import Pagination from '../components/UI/Pagination';
import styles from './OverdueReport.module.css';
import { api } from '../api/Api';
import { useToast } from '../context/ToastContext';

interface DueTask {
    assignedUserId: number,
    assignedUserName: string,
    dueDate: string,
    priority: string,
    id: number,
    status: string,
    title: string
}

const OverdueReport: React.FC = () => {
    const [overdueTasks, setOverdueTasks] = useState<DueTask[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const { showToast } = useToast();
    const itemsPerPage = 8;

    useEffect(() => {
        const fetchAllDueTask = async () => {
            try {
                const response = await api.get(`/task/overdue-tasks`, {
                    params: {
                        status: "DONE"
                    }
                });
                setOverdueTasks(response.data);
            } catch (error: any) {
                showToast('error', 'Fetch Error', "Failed to load overdue tasks.");
                console.error(error);
            }
        }
        fetchAllDueTask();
    }, [])

    return (
        <div className={styles.pageContainer}>
            <header className={styles.pageHeader}>
                <h1>Overdue Tasks</h1>
                <p>Immediate attention required for these pending tasks.</p>
            </header>

            <div className={`glass-card ${styles.overdueCard}`}>
                <div className={styles.cardHeader}>
                    <AlertCircle className={styles.iconDanger} />
                    <h2>Past Due Inventory</h2>
                </div>

                {overdueTasks.length === 0 ? (
                    <div className={styles.emptyState}>
                        <div className={styles.successIcon}>✓</div>
                        <p>Great job! No overdue tasks.</p>
                    </div>
                ) : (
                    <div className="table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>Task Title</th>
                                    <th>Assigned To</th>
                                    <th>Due Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {overdueTasks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map(task => {
                                    const assignee = task.assignedUserId;
                                    return (
                                        <tr key={task.id} className={styles.overdueRow}>
                                            <td className={styles.taskTitle}>
                                                <AlertCircle size={16} className={styles.inlineIcon} />
                                                {task.title}
                                            </td>
                                            <td>
                                                {assignee ? (
                                                    <div className={styles.userMention}>
                                                        <UserIcon size={14} />
                                                        {task.assignedUserName}
                                                    </div>
                                                ) : (
                                                    <span className={styles.unassigned}>Unassigned</span>
                                                )}
                                            </td>
                                            <td className={styles.overdueDate}>{task.dueDate}</td>
                                            <td>
                                                <span className={`badge badge-${task.status.toLowerCase()}`}>
                                                    {task.status}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
                <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(overdueTasks.length / itemsPerPage)}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    );
};

export default OverdueReport;
