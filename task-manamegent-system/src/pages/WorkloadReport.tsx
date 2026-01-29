import React, { useEffect, useState } from 'react';
import { Briefcase } from 'lucide-react';
import Pagination from '../components/UI/Pagination';
import styles from './WorkloadReport.module.css';
import { api } from '../api/Api';
import { useToast } from '../context/ToastContext';

interface WorkloadItem {
    id: number;
    userName: string;
    activeTaskCount: number;
}

const WorkloadReport: React.FC = () => {
    const [workloadData, setWorkloadData] = useState<WorkloadItem[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const { showToast } = useToast();
    const itemsPerPage = 5;

    const fetchAllWorkload = async () => {
        try {
            const response = await api.get<WorkloadItem[]>("/user/user-active-workload");
            setWorkloadData(Array.isArray(response.data) ? response.data : []);
        } catch (error: any) {
            showToast('error', 'Fetch Error', "Failed to load workload data.");
            console.error("Failed to fetch workload data:", error.response?.data || error.message);
        }
    };

    useEffect(() => {
        fetchAllWorkload();
    }, []);

    const maxTasks = workloadData.length > 0
        ? Math.max(...workloadData.map(u => u.activeTaskCount), 1)
        : 1;

    // Local pagination for the fetched list
    const currentViewData = workloadData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    return (
        <div className={styles.pageContainer}>
            <header className={styles.pageHeader}>
                <h1>User Workload</h1>
                <p>Real-time overview of active tasks assigned per user.</p>
            </header>

            <div className="glass-card">
                <div className={styles.cardHeader}>
                    <Briefcase className={styles.iconPrimary} />
                    <h2>Current Distribution</h2>
                </div>

                {workloadData.length === 0 ? (
                    <div className={styles.emptyState}>No workload data available.</div>
                ) : (
                    <>
                        <div className={styles.workloadList}>
                            {currentViewData.map(user => (
                                <div key={user.id} className={styles.workloadItem}>
                                    <div className={styles.workloadInfo}>
                                        <span className={styles.userName}>{user.userName}</span>
                                        <span className={styles.taskCount}>{user.activeTaskCount} Active Tasks</span>
                                    </div>
                                    <div className={styles.progressBarBg}>
                                        <div
                                            className={styles.progressBarFill}
                                            style={{
                                                width: `${(user.activeTaskCount / maxTasks) * 100}%`,
                                                background: user.activeTaskCount > 5 ? 'var(--danger)' : 'var(--primary)'
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={Math.ceil(workloadData.length / itemsPerPage)}
                            onPageChange={setCurrentPage}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default WorkloadReport;
