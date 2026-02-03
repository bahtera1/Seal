import { useState, useMemo } from 'react';

/**
 * Custom hook untuk menghandle logika pagination.
 * 
 * @param {Array} data - Semua data yang akan dipaginasikan.
 * @param {number} initialItemsPerPage - Jumlah item per halaman (default 9).
 * @returns {Object} Object berisi data halaman saat ini, fungsi kontrol, dan status.
 */
export const usePagination = (data = [], initialItemsPerPage = 9) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Hitung data yang ditampilkan pada halaman saat ini
    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return data.slice(startIndex, endIndex);
    }, [data, currentPage, itemsPerPage]);

    // Handle perpindahan halaman
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Handle perubahan jumlah item per halaman
    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset ke halaman 1 saat limit berubah
    };

    // Generate array nomor halaman untuk UI (e.g., [1, 2, ..., 10])
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) pages.push(i);
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
            } else {
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
                pages.push('...');
                pages.push(totalPages);
            }
        }
        return pages;
    };

    return {
        currentPage,
        setCurrentPage,
        itemsPerPage,
        totalItems,
        totalPages,
        paginatedData,
        handlePageChange,
        handleItemsPerPageChange,
        getPageNumbers,
    };
};

export default usePagination;
