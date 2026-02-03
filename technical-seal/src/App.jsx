import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ScrollToTop from './components/ui/ScrollToTop';
import Loading from './components/ui/Loading';

// Lazy loading pages for better performance (Code Splitting)
const HomePage = React.lazy(() => import('./pages/HomePage'));
const CategoryPage = React.lazy(() => import('./pages/CategoryPage'));
const SearchPage = React.lazy(() => import('./pages/SearchPage'));
const ArticlePage = React.lazy(() => import('./pages/ArticlePage'));

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        {/* Suspense shows the Loading component while the page code is being downloaded */}
        <Suspense fallback={<div className="py-12"><Loading /></div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/article" element={<ArticlePage />} />
            {/* Fallback for unknown routes */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;
