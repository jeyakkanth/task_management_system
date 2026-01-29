import React, { useEffect, useState } from 'react';
import type { Task, User } from '../types';
import { ListTodo, Users, AlertCircle, CheckCircle2 } from 'lucide-react';
import styles from './Dashboard.module.css';
import { api } from '../api/Api';
import { useToast } from '../context/ToastContext';

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const { showToast } = useToast();
  const today = new Date().toISOString().split('T')[0];

  const stats = [
    { label: 'Total Tasks', value: tasks.length, icon: ListTodo, color: 'var(--primary)' },
    { label: 'Active Users', value: users.filter(u => u.active === true).length, icon: Users, color: '#10b981' },
    { label: 'Overdue', value: tasks.filter(t => t.dueDate < today && t.status !== 'DONE').length, icon: AlertCircle, color: 'var(--danger)' },
    { label: 'Completed', value: tasks.filter(t => t.status === 'DONE').length, icon: CheckCircle2, color: '#3b82f6' },
  ];

  const fetAllTask = async () => {
    try {
      const response = await api.get<Task[]>("/task/getAllTask");
      setTasks(Array.isArray(response.data) ? response.data : []);
    } catch (error: any) {
      showToast('error', 'Fetch Error', "Failed to load task statistics.");
      console.error(error);
    }
  }

  const fetAllUser = async () => {
    try {
      const response = await api.get<User[]>("/user/getAllUser");
      setUsers(Array.isArray(response.data) ? response.data : []);
    } catch (error: any) {
      showToast('error', 'Fetch Error', "Failed to load user statistics.");
      setUsers([]);
    }
  }

  useEffect(() => {
    fetAllTask()
    fetAllUser()
  }, [])

  return (
    <div className={styles.dashboard}>
      <header className={styles.pageHeader}>
        <h1>Welcome, Admin</h1>
        <p>Here's what's happening with your projects today.</p>
      </header>

      <div className={styles.statsGrid}>
        {stats.map((stat, i) => (
          <div key={i} className={`glass-card ${styles.statCard}`}>
            <div className={styles.statIcon} style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
              <stat.icon size={24} />
            </div>
            <div className={styles.statContent}>
              <span className={styles.statLabel}>{stat.label}</span>
              <span className={styles.statValue}>{stat.value}</span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.dashboardGrid}>
        <section className="glass-card">
          <div className={styles.cardHeader}>
            <h2>Quick Overview</h2>
          </div>
          <p style={{ color: 'var(--text-muted)' }}>
            Use the sidebar to navigate through user management, task creation, and reports.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
