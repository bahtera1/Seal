import React from 'react';
import { Command, Youtube, Instagram, Facebook, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-[#2C3C4D] text-white py-16 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

                    {/* Brand Column */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-3">
                            <Command className="w-9 h-9 text-white stroke-[2.5]" />
                            <span className="text-2xl font-bold tracking-tight">Berita Kini</span>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
                            © 2023 Berita Kini. All Rights Reserved.
                        </p>
                        <div className="space-y-4">
                            <h3 className="font-semibold text-white">Ikuti Kami</h3>
                            <div className="flex items-center gap-3">
                                <a href="#" className="bg-white/5 p-2.5 rounded-xl hover:bg-white/10 transition-colors border border-white/10">
                                    <Youtube className="w-5 h-5 text-white" />
                                </a>
                                <a href="#" className="bg-white/5 p-2.5 rounded-xl hover:bg-white/10 transition-colors border border-white/10">
                                    <Instagram className="w-5 h-5 text-white" />
                                </a>
                                <a href="#" className="bg-white/5 p-2.5 rounded-xl hover:bg-white/10 transition-colors border border-white/10">
                                    <Facebook className="w-5 h-5 text-white" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Telusuri Column */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 text-white">Telusuri</h3>
                        <ul className="space-y-4 text-slate-300">
                            <li><Link to="/" className="hover:text-[#0091FF] transition-colors">Beranda</Link></li>
                            <li><Link to="/category/nasional" className="hover:text-[#0091FF] transition-colors">Nasional</Link></li>
                            <li><Link to="/category/internasional" className="hover:text-[#0091FF] transition-colors">Internasional</Link></li>
                            <li><Link to="/category/ekonomi" className="hover:text-[#0091FF] transition-colors">Ekonomi</Link></li>
                            <li><Link to="/category/olahraga" className="hover:text-[#0091FF] transition-colors">Olahraga</Link></li>
                            <li><Link to="/category/teknologi" className="hover:text-[#0091FF] transition-colors">Teknologi</Link></li>
                            <li><Link to="/category/hiburan" className="hover:text-[#0091FF] transition-colors">Hiburan</Link></li>
                        </ul>
                    </div>

                    {/* Bantuan Column */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 text-white">Bantuan</h3>
                        <ul className="space-y-4 text-slate-300">
                            <li><a href="#" className="hover:text-[#0091FF] transition-colors">Kontak Kami</a></li>
                            <li><a href="#" className="hover:text-[#0091FF] transition-colors">Laporan Pembajakan</a></li>
                            <li><a href="#" className="hover:text-[#0091FF] transition-colors">Kebijakan</a></li>
                        </ul>
                    </div>

                    {/* Newsletter Column */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 text-white">Berlangganan Berita Terbaru</h3>
                        <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Masukan email"
                                    className="w-full bg-white text-slate-900 rounded-xl py-3.5 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-[#0091FF] placeholder-slate-400"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#0091FF] p-2 rounded-lg hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20"
                                >
                                    <Send className="w-4 h-4 text-white" />
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
