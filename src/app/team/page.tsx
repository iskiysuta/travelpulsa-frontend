import { api } from '@/lib/api';
export const dynamic = 'force-dynamic';
export const revalidate = 0;
import Image from 'next/image';
import Link from 'next/link';

export default async function Team() {
  const res = await api.getTeamMembers();
  const teamMembers = Array.isArray(res?.data) ? res.data : [];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-secondary mb-6 reveal">
              Team <span className="text-primary">Travel Pulsa</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto reveal" data-delay="150">
              Team profesional yang berdedikasi untuk memberikan pengalaman terbaik bagi pelanggan
            </p>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              Kenali Team Kami
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Para profesional berpengalaman yang siap melayani Anda
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member: Record<string, unknown>) => {
              const m = (member.attributes as Record<string, unknown>) ?? member;
              const extractUrl = (media: unknown): string => {
                if (typeof media !== 'object' || media === null) return '';
                const anym = media as Record<string, unknown>;
                const urlCandidate = (anym.url as string) || (anym.data as any)?.attributes?.url;
                return typeof urlCandidate === 'string' ? urlCandidate : '';
              };
              const photoUrl = extractUrl((m as any).photo);
              const base = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
              const src = photoUrl ? (photoUrl.startsWith('http') ? photoUrl : base + photoUrl) : '';
              const name = String((m as any).name ?? '');
              const position = String((m as any).position ?? '');
              const bio = String((m as any).bio ?? '');
              const role = String((m as any).role ?? '');
              const linkedin = typeof (m as any).linkedin === 'string' ? (m as any).linkedin as string : '#';
              const twitter = typeof (m as any).twitter === 'string' ? (m as any).twitter as string : '#';
              const keyId = (member as any)?.id != null ? String((member as any).id) : (name || undefined);
              return (
              <div key={keyId} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 border border-gray-100 reveal" data-delay="100">
                <div className="text-center">
                  {/* Avatar */}
                  {src ? (
                    <Image src={src} alt={name} width={96} height={96} className="w-24 h-24 rounded-full object-cover mx-auto mb-6" />
                  ) : (
                    <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="text-white font-bold text-2xl">{name.split(' ').map((n:string)=>n[0]).join('')}</span>
                    </div>
                  )}
                  
                  {/* Info */}
                  <h3 className="text-xl font-bold text-secondary mb-2">{name}</h3>
                  <p className="text-primary font-medium mb-4">{position}</p>
                  <p className="text-gray-600 mb-6 text-sm leading-relaxed">{bio}</p>
                  
                  {/* Role Badge */}
                  <div className="mb-6">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      role === 'founder' ? 'bg-red-100 text-red-800' :
                      role === 'co-founder' ? 'bg-blue-100 text-blue-800' :
                      role === 'advisor' ? 'bg-purple-100 text-purple-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {role === 'founder' ? 'Founder' :
                       role === 'co-founder' ? 'Co-Founder' :
                       role === 'advisor' ? 'Advisor' : 'Team Member'}
                    </span>
                  </div>
                  
                  {/* Social Links */}
                  <div className="flex justify-center space-x-4">
                    <a href={linkedin} className="text-gray-400 hover:text-primary transition-colors duration-200">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                    <a href={twitter} className="text-gray-400 hover:text-primary transition-colors duration-200">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            )})}
          </div>
        </div>
      </section>

      {/* Join Team CTA */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4 reveal">
            Bergabung dengan Team Kami
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto reveal" data-delay="150">
            Kami selalu mencari talenta terbaik untuk bergabung dengan Team Travel Pulsa
          </p>
          <Link href="/careers" className="inline-block bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors duration-200 font-medium text-lg reveal" data-delay="250">
            Lihat Lowongan Kerja
          </Link>
        </div>
      </section>
    </div>
  );
}
