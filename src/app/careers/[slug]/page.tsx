"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { CareerEntity, getCareerBySlug, getCareerById, formatSalary } from '@/lib/career-api';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

export default function CareerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = (params?.slug as string) || '';
  const [career, setCareer] = useState<CareerEntity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    if (!slug) return;
    setLoading(true);
    setError(null);
    getCareerBySlug(slug)
      .then(async (res) => {
        if (cancelled) return;
        let item = res?.data?.[0] || null;
        // Fallback by id if slug not found and slug is numeric
        if (!item && /^\d+$/.test(slug)) {
          try {
            const byId = await getCareerById(slug);
            if (byId) item = byId as CareerEntity;
          } catch {}
        }
        if (!item) setError('Posisi tidak ditemukan');
        setCareer(item);
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        setError((e as Error)?.message || 'Gagal memuat data');
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) return <div className="max-w-5xl mx-auto px-4 py-10">Memuat...</div>;
  if (error) return <div className="max-w-5xl mx-auto px-4 py-10 text-red-600">{error}</div>;
  if (!career) return <div className="max-w-5xl mx-auto px-4 py-10">Tidak ditemukan</div>;

  const a = career.attributes;

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-primary-50 to-white py-14">
        <div className="max-w-5xl mx-auto px-4">
          <button onClick={() => router.back()} className="text-sm text-primary hover:underline">← Kembali</button>
          <h1 className="mt-2 text-3xl md:text-4xl font-bold text-secondary">{a.title}</h1>
          <div className="mt-3 text-gray-700 text-sm flex flex-wrap items-center gap-2">
            <span className="capitalize">{a.department?.replace('-', ' ')}</span>
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-700 ring-1 ring-emerald-100 capitalize">{a.employmentType?.replace('-', ' ')}</span>
            <span className="rounded-full bg-gray-50 px-2.5 py-1 text-gray-700 ring-1 ring-gray-200">{a.location}</span>
            {a.isRemote ? <span className="rounded-full bg-green-50 px-2.5 py-1 text-green-700 ring-1 ring-green-200">Remote</span> : null}
          </div>
          <div className="mt-4 text-2xl font-semibold text-secondary">
            {formatSalary(a.salaryMin ?? undefined, a.salaryMax ?? undefined, a.currency || 'IDR')}
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-5xl mx-auto px-4">
          {/* Summary card */}
          {a.shortDescription ? (
            <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-gray-700">{a.shortDescription}</p>
            </div>
          ) : null}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              {a.description ? (
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-secondary mb-4">Deskripsi Pekerjaan</h3>
                  <div className="prose prose-slate max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                      {a.description}
                    </ReactMarkdown>
                  </div>
                </div>
              ) : null}

              {a.requirements ? (
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-secondary mb-4">Persyaratan</h3>
                  <div className="prose prose-slate max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                      {a.requirements}
                    </ReactMarkdown>
                  </div>
                </div>
              ) : null}

              {a.responsibilities ? (
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-secondary mb-4">Tanggung Jawab</h3>
                  <div className="prose prose-slate max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                      {a.responsibilities}
                    </ReactMarkdown>
                  </div>
                </div>
              ) : null}

              {a.benefits ? (
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-secondary mb-4">Benefit</h3>
                  <div className="prose prose-slate max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                      {a.benefits}
                    </ReactMarkdown>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-6">
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-secondary mb-4">Ringkasan</h3>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li><span className="text-gray-500">Departemen:</span> <span className="capitalize">{a.department?.replace('-', ' ') || '-'}</span></li>
                  <li><span className="text-gray-500">Tipe:</span> <span className="capitalize">{a.employmentType?.replace('-', ' ') || '-'}</span></li>
                  <li><span className="text-gray-500">Lokasi:</span> {a.location || '-'}</li>
                  <li><span className="text-gray-500">Mode:</span> {a.isRemote ? 'Remote' : 'Onsite/Hybrid'}</li>
                  <li><span className="text-gray-500">Gaji:</span> {formatSalary(a.salaryMin ?? undefined, a.salaryMax ?? undefined, a.currency || 'IDR')}</li>
                </ul>
                <div className="mt-6 flex flex-col gap-3">
                  {a.applicationLink ? (
                    <a href={a.applicationLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-700">
                      Lamar Sekarang
                    </a>
                  ) : null}
                  {a.applicationEmail ? (
                    <a href={`mailto:${a.applicationEmail}`} className="inline-flex items-center justify-center gap-2 rounded-full border border-primary px-5 py-2.5 text-sm font-semibold text-primary hover:bg-primary hover:text-white">
                      Email HR
                    </a>
                  ) : null}
                </div>
              </div>
            </aside>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {a.applicationLink ? (
              <a href={a.applicationLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-white hover:bg-primary-700">
                Lamar Sekarang
              </a>
            ) : null}
            {a.applicationEmail ? (
              <a href={`mailto:${a.applicationEmail}`} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary text-primary hover:bg-primary hover:text-white">
                Email HR
              </a>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}


