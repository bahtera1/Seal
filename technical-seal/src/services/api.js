import axios from 'axios';

// Kita pakai proxy PHP buatan kita sendiri untuk lewatin blokir CORS di cPanel
// Path-nya harus sesuai dengan lokasi hosting kamu
const PROXY_URL = '/portal-berita/proxy.php?url=';
const REAL_API_URL = 'https://berita-indo-api-next.vercel.app/api';

export const fetchNews = async (category) => {
  const isCnn = CNN_CATEGORIES.some(c => c.id === category);
  return isCnn ? fetchCnnNews(category) : fetchAntaraNews(category);
};

export const fetchAntaraNews = async (category) => {
  try {
    const targetUrl = `${REAL_API_URL}/antara-news/${category}`;
    // Panggil lewat proxy
    const response = await axios.get(`${PROXY_URL}${encodeURIComponent(targetUrl)}`);
    return (response.data.data || []).map(normalizeAntaraItem);
  } catch (error) {
    console.error(`Gagal ambil Antara:`, error.message);
    return [];
  }
};

export const fetchCnnNews = async (category) => {
  try {
    const targetUrl = `${REAL_API_URL}/cnn-news/${category}`;
    // Panggil lewat proxy
    const response = await axios.get(`${PROXY_URL}${encodeURIComponent(targetUrl)}`);
    return (response.data.data || []).map(normalizeCnnItem);
  } catch (error) {
    console.error(`Gagal ambil CNN:`, error.message);
    return [];
  }
};

const normalizeAntaraItem = (item) => ({
  title: item.title,
  link: item.link,
  description: item.description,
  isoDate: item.isoDate,
  image: item.image,
  source: 'antara',
});

const normalizeCnnItem = (item) => ({
  title: item.title,
  link: item.link,
  description: item.contentSnippet || '',
  isoDate: item.isoDate,
  image: item.image?.large || item.image?.small || '',
  source: 'cnn',
});

export const ANTARA_CATEGORIES = [
  { id: 'terkini', name: 'Terkini' },
  { id: 'top-news', name: 'Top News' },
  { id: 'politik', name: 'Politik' },
  { id: 'ekonomi', name: 'Ekonomi' },
  { id: 'bola', name: 'Sepak Bola' },
];

export const CNN_CATEGORIES = [
  { id: 'nasional', name: 'Nasional' },
  { id: 'internasional', name: 'Internasional' },
  { id: 'ekonomi', name: 'Ekonomi' },
  { id: 'olahraga', name: 'Olahraga' },
  { id: 'teknologi', name: 'Teknologi' },
  { id: 'hiburan', name: 'Hiburan' },
  { id: 'gaya-hidup', name: 'Gaya Hidup' },
];
