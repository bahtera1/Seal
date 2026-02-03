import React from 'react';
import { motion } from 'framer-motion';

const Loading = () => {
    return (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm h-96"
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 0.8,
                        delay: i * 0.1
                    }}
                >
                    <div className="h-48 bg-slate-200" />
                    <div className="p-5 space-y-4">
                        <div className="h-4 bg-slate-200 rounded w-1/3" />
                        <div className="space-y-2">
                            <div className="h-6 bg-slate-200 rounded w-full" />
                            <div className="h-6 bg-slate-200 rounded w-3/4" />
                        </div>
                        <div className="h-20 bg-slate-200 rounded w-full mt-4" />

                        <div className="pt-4 border-t border-slate-100">
                            <div className="h-4 bg-slate-200 rounded w-1/4" />
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default Loading;
