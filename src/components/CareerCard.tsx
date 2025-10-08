"use client";

import Link from 'next/link';
import { CareerEntity, formatSalary, htmlToText } from '@/lib/career-api';

export default function CareerCard({ career }: { career: CareerEntity }) {
  const a: any = (career && (career as any).attributes) ? (career as any).attributes : {};
  const safeSlug = a?.slug && String(a.slug).length > 0 ? String(a.slug) : String(career?.id ?? '');
  const href = `/careers/${encodeURIComponent(safeSlug)}`;
  const dept = a?.department?.replace?.('-', ' ') || '-';
  const type = a?.employmentType?.replace?.('-', ' ') || '-';
  const loc = a?.location || '-';
  const salary = formatSalary(a?.salaryMin ?? undefined, a?.salaryMax ?? undefined, a?.currency || 'IDR');
  const short = a?.shortDescription || htmlToText(a?.description, 160) || '';
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate text-xl font-semibold text-secondary group-hover:text-primary transition-colors">
            <Link href={href}>{a?.title || 'Lowongan'}</Link>
          </h3>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full bg-indigo-50 px-3 py-1 font-medium text-indigo-700 ring-1 ring-indigo-100 capitalize">{dept}</span>
            <span className="rounded-full bg-emerald-50 px-3 py-1 font-medium text-emerald-700 ring-1 ring-emerald-100 capitalize">{type}</span>
            <span className="rounded-full bg-gray-50 px-3 py-1 font-medium text-gray-700 ring-1 ring-gray-100">{loc}</span>
          </div>
        </div>
        {typeof a?.priority === 'number' && a.priority > 7 ? (
          <span className="shrink-0 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800 ring-1 ring-amber-200">Featured</span>
        ) : null}
      </div>

      {/* Description */}
      {short ? (
        <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-gray-700">{short}</p>
      ) : null}

      {/* Meta */}
      <div className="mt-5 flex items-center justify-between">
        <div className="text-lg font-semibold text-secondary">{salary}</div>
        <Link
          href={href}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
        >
          Lihat Detail
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14"/>
            <path d="M12 5l7 7-7 7"/>
          </svg>
        </Link>
      </div>
    </div>
  );
}


