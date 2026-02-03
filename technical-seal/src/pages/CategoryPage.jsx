import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchAntaraNews, fetchCnnNews, CNN_CATEGORIES } from '../services/api';
import NewsGrid from '../components/news/NewsGrid';
import Loading from '../components/ui/Loading';
import usePagination from '../hooks/usePagination';
import { ChevronRight, Home } from 'lucide-react';

const CategoryPage = () => {
    const { category } = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // SEPARATION OF CONCERNS:
    // Logic pagination dipisah ke Custom Hook (usePagination) agar kode UI tetap bersih.
    const {
        currentPage,
        setCurrentPage,
        itemsPerPage,
        totalItems,
        totalPages,
        paginatedData,
        handlePageChange,
        handleItemsPerPageChange,
        getPageNumbers,
    } = usePagination(data, 9);

    // DYNAMIC SOURCING:
    // Menentukan API mana yang harus dipanggil berdasarkan Category ID.
    // Jika ID termasuk dalam daftar CNN, panggil CNN. Jika tidak, fallback ke Antara.
    const isCnnCategory = CNN_CATEGORIES.some(c => c.id === category);

    const categoryNames = {
        // CNN Categories
        'nasional': 'Nasional',
        'internasional': 'Internasional',
        'ekonomi': 'Ekonomi',
        'olahraga': 'Olahraga',
        'teknologi': 'Teknologi',
        'hiburan': 'Hiburan',
        'gaya-hidup': 'Gaya Hidup',
        // Antara Categories
        'terkini': 'Berita Terkini',
        'top-news': 'Top News',
    };

    // Format category title
    const title = categoryNames[category] || (category
        ? category.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
        : 'Berita');

    useEffect(() => {
        const loadNews = async () => {
            setLoading(true);
            setError(null);
            setCurrentPage(1);
            try {
                const result = isCnnCategory
                    ? await fetchCnnNews(category)
                    : await fetchAntaraNews(category);
                setData(result);
            } catch (err) {
                setError(err);
            }
            setLoading(false);
        };
        loadNews();
    }, [category, isCnnCategory]);


    if (loading) return <Loading />;

    if (error) return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-slate-400 text-lg mb-4">Gagal memuat berita untuk kategori ini.</p>
            <button onClick={() => window.location.reload()} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                Coba Lagi
            </button>
        </div>
    );

    return (
        <div className="py-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm mb-6">
                <Home className="w-4 h-4 text-slate-400" />
                <Link to="/" className="text-slate-600 hover:text-[#0091FF] transition-colors">Beranda</Link>
                <ChevronRight className="w-4 h-4 text-slate-400" />
                <span className="text-slate-400">{title}</span>
            </nav>

            {/* Header */}
            <div className="flex items-center gap-3 mb-2">
                <div className="w-1.5 h-8 bg-[#0091FF] rounded-full"></div>
                <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
                {isCnnCategory && (
                    <span className="text-xs px-2 py-1 bg-red-100 text-red-600 rounded-md font-medium">CNN</span>
                )}
            </div>

            <p className="text-slate-500 mb-8 ml-5 pl-1">
                Berita terkini seputar {title.toLowerCase()} hari ini.
            </p>

            {/* News Grid */}
            <NewsGrid newsList={paginatedData} />

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-6 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <span>Item per page</span>
                        <select
                            value={itemsPerPage}
                            onChange={handleItemsPerPageChange}
                            className="border border-slate-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#0091FF]"
                        >
                            <option value={6}>6</option>
                            <option value={9}>9</option>
                            <option value={12}>12</option>
                            <option value={18}>18</option>
                        </select>
                        <span>of {totalItems}</span>
                    </div>

                    <div className="flex items-center gap-1">
                        {/* Previous Button */}
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`w-8 h-8 rounded flex items-center justify-center transition-colors ${currentPage === 1
                                ? 'text-slate-300 cursor-not-allowed'
                                : 'text-slate-400 hover:bg-slate-100'
                                }`}
                        >
                            <ChevronRight className="w-4 h-4 rotate-180" />
                        </button>

                        {/* Mobile: Simple page indicator */}
                        <span className="sm:hidden px-3 py-1 text-sm text-slate-600">
                            {currentPage} / {totalPages}
                        </span>

                        {/* Desktop: Full Page Numbers */}
                        <div className="hidden sm:flex items-center gap-1">
                            {getPageNumbers().map((page, idx) => (
                                page === '...' ? (
                                    <span key={`ellipsis-${idx}`} className="px-2 text-slate-400">...</span>
                                ) : (
                                    <button
                                        key={page}
                                        onClick={() => handlePageChange(page)}
                                        className={`px-3 py-1 text-sm rounded transition-colors ${currentPage === page
                                            ? 'text-[#0091FF] font-medium'
                                            : 'text-slate-500 hover:bg-slate-100'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                )
                            ))}
                        </div>

                        {/* Next Button */}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`w-8 h-8 rounded flex items-center justify-center transition-colors ${currentPage === totalPages
                                ? 'text-slate-300 cursor-not-allowed'
                                : 'text-slate-400 hover:bg-slate-100'
                                }`}
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryPage;
