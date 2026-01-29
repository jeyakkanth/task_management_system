import React, { useEffect, useState } from 'react';
import { UserPlus, Mail, User as UserIcon, Users as UsersIcon } from 'lucide-react';
import { api } from '../api/Api';
import Pagination from '../components/UI/Pagination';
import { useToast } from '../context/ToastContext';

export interface userData {
    id: number,
    name: string,
    email: string,
    active: boolean
}

import styles from './UserManagement.module.css';

const UserManagement: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', email: '', status: 'Active' as const });
    const { showToast } = useToast();

    const [userDetails, setUserDetails] = useState<userData[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const fetAllUser = async () => {
        try {
            const response = await api.get<userData[]>("/user/getAllUser");
            setUserDetails(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error("Failed to fetch users", error);
            setUserDetails([]);
        }
    }

    useEffect(() => {
        fetAllUser();
    }, [])

    const validate = () => {
        const newErrors = { name: '', email: '' };
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }
        return !newErrors.name && !newErrors.email;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            const payload = {
                name: formData.name,
                email: formData.email,
                active: formData.status === 'Active'
            }
            try {
                const response = await api.post("/user/create", payload);
                console.log("Success:", response.data);
                showToast('success', 'User Created', `${formData.name} has been added to the system.`);
                setFormData({ name: "", email: "", status: 'Active' });
                fetAllUser();
            } catch (error: any) {
                const errorMessage = error.response?.data || error.message || "Failed to create user";
                showToast('error', 'Creation Failed', errorMessage);
                console.error("Error:", error);
            }
        }
    };

    const isFormValid = formData.name && /\S+@\S+\.\S+/.test(formData.email);

    return (
        <div className={styles.pageContainer}>
            <header className={styles.pageHeader}>
                <h1>User Management</h1>
                <p>Manage your team and their active status for task assignments.</p>
            </header>

            <div className={styles.gridLayout}>
                <section className={`glass-card ${styles.formSection}`}>
                    <div className={styles.cardHeader}>
                        <UserPlus className={styles.iconPrimary} />
                        <h2>Create New User</h2>
                    </div>

                    <form onSubmit={handleSubmit} className={styles.userForm}>
                        <div className={styles.formGroup}>
                            <label>Full Name</label>
                            <div className={styles.inputWithIcon}>
                                <UserIcon size={18} />
                                <input
                                    type="text"
                                    className="input-field"
                                    placeholder="e.g. Alex Johnson"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label>Email Address</label>
                            <div className={styles.inputWithIcon}>
                                <Mail size={18} />
                                <input
                                    type="email"
                                    className="input-field"
                                    placeholder="alex@company.com"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label>Initial Status</label>
                            <select
                                className="input-field"
                                value={formData.status}
                                onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>

                        <button type="submit" className={`btn btn-primary ${styles.wFull}`} disabled={!isFormValid}>
                            Create User
                        </button>
                    </form>

                </section>

                <section className="glass-card">
                    <div className={styles.cardHeader}>
                        <UsersIcon className={styles.iconPrimary} />
                        <h2>Existing Users</h2>
                    </div>

                    <div className="table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>User Name</th>
                                    <th>Email</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userDetails.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map(user => (
                                    <tr key={user.id} className={user.active === true ? '' : styles.userDisabled}>
                                        <td>
                                            <div className={styles.userInfo}>
                                                <div className={styles.userAvatar}>{user.name ? user.name[0] : '?'}</div>
                                                {user.name}
                                            </div>
                                        </td>
                                        <td>{user.email}</td>
                                        <td>
                                            <span className={`badge badge-${user.active ? 'active' : 'inactive'}`}>
                                                {user.active ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={Math.ceil(userDetails.length / itemsPerPage)}
                        onPageChange={setCurrentPage}
                    />
                </section>
            </div>
        </div>
    );
};

export default UserManagement;
