"use client";

import { useEffect, useMemo, useState } from 'react';
import { CareerDepartment, CareersResponse, getCareers } from '@/lib/career-api';
import CareerCard from '@/components/CareerCard';

export default function CareersPage() {
  const [data, setData] = useState<CareersResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState<'all' | CareerDepartment>('all');
  const [page, setPage] = useState(1);

  const pageSize = 9;

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    getCareers({ page, pageSize, search: search || undefined, department, onlyActive: true })
      .then((res) => {
        if (cancelled) return;
        setData(res);
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        setError((e as Error)?.message || 'Gagal memuat lowongan');
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [page, pageSize, search, department]);

  const departments: Array<{ value: 'all' | CareerDepartment; label: string }> = useMemo(
    () => [
      { value: 'all', label: 'Semua Departemen' },
      { value: 'engineering', label: 'Engineering' },
      { value: 'product', label: 'Product' },
      { value: 'design', label: 'Design' },
      { value: 'marketing', label: 'Marketing' },
      { value: 'sales', label: 'Sales' },
      { value: 'operations', label: 'Operations' },
      { value: 'customer-support', label: 'Customer Support' },
      { value: 'finance', label: 'Finance' },
      { value: 'hr', label: 'HR' },
    ],
    []
  );

  const total = data?.meta?.pagination?.total || 0;
  const pageCount = data?.meta?.pagination?.pageCount || 1;

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-primary-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-secondary reveal-show">
            Karir di <span className="text-primary">Travel Pulsa</span>
          </h1>
          <p className="mt-5 max-w-3xl mx-auto text-lg text-gray-600 reveal-show" data-delay="150">
            Bergabunglah dengan tim kami untuk membangun layanan digital yang terbaik dan terpercaya.
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
            <div className="flex-1">
              <input
                value={search}
                onChange={(e) => {
                  setPage(1);
                  setSearch(e.target.value);
                }}
                placeholder="Cari posisi..."
                className="w-full md:w-80 px-4 py-2.5 rounded-full border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <select
                value={department}
                onChange={(e) => {
                  setPage(1);
                  setDepartment(e.target.value as 'all' | CareerDepartment);
                }}
                className="px-4 py-2.5 rounded-full border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {departments.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* List */}
          <div className="mt-8 reveal-show">
            {loading ? (
              <p className="text-gray-600">Memuat lowongan...</p>
            ) : error ? (
              <p className="text-red-600">{error}</p>
            ) : total === 0 ? (
              <p className="text-gray-600">Belum ada lowongan yang tersedia.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
                {data?.data?.map((c, idx) => (
                  <div key={c.id} className="reveal-show" data-delay={`${idx * 100}`}>
                    <CareerCard career={c} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pagination */}
          {pageCount > 1 ? (
            <div className="mt-8 flex items-center justify-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 rounded-full border border-gray-300 disabled:opacity-50"
              >
                Sebelumnya
              </button>
              <span className="text-sm text-gray-600">
                Halaman {page} dari {pageCount}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                disabled={page === pageCount}
                className="px-4 py-2 rounded-full border border-gray-300 disabled:opacity-50"
              >
                Berikutnya
              </button>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}

// Removed legacy mock component and duplicate default export
