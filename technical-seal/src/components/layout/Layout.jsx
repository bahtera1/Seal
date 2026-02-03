import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 font-sans">
            <Header />
            <main className="grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
