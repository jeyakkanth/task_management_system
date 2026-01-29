import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, X } from 'lucide-react';
import { useToast, type ToastType } from '../../context/ToastContext';
import styles from './Toast.module.css';

const ToastItem: React.FC<{
    id: string;
    type: ToastType;
    title: string;
    message: string;
    onClose: (id: string) => void;
}> = ({ id, type, title, message, onClose }) => {
    const Icon = type === 'success' ? CheckCircle : XCircle;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={`${styles.toast} ${styles[type]}`}
        >
            <div className={styles.iconWrapper}>
                <Icon size={20} />
            </div>
            <div className={styles.toastContent}>
                <div className={styles.toastTitle}>{title}</div>
                <div className={styles.toastMessage}>{message}</div>
            </div>
            <button className={styles.closeButton} onClick={() => onClose(id)}>
                <X size={18} />
            </button>
            <div className={styles.progressBar}>
                <motion.div
                    className={styles.progressFill}
                    initial={{ scaleX: 1 }}
                    animate={{ scaleX: 0 }}
                    transition={{ duration: 5, ease: 'linear' }}
                />
            </div>
        </motion.div>
    );
};

export const ToastContainer: React.FC = () => {
    const { toasts, removeToast } = useToast();

    return (
        <div className={styles.toastContainer}>
            <AnimatePresence mode="popLayout">
                {toasts.map((toast) => (
                    <ToastItem
                        key={toast.id}
                        {...toast}
                        onClose={removeToast}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};
