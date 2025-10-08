'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import PromotionCard from '@/components/PromotionCard';
import PromotionLoading from '@/components/PromotionLoading';
import PromotionError from '@/components/PromotionError';
import { promotionAPI } from '@/lib/promotion-api';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

export default function PromotionDetail() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [state, setState] = useState<{ loading: boolean; error: string | null; promotion: any | null }>({ loading: true, error: null, promotion: null });
  const [related, setRelated] = useState<any[]>([]);

  async function load() {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const res = await promotionAPI.getPromotionBySlug(slug, ['image', 'bannerImage']);
      setState({ loading: false, error: null, promotion: res.data || null });
      // Load related promos (featured & active) like sidebar news list
      try {
        const rel = await promotionAPI.getFeaturedPromotions();
        setRelated(Array.isArray(rel?.data) ? rel.data.slice(0, 5) : []);
      } catch {}
    } catch (e: any) {
      setState({ loading: false, error: e?.message || 'Gagal memuat promo', promotion: null });
    }
  }

  useEffect(() => {
    load();
  }, [slug]);

  const handleUsePromo = (promotion: any) => {
    console.log('Using promo:', promotion.attributes.promoCode);
    // Implement redirect to app or show success modal
  };

  if (state.loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <PromotionLoading variant="card" count={1} />
        </div>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <PromotionError error={state.error} onRetry={load} />
        </div>
      </div>
    );
  }

  if (!state.promotion) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Promo tidak ditemukan</h1>
            <p className="text-gray-600 mb-8">Promo yang Anda cari tidak tersedia atau sudah tidak aktif.</p>
            <a
              href="/promotions"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-700"
            >
              Kembali ke Semua Promo
            </a>
          </div>
        </div>
      </div>
    );
  }

  const promotion = state.promotion;
  const { attributes } = promotion;
  const isActive = promotionAPI.isPromotionActive(promotion);
  const remainingDays = promotionAPI.getRemainingDays(promotion);
  const discountValue = promotionAPI.formatDiscountValue(promotion);
  const categoryName = promotionAPI.getCategoryDisplayName(attributes.category);
  const categoryColors = promotionAPI.getCategoryColorClasses(attributes.category);

  return (
    <div className="min-h-screen bg-white">
      {/* Top banner image like news detail */}
      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="w-full bg-gray-100 rounded-lg overflow-hidden">
            {(promotionAPI.getAbsoluteMediaUrl(attributes.bannerImage) || promotionAPI.getAbsoluteMediaUrl(attributes.image)) && (
              <img
                src={(promotionAPI.getAbsoluteMediaUrl(attributes.bannerImage) || promotionAPI.getAbsoluteMediaUrl(attributes.image)) as string}
                alt={attributes.title}
                className="w-full h-auto object-contain"
              />
            )}
          </div>
        </div>
      </section>

      {/* Main Content (like news: content + right sidebar list) */}
      <section className="py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Content */}
            <div className="lg:col-span-2 space-y-8">
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="prose prose-slate max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                    {attributes.content || ''}
                  </ReactMarkdown>
                </div>
              </div>

              {attributes.termsAndConditions && (
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-secondary mb-4">Syarat & Ketentuan</h3>
                  <div className="prose prose-slate max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                      {attributes.termsAndConditions || ''}
                    </ReactMarkdown>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar like news: related list + detail box */}
            <aside className="lg:col-span-1 space-y-6">
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-secondary mb-4">Promo Lainnya</h3>
                <div className="space-y-4">
                  {related.map((p) => (
                    <a key={p.id} href={`/promotions/${p.attributes?.slug || p.id}`} className="flex items-center gap-3 group">
                      <div className="w-12 h-12 rounded bg-gray-100 overflow-hidden">
                        {promotionAPI.getAbsoluteMediaUrl(p.attributes?.image) && (
                          <img src={promotionAPI.getAbsoluteMediaUrl(p.attributes?.image) as string} alt={p.attributes?.title} className="w-full h-full object-cover" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-secondary group-hover:text-primary line-clamp-2">{p.attributes?.title}</p>
                        <p className="text-xs text-gray-500">{new Date(p.attributes?.createdAt).toLocaleDateString('id-ID')}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-secondary mb-4">Detail Promo</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between"><span className="text-gray-500">Kategori</span><span className="text-gray-900">{categoryName}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Jenis Diskon</span><span className="text-gray-900">{attributes.discountType === 'percentage' ? 'Persentase' : attributes.discountType === 'fixed-amount' ? 'Nominal Tetap' : attributes.discountType === 'free-shipping' ? 'Gratis Ongkir' : attributes.discountType === 'bonus-item' ? 'Bonus Item' : '-'}</span></div>
                  {attributes.minimumPurchase ? (<div className="flex justify-between"><span className="text-gray-500">Minimum Pembelian</span><span className="text-gray-900">Rp {attributes.minimumPurchase.toLocaleString('id-ID')}</span></div>) : null}
                  {attributes.maximumDiscount ? (<div className="flex justify-between"><span className="text-gray-500">Maksimal Diskon</span><span className="text-gray-900">Rp {attributes.maximumDiscount.toLocaleString('id-ID')}</span></div>) : null}
                  <div className="flex justify-between"><span className="text-gray-500">Target Pengguna</span><span className="text-gray-900">{attributes.targetAudience === 'all-users' ? 'Semua Pengguna' : attributes.targetAudience === 'new-users' ? 'Pengguna Baru' : attributes.targetAudience === 'existing-users' ? 'Pengguna Existing' : attributes.targetAudience === 'vip-users' ? 'Pengguna VIP' : '-'}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Mulai</span><span className="text-gray-900">{new Date(attributes.startDate).toLocaleDateString('id-ID',{year:'numeric',month:'long',day:'numeric'})}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Berakhir</span><span className="text-gray-900">{new Date(attributes.endDate).toLocaleDateString('id-ID',{year:'numeric',month:'long',day:'numeric'})}</span></div>
                </div>
                <div className="mt-4 text-center">
                  <a href="/promotions" className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    Kembali ke Semua Promo
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
