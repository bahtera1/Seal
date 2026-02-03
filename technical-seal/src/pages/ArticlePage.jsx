import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { fetchCnnNews, fetchAntaraNews, CNN_CATEGORIES } from '../services/api';
import { formatDate } from '../utils/date';
import Loading from '../components/ui/Loading';
import CommentSection from '../components/news/CommentSection';
import { Calendar, ChevronRight, Home } from 'lucide-react';

const ArticlePage = () => {
    const [searchParams] = useSearchParams();
    const articleUrl = searchParams.get('url');
    const category = searchParams.get('category') || 'nasional';

    // Determine if category is CNN or Antara
    const isCnnCategory = CNN_CATEGORIES.some(c => c.id === category);

    const [article, setArticle] = useState(null);
    const [popularNews, setPopularNews] = useState([]);
    const [relatedNews, setRelatedNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);

            // Fetch news from correct source based on category
            const newsData = isCnnCategory
                ? await fetchCnnNews(category)
                : await fetchAntaraNews(category);

            // Find the article by URL
            const foundArticle = newsData.find(n => n.link === articleUrl);
            setArticle(foundArticle || newsData[0]);

            // Popular news (different from current article)
            setPopularNews(newsData.filter(n => n.link !== articleUrl).slice(0, 4));

            // Related news
            setRelatedNews(newsData.filter(n => n.link !== articleUrl).slice(4, 7));

            setLoading(false);
        };
        loadData();
    }, [articleUrl, category, isCnnCategory]);

    if (loading) return <Loading />;
    if (!article) return <div className="text-center py-20">Artikel tidak ditemukan</div>;

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

    return (
        <div className="py-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm mb-6">
                <Home className="w-4 h-4 text-slate-400" />
                <Link to="/" className="text-slate-600 hover:text-[#0091FF] transition-colors">Beranda</Link>
                <ChevronRight className="w-4 h-4 text-slate-400" />
                <Link to={`/category/${category}`} className="text-slate-600 hover:text-[#0091FF] transition-colors">
                    {categoryNames[category] || category}
                </Link>
                <ChevronRight className="w-4 h-4 text-slate-400" />
                <span className="text-slate-400">Detail</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2">
                    {/* Article Header */}
                    <article>
                        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight mb-4">
                            {article.title}
                        </h1>

                        <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
                            <span className="text-[#0091FF] font-medium">{categoryNames[category] || category}</span>
                            <span>•</span>
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(article.isoDate)}</span>
                        </div>

                        {/* Featured Image */}
                        <div className="rounded-2xl overflow-hidden mb-8">
                            <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-auto object-cover"
                            />
                        </div>

                        {/* Article Content */}
                        <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed mb-8">
                            <p>{article.description}</p>

                            {/* Simulated article content */}
                            <p className="mt-4">
                                Jakarta, CNN Indonesia - {article.description}
                            </p>
                            <p className="mt-4">
                                Berbagai pihak telah memberikan tanggapan terkait perkembangan ini.
                                Para ahli menyatakan bahwa situasi ini memerlukan penanganan yang
                                komprehensif dari berbagai pemangku kepentingan.
                            </p>
                            <p className="mt-4">
                                "Kami akan terus memantau perkembangan dan mengambil langkah-langkah
                                yang diperlukan untuk memastikan penanganan yang optimal," kata narasumber.
                            </p>
                            <p className="mt-4">
                                Perkembangan lebih lanjut akan diinformasikan seiring berjalannya waktu.
                                Masyarakat diimbau untuk tetap mengikuti perkembangan berita melalui
                                sumber-sumber terpercaya.
                            </p>
                        </div>

                        {/* Read full article link */}
                        <a
                            href={article.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-[#0091FF] font-semibold hover:underline mb-12"
                        >
                            Baca artikel lengkap di sumber asli
                            <ChevronRight className="w-4 h-4" />
                        </a>
                    </article>

                    {/* Comments Section */}
                    <CommentSection />
                </div>

                {/* Sidebar */}
                <aside className="lg:col-span-1">
                    <div className="sticky top-24">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-1.5 h-8 bg-[#0091FF] rounded-full"></div>
                            <h2 className="text-xl font-bold text-slate-900">Berita Terpopuler</h2>
                        </div>

                        <div className="space-y-4">
                            {popularNews.map((news, idx) => (
                                <Link
                                    key={idx}
                                    to={`/article?url=${encodeURIComponent(news.link)}&category=${category}`}
                                    className="flex gap-4 group"
                                >
                                    <div className="w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-slate-100">
                                        <img
                                            src={news.image}
                                            alt={news.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-sm font-semibold text-slate-900 line-clamp-2 group-hover:text-[#0091FF] transition-colors">
                                            {news.title}
                                        </h3>
                                        <p className="text-xs text-[#0091FF] mt-2">
                                            {formatDate(news.isoDate).split(',')[0]}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>

            {/* Related News */}
            <section className="mt-16 border-t border-slate-200 pt-8">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-8 bg-[#0091FF] rounded-full"></div>
                        <h2 className="text-xl font-bold text-slate-900">Berita Terkait</h2>
                    </div>
                    <Link
                        to={`/category/${category}`}
                        className="text-sm text-[#0091FF] hover:underline flex items-center gap-1"
                    >
                        Lihat Semua
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedNews.map((news, idx) => (
                        <Link
                            key={idx}
                            to={`/article?url=${encodeURIComponent(news.link)}&category=${category}`}
                            className="bg-white rounded-xl overflow-hidden border border-slate-100 hover:shadow-lg transition-shadow group"
                        >
                            <div className="h-40 overflow-hidden">
                                <img
                                    src={news.image}
                                    alt={news.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="font-semibold text-slate-900 line-clamp-2 group-hover:text-[#0091FF] transition-colors mb-2">
                                    {news.title}
                                </h3>
                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                    <span className="text-[#0091FF]">{categoryNames[category] || category}</span>
                                    <span>•</span>
                                    <span>{formatDate(news.isoDate).split(',')[0]}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default ArticlePage;
