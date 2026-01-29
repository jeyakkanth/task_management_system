import React from 'react';
import Sidebar from './Sidebar';
import styles from './MainLayout.module.css';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.content}>
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
