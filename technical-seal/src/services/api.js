import axios from 'axios';

// Pure Config: Base URL comes strictly from Environment Variables
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ANTARA_BASE_URL = `${BASE_URL}/antara-news/`;
const CNN_BASE_URL = `${BASE_URL}/cnn-news/`;

// Antara News categories
export const ANTARA_CATEGORIES = [
  { id: 'terkini', label: 'Terkini' },
  { id: 'top-news', label: 'Top News' },
];

// CNN News categories (for navigation)
export const CNN_CATEGORIES = [
  { id: 'nasional', label: 'Nasional' },
  { id: 'internasional', label: 'Internasional' },
  { id: 'ekonomi', label: 'Ekonomi' },
  { id: 'olahraga', label: 'Olahraga' },
  { id: 'teknologi', label: 'Teknologi' },
  { id: 'hiburan', label: 'Hiburan' },
  { id: 'gaya-hidup', label: 'Gaya Hidup' },
];

// Normalisasi Data CNN (Adapter Pattern)
// Mengubah struktur data CNN agar seragam dengan Antara News.
// API CNN seringkali memiliki struktur nested (image.large), sedangkan kita butuh flat object.
const normalizeCnnItem = (item) => ({
  title: item.title,
  link: item.link,
  description: item.contentSnippet || '', // Fallback jika description kosong
  isoDate: item.isoDate,
  image: item.image?.large || item.image?.small || '', // Ambil resolusi terbaik
  source: 'cnn',
});

// Normalisasi Data Antara
// Menambahkan properti 'source' untuk keperluan styling UI yang berbeda
const normalizeAntaraItem = (item) => ({
  ...item,
  source: 'antara',
});

/**
 * Mengambil berita dari Antara News API
 * Digunakan untuk: Headline & Popular News (Home), dan Kategori khusus (Terkini/Top News)
 * 
 * @param {string} category - Kategori berita (terkini, top-news)
 * @returns {Promise<Array>} List berita yang sudah dinormalisasi
 */
export const fetchAntaraNews = async (category = 'terkini') => {
  try {
    const response = await axios.get(`${ANTARA_BASE_URL}${category}`);
    if (response.data && response.data.data) {
      return response.data.data.map(normalizeAntaraItem);
    }
    return [];
  } catch (error) {
    console.error(`Error fetching Antara news for category ${category}:`, error);
    return [];
  }
};

/**
 * Mengambil berita dari CNN News API
 * Digunakan untuk: Kategori utama (Nasional, Internasional, dll)
 * 
 * @param {string} category - Kategori berita (nasional, internasional, dll)
 * @returns {Promise<Array>} List berita yang sudah dinormalisasi
 */
export const fetchCnnNews = async (category = 'nasional') => {
  try {
    const response = await axios.get(`${CNN_BASE_URL}${category}`);
    if (response.data && response.data.data) {
      return response.data.data.map(normalizeCnnItem);
    }
    return [];
  } catch (error) {
    console.error(`Error fetching CNN news for category ${category}:`, error);
    return [];
  }
};

/**
 * Generic fetcher untuk kemudahan penggunaan
 * Mengatur routing ke API source yang tepat berdasarkan parameter
 */
export const fetchNews = async (category = 'terkini', source = 'antara') => {
  // Jika kategori termasuk dalam CNN Categories, gunakan CNN
  const isCnn = CNN_CATEGORIES.some(c => c.id === category) || source === 'cnn';

  if (isCnn) {
    return fetchCnnNews(category);
  }
  return fetchAntaraNews(category);
};
