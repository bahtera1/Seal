import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const DUMMY_COMMENTS = [
    {
        id: 1,
        user: "UJANG YUSMEIDI S.P., M.Agr.",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
        date: "28 Mar 2024 11:15",
        content: "Mohon maaf, apakah sertifikatnya sudah tidak dapat diunduh? Karena saya mau download ada konfirmasi bahwa TOTP aktivasi salah Bagaimana ya solusinya?",
        replies: [
            {
                id: 101,
                user: "DINA RIKHA RIYANAWATI, S.Pd",
                avatar: "https://randomuser.me/api/portraits/women/44.jpg",
                date: "28 Mar 2024 11:15",
                content: "saya mengunduh sertifikatnya kok juga belumbisa"
            }
        ]
    }
];

const CommentSection = () => {
    const [comment, setComment] = useState('');

    return (
        <section className="border-t border-slate-200 pt-8">
            {/* Title with left border */}
            <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-6 bg-slate-900 rounded-full"></div>
                <h2 className="text-xl font-bold text-slate-900">Komentar</h2>
            </div>

            {/* Comment Input */}
            <div className="flex gap-4 mb-8">
                {/* User Avatar */}
                <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="User"
                    className="w-10 h-10 rounded-full object-cover shrink-0"
                />
                <div className="flex-1">
                    <div className="relative">
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value.slice(0, 50))}
                            placeholder="Apa yang ingin anda tanyakan?"
                            className="w-full border border-slate-200 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-[#0091FF] resize-none text-sm"
                            rows={4}
                            maxLength={50}
                        />
                        <span className="absolute bottom-3 right-3 text-xs text-slate-400">
                            {comment.length}/50
                        </span>
                    </div>
                    <button className="mt-3 px-6 py-2 bg-[#0091FF] text-white rounded-lg font-medium hover:bg-blue-600 transition-colors text-sm">
                        Kirim
                    </button>
                </div>
            </div>

            {/* Comments List */}
            <div className="space-y-6">
                {DUMMY_COMMENTS.map((comment) => (
                    <div key={comment.id}>
                        {/* Main Comment */}
                        <div className="flex gap-4">
                            <img
                                src={comment.avatar}
                                alt="User"
                                className="w-10 h-10 rounded-full object-cover shrink-0"
                            />
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="font-semibold text-[#0091FF] text-sm">{comment.user}</span>
                                    <span className="text-slate-400">•</span>
                                    <span className="text-xs text-slate-400">{comment.date}</span>
                                </div>
                                <p className="text-slate-700 text-sm leading-relaxed">
                                    {comment.content}
                                </p>
                                <button className="text-[#0091FF] text-sm mt-2 hover:underline font-medium">Balas</button>
                            </div>
                        </div>

                        {/* Replies */}
                        {comment.replies && comment.replies.map((reply) => (
                            <div key={reply.id} className="flex gap-4 ml-14 mt-6">
                                <img
                                    src={reply.avatar}
                                    alt="User"
                                    className="w-10 h-10 rounded-full object-cover shrink-0"
                                />
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="font-semibold text-[#0091FF] text-sm">{reply.user}</span>
                                        <span className="text-slate-400">•</span>
                                        <span className="text-xs text-slate-400">{reply.date}</span>
                                    </div>
                                    <p className="text-slate-700 text-sm leading-relaxed">
                                        {reply.content}
                                    </p>
                                    <button className="text-[#0091FF] text-sm mt-2 hover:underline font-medium">Balas</button>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                    <span>Item per page</span>
                    <select className="border border-slate-200 rounded px-2 py-1 text-sm focus:outline-none">
                        <option>5</option>
                        <option>10</option>
                        <option>20</option>
                    </select>
                    <span>of 200</span>
                </div>
                <div className="flex items-center gap-1">
                    <button className="w-8 h-8 rounded flex items-center justify-center text-slate-300 hover:bg-slate-100">
                        <ChevronRight className="w-4 h-4 rotate-180" />
                    </button>
                    <span className="px-3 py-1 text-sm text-[#0091FF] font-medium">1</span>
                    <span className="px-3 py-1 text-sm text-slate-500">2</span>
                    <button className="w-8 h-8 rounded flex items-center justify-center text-slate-400 hover:bg-slate-100">
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CommentSection;
