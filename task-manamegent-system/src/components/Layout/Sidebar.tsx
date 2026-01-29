import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Users,
  PlusCircle,
  ListTodo,
  BarChart3,
  AlertCircle,
  LayoutDashboard,
  Menu,
  X
} from 'lucide-react';
import styles from './Sidebar.module.css';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/users', icon: Users, label: 'Manage Users' },
    { to: '/create-task', icon: PlusCircle, label: 'Create Task' },
    { to: '/tasks', icon: ListTodo, label: 'Task List' },
    { to: '/workload', icon: BarChart3, label: 'Workload' },
    { to: '/overdue', icon: AlertCircle, label: 'Overdue' },
  ];

  return (
    <>
      <button className={styles.mobileToggle} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>T</div>
          <span>TaskMaster</span>
        </div>
        <nav className={styles.navLinks}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
