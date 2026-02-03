import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/date';
import { ArrowUpRight, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const HeroNews = ({ news, newsList = [] }) => {
    // If newsList provided, use carousel, otherwise single news
    const items = newsList.length > 0 ? newsList : (news ? [news] : []);
    const [currentIndex, setCurrentIndex] = useState(0);

    if (items.length === 0) return null;

    const currentNews = items[currentIndex];
    const totalItems = items.length;

    const goNext = () => {
        setCurrentIndex((prev) => (prev + 1) % totalItems);
    };

    const goPrev = () => {
        setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
    };

    // Build article URL for internal navigation (headline comes from Antara top-news)
    const articleUrl = `/article?url=${encodeURIComponent(currentNews.link)}&category=${currentNews.source === 'cnn' ? 'nasional' : 'top-news'}`;

    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Left: Text Content (5 cols) */}
                <div className="lg:col-span-5 p-8 md:p-10 lg:p-12 flex flex-col justify-center order-2 lg:order-1">
                    {/* Headline Label */}
                    <span className="text-slate-900 font-semibold text-sm mb-4">
                        Headline
                    </span>

                    {/* Title */}
                    <Link to={articleUrl}>
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight mb-4 hover:text-[#0091FF] transition-colors">
                            {currentNews.title}
                        </h1>
                    </Link>

                    {/* Description */}
                    <p className="text-slate-600 text-base leading-relaxed mb-6 line-clamp-4">
                        {currentNews.description}
                    </p>

                    {/* Date */}
                    <div className="flex items-center gap-2 text-slate-500 text-sm mb-6">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(currentNews.isoDate)}</span>
                    </div>

                    {/* Read More Link */}
                    <Link
                        to={articleUrl}
                        className="inline-flex items-center gap-1 text-[#0091FF] font-semibold hover:underline transition-all group"
                    >
                        Baca Selengkapnya
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                </div>

                {/* Right: Image (7 cols) */}
                <Link to={articleUrl} className="lg:col-span-7 relative h-72 lg:h-auto lg:min-h-112.5 order-1 lg:order-2 block">
                    <img
                        src={currentNews.image}
                        alt={currentNews.title}
                        className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                </Link>
            </div>

            {/* Pagination Controls */}
            {totalItems > 1 && (
                <div className="flex items-center justify-center gap-4 py-4">
                    <button
                        onClick={goPrev}
                        className="p-1 text-slate-400 hover:text-slate-600 transition-colors"
                        aria-label="Previous"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>

                    <div className="flex items-center gap-2 text-sm text-slate-600">
                        <span className="font-semibold">{currentIndex + 1}</span>
                        <span>dari</span>
                        <span>{totalItems}</span>
                    </div>

                    <button
                        onClick={goNext}
                        className="p-1 text-slate-400 hover:text-slate-600 transition-colors"
                        aria-label="Next"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default HeroNews;

