export const dynamic = 'force-dynamic';
export const revalidate = 0;
const BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
import { api } from '@/lib/api';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeRaw from 'rehype-raw';
import Link from 'next/link';
import Image from 'next/image';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

interface ParamsPromise { params: Promise<{ slug: string }> }

type StrapiBlock = { 
  type?: string; 
  children?: Array<{ type?: string; text?: string } & Record<string, unknown>> 
} & Record<string, unknown>;

export default async function NewsDetail({ params }: ParamsPromise) {
  const { slug } = await params;

  const [res, recentRes] = await Promise.all([
    api.getNewsArticleByParam(slug),
    api.getNewsArticles()
  ]);

  const item = Array.isArray(res?.data) && res.data.length > 0 ? res.data[0] : null;
  const recent = Array.isArray(recentRes?.data) ? recentRes.data : [];

  if (!item) {
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-bold text-secondary">Artikel tidak ditemukan</h1>
        <p className="mt-2 text-gray-600">Periksa kembali tautan atau kembali ke halaman berita.</p>
      </div>
    );
  }

  const a = item.attributes ? item.attributes : item;
  const getImageUrl = () => {
    const img = a?.image;
    if (!img) return '';
    if (typeof img === 'object') {
      const url = img.url || img.data?.attributes?.url;
      if (!url) return '';
      return url.startsWith('http') ? url : `${BASE_URL}${url}`;
    }
    return '';
  };

  const contentBlocks: StrapiBlock[] | undefined = a.contentBlocks;
  const rawContent: string = a.content || '';
  const content = rawContent.replace(/\u00A0/g, ' ').replace(/\r\n?|\n/g, '\n');

  const isValidBlocks = Array.isArray(contentBlocks) && contentBlocks.length > 0 && contentBlocks.every((b) => {
    if (!b || typeof b !== 'object') return false;
    if (!Array.isArray(b.children)) return false;
    return b.children.every((c: any) => typeof c === 'object' && (typeof c.text === 'string' || Array.isArray((c as any).children) || typeof c.type === 'string'));
  });

  const getAttrs = (it: any) => (it?.attributes ? it.attributes : it || {});
  const currentSlug = a.slug || a.Slug || slug;
  const sidebarItems = recent
    .map(getAttrs)
    .filter((r: any) => (r.slug || r.Slug || '') !== currentSlug)
    .slice(0, 6);

  const getThumbUrl = (rec: any) => {
    const img = rec?.image;
    if (!img) return '';
    const url = img.url || img?.data?.attributes?.url;
    if (!url) return '';
    return url.startsWith('http') ? url : `${BASE_URL}${url}`;
  };

  const getCategory = (obj: any) => obj?.category || obj?.Category || '';
  const category = getCategory(a);

  return (
    <section className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <article className="md:col-span-2">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {getImageUrl() && (
              <div className="w-full h-64 md:h-80 overflow-hidden">
                <Image src={getImageUrl()} alt={(a.title || a.Title || 'Gambar') as string} width={1280} height={512} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                {category && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-50 text-secondary">{category}</span>
                )}
                <span className="text-sm text-gray-500">{new Date(a.publishedAt ?? Date.now()).toLocaleDateString('id-ID')}</span>
              </div>
              <h1 className="mb-3 text-3xl md:text-4xl font-extrabold tracking-tight text-secondary">
                {a.title || a.Title || 'Tanpa Judul'}
              </h1>
              {a.excerpt && <p className="text-gray-600 mb-6 text-lg">{a.excerpt}</p>}

              {isValidBlocks ? (
                <div className="prose prose-headings:text-secondary prose-p:text-gray-700 prose-strong:text-secondary prose-a:text-primary prose-p:text-justify prose-li:text-justify max-w-none">
                  <BlocksRenderer content={contentBlocks as any} />
                </div>
              ) : content ? (
                <div className="prose prose-headings:text-secondary prose-p:text-gray-700 prose-strong:text-secondary prose-a:text-primary prose-p:text-justify prose-li:text-justify max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]} rehypePlugins={[rehypeRaw]}>
                    {content}
                  </ReactMarkdown>
                </div>
              ) : (
                <p className="text-gray-600">Konten belum tersedia.</p>
              )}
            </div>
          </div>
        </article>

        <aside className="md:col-span-1">
          <div className="sticky top-24">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="px-5 py-4 bg-gradient-to-r from-red-50 to-white">
                <h2 className="text-sm font-semibold text-secondary">Berita Lainnya</h2>
              </div>
              <ul>
                {sidebarItems.length === 0 && (
                  <li className="px-5 py-4 text-sm text-gray-500">Tidak ada berita lain.</li>
                )}
                {sidebarItems.map((s: any, idx: number) => {
                  const title = s.title || s.Title || 'Tanpa Judul';
                  const slugVal = s.slug || s.Slug || (s.id ? String(s.id) : '#');
                  const date = s.publishedAt ? new Date(s.publishedAt).toLocaleDateString('id-ID') : '';
                  const thumb = getThumbUrl(s);
                  return (
                    <li key={`${slugVal}-${idx}`} className="group">
                      <Link href={`/news/${slugVal}`} className="flex items-center gap-4 px-5 py-4 transition-all hover:bg-gray-50">
                        {thumb ? (
                          <Image src={thumb} alt="thumb" width={56} height={56} className="w-14 h-14 rounded-lg object-cover" />
                        ) : (
                          <div className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">✦</div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-secondary transition-colors">{title}</p>
                          {date && <p className="mt-1 text-xs text-gray-500">{date}</p>}
                        </div>
                        <span className="text-gray-300 group-hover:text-secondary transition-transform group-hover:translate-x-0.5">→</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}


