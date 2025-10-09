'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { api } from '@/lib/api';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [siteName, setSiteName] = useState('TravelPulsa');
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    (async () => {
      try {
        const res = await api.getGlobalSettings();
        const data = res?.data || {};
        if (data?.siteName) setSiteName(data.siteName);
        const base = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
        const img = data?.logo;
        if (img) {
          const url = img.url || img?.data?.attributes?.url;
          if (url) setLogoUrl(url.startsWith('http') ? url : `${base}${url}`);
        }
      } catch {
        // ignore
      }
    })();
  }, []);

  const navigation = [
    { name: 'Beranda', href: '/' },
    { name: 'Tentang Kami', href: '/about' },
    { name: 'Layanan', href: '/services' },
    { name: 'Team', href: '/team' },
    { name: 'Berita', href: '/news' },
    { name: 'Program & Promo', href: '/promotions' },
    { name: 'Karir', href: '/careers' },
    { name: 'Kontak', href: '/contact' },
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center" aria-label={siteName}>
              {logoUrl ? (
                <Image src={logoUrl} alt={siteName} width={120} height={48} className="h-12 w-auto" />
              ) : (
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">T</span>
                </div>
              )}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 ml-6 flex-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`transition-colors duration-200 font-medium ${pathname === item.href ? 'text-primary' : 'text-secondary hover:text-primary'}`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex">
            <Link
              href="/contact"
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200 font-medium"
            >
              Hubungi Kami
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-secondary hover:text-primary transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`transition-colors duration-200 font-medium py-2 ${pathname === item.href ? 'text-primary' : 'text-secondary hover:text-primary'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/contact"
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200 font-medium text-center mt-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Hubungi Kami
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
