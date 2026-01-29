import React, { useState } from 'react';
import { LayoutList, Calendar, Flag } from 'lucide-react';

import styles from './CreateTask.module.css';
import { api } from '../api/Api';
import { useToast } from '../context/ToastContext';

const CreateTask: React.FC = () => {
    const today = new Date().toISOString().split('T')[0];

    const [formData, setFormData] = useState({
        title: '',
        priority: 'MEDIUM' as const,
        dueDate: today
    });

    const { showToast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title && formData.dueDate <= today) {
            console.log("missing requirement");

            // Reverted to local-only for now
            // console.log("Task submitted (local):", formData);
            // setFormData({ title: '', priority: 'MEDIUM', dueDate: today });
            // setShowSuccess(true);
            // setTimeout(() => setShowSuccess(false), 3000);
        }

        const payload = {
            title: formData.title,
            priority: formData.priority,
            dueDate: formData.dueDate
        }

        try {
            await api.post("/task/create", payload);
            showToast('success', 'Task Created', 'The task has been successfully added to your list.');
            setFormData({ title: '', priority: 'MEDIUM', dueDate: today });
        } catch (error: any) {
            const errorMessage = error.response?.data || error.message || "Failed to create task";
            showToast('error', 'Creation Failed', errorMessage);
            setFormData({ title: '', priority: 'MEDIUM', dueDate: today });
        }
    };

    const isFormValid = formData.title !== '' && formData.dueDate >= today;

    return (
        <div className={styles.pageContainer}>
            <header className={styles.pageHeader}>
                <h1>Create New Task</h1>
                <p>Define task details and priority levels.</p>
            </header>

            <section className="glass-card">
                <form onSubmit={handleSubmit} className={styles.taskForm}>
                    <div className={styles.formGroup}>
                        <label>Task Title <span className={styles.required}>*</span></label>
                        <div className={styles.inputWithIcon}>
                            <LayoutList size={18} />
                            <input
                                type="text"
                                className="input-field"
                                placeholder="What needs to be done?"
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.formRow}>
                        <div className={`${styles.formGroup} ${styles.flex1}`}>
                            <label>Priority</label>
                            <div className={styles.inputWithIcon}>
                                <Flag size={18} />
                                <select
                                    className="input-field"
                                    value={formData.priority}
                                    onChange={e => setFormData({ ...formData, priority: e.target.value as any })}
                                >
                                    <option value="LOW">Low</option>
                                    <option value="MEDIUM">Medium</option>
                                    <option value="HIGH">High</option>
                                </select>
                            </div>
                        </div>

                        <div className={`${styles.formGroup} ${styles.flex1}`}>
                            <label>Due Date <span className={styles.required}>*</span></label>
                            <div className={styles.inputWithIcon}>
                                <Calendar size={18} />
                                <input
                                    type="date"
                                    className="input-field"
                                    min={today}
                                    value={formData.dueDate}
                                    onChange={e => setFormData({ ...formData, dueDate: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label>Initial Status</label>
                        <div className={styles.readOnlyBadge}>
                            OPEN
                        </div>
                    </div>

                    <button type="submit" className={`btn btn-primary ${styles.submitBtn}`} disabled={!isFormValid}>
                        Create Task
                    </button>
                </form>

            </section>
        </div>
    );
};

export default CreateTask;
