import React, { createContext, useContext, useState, useCallback } from 'react';

export type ToastType = 'success' | 'error';

interface Toast {
    id: string;
    type: ToastType;
    title: string;
    message: string;
}

interface ToastContextType {
    showToast: (type: ToastType, title: string, message: string) => void;
    removeToast: (id: string) => void;
    toasts: Toast[];
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((type: ToastType, title: string, message: string) => {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts((prev) => [...prev, { id, type, title, message }]);

        // Auto remove after 5 seconds
        setTimeout(() => {
            removeToast(id);
        }, 5000);
    }, []);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ showToast, removeToast, toasts }}>
            {children}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
