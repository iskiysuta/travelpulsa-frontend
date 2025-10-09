import PromotionCard from '@/components/PromotionCard';
import { promotionAPI } from '@/lib/promotion-api';
import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface ParamsPromise { params: Promise<{ slug: string }> }

export default async function PromotionDetail({ params }: ParamsPromise) {
  const { slug } = await params;

  // Fetch main promotion and related on the server to avoid CORS
  const [res, relatedRes] = await Promise.all([
    promotionAPI.getPromotionBySlug(slug, ['image', 'bannerImage']),
    promotionAPI.getFeaturedPromotions()
  ]);

  const promotion = res?.data as unknown as Record<string, unknown> | null;
  const related = Array.isArray(relatedRes?.data) ? relatedRes.data.slice(0, 5) : [];

  if (!promotion) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Promo tidak ditemukan</h1>
            <p className="text-gray-600 mb-8">Promo yang Anda cari tidak tersedia atau sudah tidak aktif.</p>
            <Link
              href="/promotions"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-700"
            >
              Kembali ke Semua Promo
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const attributes = promotion.attributes as Record<string, unknown>;

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="w-full bg-gray-100 rounded-lg overflow-hidden">
            {(promotionAPI.getAbsoluteMediaUrl(attributes.bannerImage as Record<string, unknown>) || promotionAPI.getAbsoluteMediaUrl(attributes.image as Record<string, unknown>)) && (
              <Image
                src={(promotionAPI.getAbsoluteMediaUrl(attributes.bannerImage as Record<string, unknown>) || promotionAPI.getAbsoluteMediaUrl(attributes.image as Record<string, unknown>)) as string}
                alt={(attributes.title as string) || 'Promo'}
                width={1200}
                height={600}
                className="w-full h-auto object-contain"
              />
            )}
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-8">
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="prose prose-slate max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                    {(attributes.content as string) || ''}
                  </ReactMarkdown>
                </div>
              </div>

              {attributes.termsAndConditions && (
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-secondary mb-4">Syarat & Ketentuan</h3>
                  <div className="prose prose-slate max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                      {(attributes.termsAndConditions as string) || ''}
                    </ReactMarkdown>
                  </div>
                </div>
              )}
            </div>

            <aside className="lg:col-span-1 space-y-6">
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-secondary mb-4">Promo Lainnya</h3>
                <div className="space-y-4">
                  {related.map((p: Record<string, unknown>) => (
                    <Link key={p.id as number} href={`/promotions/${(p.attributes as Record<string, unknown>)?.slug || p.id}`} className="flex items-center gap-3 group">
                      <div className="w-12 h-12 rounded bg-gray-100 overflow-hidden">
                        {promotionAPI.getAbsoluteMediaUrl((p.attributes as Record<string, unknown>)?.image as Record<string, unknown>) && (
                          <Image src={promotionAPI.getAbsoluteMediaUrl((p.attributes as Record<string, unknown>)?.image as Record<string, unknown>) as string} alt={((p.attributes as Record<string, unknown>)?.title as string) || 'Promo'} width={48} height={48} className="w-full h-full object-cover" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-secondary group-hover:text-primary line-clamp-2">{(p.attributes as Record<string, unknown>)?.title as string}</p>
                        <p className="text-xs text-gray-500">{new Date(((p.attributes as Record<string, unknown>)?.createdAt as string) || '').toLocaleDateString('id-ID')}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-secondary mb-4">Detail Promo</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between"><span className="text-gray-500">Kategori</span><span className="text-gray-900">{promotionAPI.getCategoryDisplayName(attributes.category as string)}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Jenis Diskon</span><span className="text-gray-900">{(attributes.discountType as string) === 'percentage' ? 'Persentase' : (attributes.discountType as string) === 'fixed-amount' ? 'Nominal Tetap' : (attributes.discountType as string) === 'free-shipping' ? 'Gratis Ongkir' : (attributes.discountType as string) === 'bonus-item' ? 'Bonus Item' : '-'}</span></div>
                  {attributes.minimumPurchase ? (<div className="flex justify-between"><span className="text-gray-500">Minimum Pembelian</span><span className="text-gray-900">Rp {(attributes.minimumPurchase as number).toLocaleString('id-ID')}</span></div>) : null}
                  {attributes.maximumDiscount ? (<div className="flex justify-between"><span className="text-gray-500">Maksimal Diskon</span><span className="text-gray-900">Rp {(attributes.maximumDiscount as number).toLocaleString('id-ID')}</span></div>) : null}
                  <div className="flex justify-between"><span className="text-gray-500">Target Pengguna</span><span className="text-gray-900">{(attributes.targetAudience as string) === 'all-users' ? 'Semua Pengguna' : (attributes.targetAudience as string) === 'new-users' ? 'Pengguna Baru' : (attributes.targetAudience as string) === 'existing-users' ? 'Pengguna Existing' : (attributes.targetAudience as string) === 'vip-users' ? 'Pengguna VIP' : '-'}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Mulai</span><span className="text-gray-900">{new Date(attributes.startDate as string).toLocaleDateString('id-ID',{year:'numeric',month:'long',day:'numeric'})}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Berakhir</span><span className="text-gray-900">{new Date(attributes.endDate as string).toLocaleDateString('id-ID',{year:'numeric',month:'long',day:'numeric'})}</span></div>
                </div>
                <div className="mt-4 text-center">
                  <Link href="/promotions" className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    Kembali ke Semua Promo
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
