import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Command } from 'lucide-react';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => setIsOpen(!isOpen);

    // Links based on "Berita Kini" design - using CNN categories
    const navLinks = [
        { name: 'Beranda', path: '/' },
        { name: 'Nasional', path: '/category/nasional' },
        { name: 'Internasional', path: '/category/internasional' },
        { name: 'Ekonomi', path: '/category/ekonomi' },
        { name: 'Olahraga', path: '/category/olahraga' },
        { name: 'Teknologi', path: '/category/teknologi' },
        { name: 'Hiburan', path: '/category/hiburan' },
    ];

    return (
        <nav className="sticky top-0 z-50 w-full bg-[#0091FF] text-white shadow-md font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <div className="shrink-0 flex items-center gap-2">
                        <Link to="/" className="flex items-center gap-3 group">
                            <Command className="w-8 h-8 text-white stroke-[2.5]" />
                            <span className="text-2xl font-bold tracking-tight group-hover:opacity-90 transition-opacity">
                                Berita Kini
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden lg:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`text-sm font-medium transition-all hover:opacity-80 pb-1 border-b-2 ${location.pathname === link.path
                                        ? 'border-white opacity-100 font-bold'
                                        : 'border-transparent opacity-90 hover:border-white/50'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="lg:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-600 focus:outline-none"
                        >
                            {isOpen ? <X className="block h-7 w-7" /> : <Menu className="block h-7 w-7" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="lg:hidden bg-[#0091FF] border-t border-blue-400/30">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={`block px-3 py-3 rounded-md text-base font-medium text-white hover:bg-blue-600 ${location.pathname === link.path ? 'bg-blue-600' : ''
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Header;
