import { api } from '@/lib/api';

export default async function FAQPage() {
  const res = await api.getFaqs();
  const items = Array.isArray(res?.data) ? res.data : [];
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-8">FAQ</h1>
      <div className="space-y-4">
        {items.map((f: Record<string, unknown>) => {
          const attrs = (f.attributes as Record<string, unknown>) ?? f;
          return (
            <details key={f.id as string} className="group bg-white rounded-lg shadow overflow-hidden hover:bg-primary/5">
              <summary className="cursor-pointer list-none px-6 py-4 flex items-center justify-between hover:text-primary">
                <span className="text-base md:text-lg font-semibold text-secondary group-hover:text-primary">{attrs.question as string}</span>
                <span className="ml-4 text-primary transition-transform duration-200 group-open:rotate-180">▾</span>
              </summary>
              <div className="px-6 pb-6 text-gray-600 prose max-w-none" dangerouslySetInnerHTML={{ __html: attrs.answer as string }} />
            </details>
          );
        })}
      </div>
    </div>
  );
}


