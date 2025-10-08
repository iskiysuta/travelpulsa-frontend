import { api } from '@/lib/api';

export default async function HelpPage() {
  const res = await api.getHelpPage();
  const data = res?.data || {};
  const title = data?.title || 'Pusat Bantuan';
  const content = data?.content || '';
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-6">{title}</h1>
      <article className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}



