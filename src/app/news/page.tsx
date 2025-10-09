import { api } from '@/lib/api';
export const dynamic = 'force-dynamic';
export const revalidate = 0;
import Link from 'next/link';
import Image from 'next/image';
const BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

interface NewsArticle {
  id: number;
  attributes?: {
    title?: string;
    slug?: string;
    excerpt?: string;
    content?: string;
    category?: string;
    publishedAt?: string;
    author?: string;
    tags?: string[];
    isFeatured?: boolean;
  };
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  category?: string;
  publishedAt?: string;
  author?: string;
  tags?: string[];
  isFeatured?: boolean;
}

export default async function News() {
  let newsArticles: NewsArticle[] = [];
  let featuredArticles: NewsArticle[] = [];
  let dataSource = "No Data";
  let strapiStatus = "❌ Strapi API tidak dapat diakses";

  try {
    const newsResponse = await api.getNewsArticles();
    const featuredResponse = await api.getFeaturedNews();
    if (newsResponse.data && newsResponse.data.length > 0) {
      newsArticles = newsResponse.data;
      featuredArticles = featuredResponse.data || [];
      dataSource = "Strapi CMS";
      strapiStatus = "✅ Strapi API berhasil diakses";
    } else {
      strapiStatus = "⚠️ Strapi API tersedia tapi tidak ada data";
    }
  } catch (error) {
    strapiStatus = "❌ Strapi API tidak dapat diakses";
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'achievement': return 'bg-green-100 text-green-800';
      case 'product-update': return 'bg-blue-100 text-blue-800';
      case 'company-news': return 'bg-gray-100 text-gray-800';
      case 'press-release': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'achievement': return 'Pencapaian';
      case 'product-update': return 'Update Produk';
      case 'company-news': return 'Berita Perusahaan';
      case 'press-release': return 'Press Release';
      default: return 'Berita';
    }
  };
  const getAttrs = (item: any) => (item?.attributes ? item.attributes : item || {});
  const getTitle = (a: any) => a?.title || a?.Title || 'Tanpa Judul';
  const getContentPreview = (a: any, max = 220) => {
    const source = a?.excerpt || a?.Excerpt || a?.content || '';
    const text = String(source)
      .replace(/<br\s*\/?>(\n)?/gi, '\n')
      .replace(/<[^>]+>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .trim();
    if (text.length <= max) return text;
    return text.slice(0, max).replace(/\s+\S*$/, '') + '…';
  };
  const getImageUrl = (a: any) => {
    const img = a?.image;
    if (!img) return '';
    if (typeof img === 'object') {
      const url = img.url || img.data?.attributes?.url;
      if (!url) return '';
      return url.startsWith('http') ? url : `${BASE_URL}${url}`;
    }
    return '';
  };
  const getSlug = (a: any, id: any) => (a?.slug ? a.slug : id);
  const getCategory = (a: any) => a?.category ?? 'company-news';
  const getPublishedAt = (a: any) => a?.publishedAt ?? Date.now();
  const getAuthor = (a: any) => a?.author ?? 'TravelPulsa';
  const getIsFeatured = (a: any) => !!(a?.isFeatured);

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-primary-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-secondary mb-6 reveal">Berita & <span className="text-primary">Update</span></h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto reveal" data-delay="150">Ikuti perkembangan terbaru dan pencapaian Travel Pulsa</p>
          </div>
        </div>
      </section>

      {/* Highlight + Grid in one continuous section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {newsArticles.length > 0 && (() => {
            const latest = getAttrs(newsArticles[0]);
            const latestId = newsArticles[0].id;
            return (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center pb-12">
                <div className="w-full bg-gray-100 rounded-lg overflow-hidden reveal aspect-[16/9]">
                  {getImageUrl(latest) && (
                    <Image src={getImageUrl(latest)} alt={getTitle(latest)} width={1200} height={675} className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="reveal" data-delay="150">
                  <div className="flex items-center mb-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(getCategory(latest))}`}>{getCategoryLabel(getCategory(latest))}</span>
                    <span className="ml-4 text-sm text-gray-500">{new Date(getPublishedAt(latest)).toLocaleDateString('id-ID')}</span>
                  </div>
                  <h2 className="text-3xl font-extrabold text-secondary mb-3">{getTitle(latest)}</h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">{getContentPreview(latest, 300)}</p>
                  <Link href={`/news/${getSlug(latest, latestId)}`} className="text-primary hover:text-primary-700 font-medium">Baca Selengkapnya →</Link>
                </div>
              </div>
            );
          })()}

          {newsArticles.length > 1 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
              {newsArticles.slice(1).map((article) => {
                const a = getAttrs(article);
                return (
                  <div key={article.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 border border-gray-100 reveal" data-delay="100">
                    {getImageUrl(a) && (
                      <div className="w-full bg-gray-100 rounded mb-4 overflow-hidden aspect-[16/9]">
                        <Image src={getImageUrl(a)} alt={getTitle(a)} width={1200} height={675} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex items-center mb-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(getCategory(a))}`}>{getCategoryLabel(getCategory(a))}</span>
                      {getIsFeatured(a) && (<span className="ml-2 inline-block px-2 py-1 rounded-full text-xs font-medium bg-primary text-white">Featured</span>)}
                    </div>
                    <h3 className="text-lg font-semibold text-secondary mb-3">{getTitle(a)}</h3>
                    <p className="text-gray-600 mb-4 text-sm">{getContentPreview(a, 140)}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{new Date(getPublishedAt(a)).toLocaleDateString('id-ID')}</span>
                      <Link href={`/news/${getSlug(a, article.id)}`} className="text-primary hover:text-primary-700 text-sm font-medium">Baca Selengkapnya →</Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="pb-20" />
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Dapatkan Update Terbaru</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">Berlangganan newsletter kami untuk mendapatkan berita dan promo terbaru</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input type="email" placeholder="Masukkan email Anda" className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white" />
            <button className="bg-white text-primary px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium">Berlangganan</button>
          </div>
        </div>
      </section>
    </div>
  );
}