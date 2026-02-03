import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchNews } from '../services/api';
import NewsGrid from '../components/news/NewsGrid';
import Loading from '../components/ui/Loading';
import usePagination from '../hooks/usePagination';
import { ChevronRight } from 'lucide-react';

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';

    const [allData, setAllData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch data and filter client-side
    useEffect(() => {
        const loadNews = async () => {
            setLoading(true);
            setError(null);
            try {
                // Tarik data dari SELURUH kategori yang tersedia (Antara & CNN) demi hasil pencarian maksimal
                const [
                    terkini, top, nasional, internasional, ekonomi, olahraga, teknologi, hiburan, gaya
                ] = await Promise.all([
                    fetchNews('terkini'),      // Antara
                    fetchNews('top-news'),     // Antara
                    fetchNews('nasional'),     // CNN
                    fetchNews('internasional'),// CNN
                    fetchNews('ekonomi'),      // CNN
                    fetchNews('olahraga'),     // CNN
                    fetchNews('teknologi'),    // CNN
                    fetchNews('hiburan'),      // CNN
                    fetchNews('gaya-hidup')    // CNN
                ]);

                // Gabungkan semua kategori menjadi satu pool data besar
                const combined = [
                    ...terkini, ...top, ...nasional, ...internasional,
                    ...ekonomi, ...olahraga, ...teknologi, ...hiburan, ...gaya
                ];

                // Hapus duplikat berdasarkan link
                const uniqueNews = Array.from(new Map(combined.map(item => [item.link, item])).values());

                // Client-side Filter berdasarkan Judul & Deskripsi
                const filtered = uniqueNews.filter(news =>
                    news.title.toLowerCase().includes(query.toLowerCase()) ||
                    (news.description && news.description.toLowerCase().includes(query.toLowerCase()))
                );

                setAllData(filtered);
            } catch (err) {
                console.error("Search error:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        if (query) {
            loadNews();
        } else {
            setAllData([]);
            setLoading(false);
        }
    }, [query]);

    // Apply pagination logic
    const {
        currentPage,
        itemsPerPage,
        totalItems,
        totalPages,
        paginatedData,
        handlePageChange,
        handleItemsPerPageChange,
        getPageNumbers,
    } = usePagination(allData, 9);

    if (loading) return <Loading />;

    if (error) return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-slate-400 text-lg mb-4">Gagal mencari berita.</p>
            <button onClick={() => window.location.reload()} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                Coba Lagi
            </button>
        </div>
    );

    return (
        <div className="py-8">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-1.5 h-8 bg-[#0091FF] rounded-full"></div>
                <h1 className="text-3xl font-bold text-slate-900">
                    Hasil Pencarian: "{query}"
                </h1>
            </div>

            {allData.length === 0 ? (
                <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                    <p className="text-slate-500 text-lg">Tidak ada berita yang ditemukan untuk kata kunci "{query}".</p>
                </div>
            ) : (
                <>
                    <NewsGrid newsList={paginatedData} />

                    {/* Pagination UI */}
                    {totalPages > 1 && (
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-6 border-t border-slate-100">
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                <span className="hidden sm:inline">Item per page</span>
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

                                <span className="sm:hidden px-3 py-1 text-sm text-slate-600">
                                    {currentPage} / {totalPages}
                                </span>

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
                </>
            )}
        </div>
    );
};

export default SearchPage;
