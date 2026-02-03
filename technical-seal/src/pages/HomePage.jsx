import React, { useMemo, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchAntaraNews, fetchCnnNews } from '../services/api';
import NewsGrid from '../components/news/NewsGrid';
import Loading from '../components/ui/Loading';
import ScrollReveal from '../components/ui/ScrollReveal';
import { formatDate } from '../utils/date';
import HeroNews from '../components/news/HeroNews';
import usePagination from '../hooks/usePagination';
import { ChevronRight } from 'lucide-react';

const HomePage = () => {
    const navigate = useNavigate();
    // State for all news data
    const [topNews, setTopNews] = useState([]);
    const [cnnNews, setCnnNews] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch all initial data concurrently
    useEffect(() => {
        const loadInitialData = async () => {
            setLoading(true);
            try {
                // Kita ambil data Antara (Top News) dan CNN (Nasional) secara bersamaan (Parallel).
                // Supaya loadingnya lebih cepat, tidak perlu tunggu satu per satu.
                const [antaraData, cnnData] = await Promise.all([
                    fetchAntaraNews('top-news'),
                    fetchCnnNews('nasional')
                ]);

                setTopNews(antaraData);
                setCnnNews(cnnData);
            } catch (error) {
                console.error("Failed to load home page data", error);
            } finally {
                setLoading(false);
            }
        };

        loadInitialData();
    }, []);

    // Process data for sections
    // Kita bagi-bagi data induk (yang sudah diambil) ke masing-masing bagian:
    // 1. Headline = Ambil 5 berita pertama dari Antara.
    // 2. Popular = Ambil 3 berita berikutnya dari Antara.
    // 3. Rekomendasi = Sisanya pakai berita dari CNN.
    // Pakai 'useMemo' biar komputer tidak hitung ulang terus-menerus (Performance).
    const { headlineItems, popularItems, recommendationItemsRaw } = useMemo(() => {
        return {
            headlineItems: topNews.slice(0, 5),
            popularItems: topNews.slice(5, 8),
            recommendationItemsRaw: cnnNews
        };
    }, [topNews, cnnNews]);

    // Use Pagination Logic for Recommendations Section
    const {
        currentPage,
        itemsPerPage,
        totalItems,
        totalPages,
        paginatedData: recommendationItems,
        handlePageChange,
        getPageNumbers,
    } = usePagination(recommendationItemsRaw, 9);

    if (loading) return <Loading />;

    return (
        <div className="space-y-12">

            {/* 1. Headline (Hero) - Carousel */}
            <ScrollReveal animation="scale">
                <HeroNews newsList={headlineItems} />
            </ScrollReveal>

            {/* 2. Berita Terpopuler */}
            <ScrollReveal>
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-1.5 h-8 bg-[#0091FF] rounded-full"></div>
                    <h2 className="text-2xl font-bold text-slate-800">Berita Terpopuler</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {popularItems.map((news, idx) => {
                        const articleUrl = `/article?url=${encodeURIComponent(news.link)}&category=${news.source === 'cnn' ? 'nasional' : 'top-news'}`;
                        return (
                            <Link key={idx} to={articleUrl} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex gap-4 items-center transition-all duration-300 hover:shadow-lg hover:border-[#0091FF]/30 hover:-translate-y-1">
                                <div className="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-slate-200">
                                    <img src={news.image} alt={news.title} className="w-full h-full object-cover" />
                                    <div className="absolute top-0 left-0 bg-slate-900/80 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-br-lg">
                                        {idx + 1}
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-sm font-bold text-slate-800 line-clamp-2 mb-2 hover:text-[#0091FF]">
                                        {news.title}
                                    </h3>
                                    <p className="text-xs text-[#0091FF] font-medium">{formatDate(news.isoDate).split(',')[0]}</p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </ScrollReveal>

            {/* 3. Rekomendasi Untuk Anda */}
            <ScrollReveal>
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-8 bg-[#0091FF] rounded-full"></div>
                        <h2 className="text-2xl font-bold text-slate-800">Rekomendasi Untuk Anda</h2>
                    </div>

                    {/* Search Input Filter */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Cari disini..."
                            className="pl-4 pr-10 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0091FF] text-sm w-48 md:w-64"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    // Pindah halaman ke Search Page tanpa refresh loading
                                    navigate(`/search?q=${e.target.value}`);
                                }
                            }}
                        />
                        <svg className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                </div>

                <NewsGrid newsList={recommendationItems} />

                {/* Pagination - Dynamic Functional */}
                {totalPages > 1 && (
                    <div className="mt-8 flex items-center justify-between">
                        <p className="text-sm text-slate-500 hidden sm:block">
                            Showing <span className="font-medium text-slate-700">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium text-slate-700">{Math.min(currentPage * itemsPerPage, totalItems)}</span> of <span className="font-medium text-slate-700">{totalItems}</span> results
                        </p>

                        <div className="flex items-center gap-1 w-full sm:w-auto justify-between sm:justify-end">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`px-3 py-2 text-sm flex items-center gap-1 transition-colors ${currentPage === 1 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                <ChevronRight className="w-4 h-4 rotate-180" />
                                Previous
                            </button>

                            <div className="flex items-center gap-1">
                                {getPageNumbers().map((page, idx) => (
                                    page === '...' ? (
                                        <span key={`ellipsis-${idx}`} className="px-2 text-slate-400">...</span>
                                    ) : (
                                        <button
                                            key={page}
                                            onClick={() => handlePageChange(page)}
                                            className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${currentPage === page ? 'bg-[#0091FF] text-white' : 'text-slate-600 hover:bg-slate-100'}`}
                                        >
                                            {page}
                                        </button>
                                    )
                                ))}
                            </div>

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`px-3 py-2 text-sm flex items-center gap-1 transition-colors ${currentPage === totalPages ? 'text-slate-300 cursor-not-allowed' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                Next
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}
            </ScrollReveal>

            {/* 4. Promo Banner - Bottom */}
            <ScrollReveal>
                <section className="relative w-full rounded-3xl overflow-hidden bg-linear-to-r from-emerald-400 to-cyan-500 text-white p-8 md:p-12 shadow-xl">
                    <div className="relative z-10 max-w-2xl">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Petualangan Edukatif bersama Malang Mbois City Tour!</h2>
                        <p className="text-emerald-50 mb-8 max-w-lg">Petualangan edukatif bersama Malang Mbois City Tour! Jelajahi keindahan kota dengan cara yang seru.</p>
                        {/* Dots */}
                        <div className="flex gap-2">
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                            <div className="w-3 h-3 bg-white/50 rounded-full"></div>
                            <div className="w-3 h-3 bg-white/50 rounded-full"></div>
                        </div>
                    </div>
                    {/* Decorative circles */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                    <div className="absolute bottom-0 left-20 w-32 h-32 bg-yellow-300/20 rounded-full blur-2xl"></div>
                </section>
            </ScrollReveal>

        </div>
    );
};

export default HomePage;

