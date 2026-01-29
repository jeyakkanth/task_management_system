import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Pagination.module.css';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className={styles.pagination}>
            <button
                className={styles.paginationBtn}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <ChevronLeft size={16} />
            </button>

            {pages.map(page => (
                <button
                    key={page}
                    className={`${styles.paginationBtn} ${currentPage === page ? styles.paginationBtnActive : ''}`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}

            <button
                className={styles.paginationBtn}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <ChevronRight size={16} />
            </button>
        </div>
    );
};

export default Pagination;
