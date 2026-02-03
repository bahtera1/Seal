import React from 'react';
import NewsCard from './NewsCard';
import { motion } from 'framer-motion';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
};

const NewsGrid = ({ newsList, title }) => {
    if (!newsList || newsList.length === 0) {
        return (
            <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                <p className="text-slate-400 text-lg">Tidak ada berita ditemukan.</p>
            </div>
        );
    }

    return (
        <section>
            {title && (
                <div className="flex items-center gap-4 mb-8">
                    <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
                    <div className="h-px bg-slate-200 flex-1" />
                </div>
            )}
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
            >
                {newsList.map((news, index) => (
                    <motion.div
                        key={`${news.title}-${index}`}
                        variants={item}
                    >
                        <NewsCard news={news} />
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default NewsGrid;
