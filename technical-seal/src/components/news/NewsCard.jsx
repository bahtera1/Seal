import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/date';
import { Calendar, ImageOff } from 'lucide-react';
import { motion } from 'framer-motion';

const NewsCard = ({ news }) => {
    const [imageError, setImageError] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    // Build article URL with category if available
    const articleUrl = `/article?url=${encodeURIComponent(news.link)}&category=${news.source === 'cnn' ? 'nasional' : 'terkini'}`;

    const handleImageError = () => {
        setImageError(true);
    };

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    return (
        <Link to={articleUrl} className="block h-full">
            <motion.article
                className="group relative flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100"
                whileHover={{
                    y: -8,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    borderColor: "rgba(0, 145, 255, 0.3)"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                {/* Image Container */}
                <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                    {imageError ? (
                        // Fallback placeholder
                        <div className="w-full h-full img-placeholder">
                            <div className="text-center">
                                <ImageOff className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                                <span className="text-xs text-slate-400">Gambar tidak tersedia</span>
                            </div>
                        </div>
                    ) : (
                        <motion.img
                            src={news.image}
                            alt={news.title}
                            className={`w-full h-full object-cover ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                            loading="lazy"
                            onError={handleImageError}
                            onLoad={handleImageLoad}
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                        />
                    )}
                    <motion.div
                        className="absolute inset-0 bg-linear-to-t from-slate-900/30 to-transparent"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5">
                    <div className="flex items-center gap-2 text-xs text-[#0091FF] font-semibold mb-3 bg-blue-50 w-fit px-2 py-1 rounded-md">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{formatDate(news.isoDate)}</span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-3 leading-snug group-hover:text-[#0091FF] transition-colors duration-200 line-clamp-2">
                        {news.title}
                    </h3>

                    <p className="text-sm text-slate-500 line-clamp-3 mb-4 flex-1">
                        {news.description}
                    </p>

                    <div className="mt-auto pt-4 border-t border-slate-100">
                        <span className="text-sm font-semibold text-[#0091FF] group-hover:underline transition-all">
                            Baca Selengkapnya
                        </span>
                    </div>
                </div>
            </motion.article>
        </Link>
    );
};

export default NewsCard;
