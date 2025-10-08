import Link from 'next/link';
import { api } from '@/lib/api';

const STRAPI_BASE = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

const Footer = async () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'Tentang Kami', href: '/about' },
      { name: 'Tim', href: '/team' },
      { name: 'Karir', href: '/careers' },
      { name: 'Kontak', href: '/contact' },
    ],
    services: [
      { name: 'Travel', href: '/services?category=travel' },
      { name: 'Pulsa', href: '/services?category=pulsa' },
      { name: 'Pembayaran', href: '/services?category=payment' },
      { name: 'Promo', href: '/promotions' },
    ],
    support: [
      { name: 'Bantuan', href: '/contact' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Kebijakan Privasi', href: '/privacy' },
    ],
  };

  // Fetch global settings for footer logo
  let footerLogoUrl: string | null = null;
  try {
    const gs = await api.getGlobalSettings();
    const img = gs?.data?.footerLogo;
    if (img) {
      const url = img.url || img?.data?.attributes?.url;
      if (url) footerLogoUrl = url.startsWith('http') ? url : `${STRAPI_BASE}${url}`;
    }
  } catch (e) {
    // ignore
  }

  return (
    <footer className="bg-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              {footerLogoUrl ? (
                <img src={footerLogoUrl} alt="TravelPulsa" className="h-10 w-auto" />
              ) : (
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">T</span>
                </div>
              )}
              <span className="text-2xl font-bold">TravelPulsa</span>
            </div>
            <p className="text-gray-300 mb-4">
              Memudahkan semua transaksi digital Anda, mulai dari pulsa, PPOB, hingga voucher game dengan layanan terpercaya.
            </p>
            <div className="flex space-x-4">
              {/* Instagram */}
              <a href="https://www.instagram.com/travelpulsa.id/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-primary transition-colors duration-200">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm0 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H7zm5 3.5A5.5 5.5 0 1112 18.5 5.5 5.5 0 0112 7.5zm0 2A3.5 3.5 0 1015.5 13 3.5 3.5 0 0012 9.5zm5.75-2.75a1.25 1.25 0 11-1.25 1.25 1.25 1.25 0 011.25-1.25z"/>
                </svg>
              </a>
              {/* TikTok */}
              <a href="https://www.tiktok.com/@travelpulsa.id?lang=en" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-primary transition-colors duration-200">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.5 2h3.2c.3 2 1.7 3.8 3.7 4.4v3.2c-1.6-.1-3.1-.6-4.4-1.5v6.9a6.3 6.3 0 11-6.3-6.3c.3 0 .5 0 .8.1v3.4c-.2-.1-.5-.1-.8-.1a2.9 2.9 0 102.9 2.9V2z"/>
                </svg>
              </a>
              {/* Facebook */}
              <a href="https://www.facebook.com/travelpulsa.id" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-primary transition-colors duration-200">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12a10 10 0 10-11.6 9.9v-7h-2.7V12h2.7V9.7c0-2.7 1.6-4.2 4-4.2 1.2 0 2.5.2 2.5.2v2.7h-1.4c-1.4 0-1.8.9-1.8 1.8V12h3.1l-.5 2.9h-2.6v7A10 10 0 0022 12z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Perusahaan</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Layanan</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Dukungan</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-600 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © {currentYear} TravelPulsa. Semua hak dilindungi.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-300 hover:text-primary text-sm transition-colors duration-200">
                Kebijakan Privasi
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
