"use client";
import { useEffect } from 'react';

export default function Services() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const elements = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = Number(el.dataset.delay || '0');
            setTimeout(() => el.classList.add('reveal-show'), delay);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );
    elements.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  const services = [
    {
      title: "Pulsa Semua Operator",
      description: "Top-up pulsa prabayar untuk Telkomsel, Indosat, XL, Tri, Smartfren, Axis.",
      icon: (
        <svg className="w-12 h-12 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="7" y="2.5" width="10" height="19" rx="2"/>
          <circle cx="12" cy="18" r="1.2" fill="currentColor" />
          <path d="M9 6.5h6M9 9.5h6M9 12.5h4"/>
        </svg>
      ),
      features: ["Semua Operator", "Proses Instan", "Harga Kompetitif", "24/7"],
      link: "/services/prices"
    },
    {
      title: "Paket Data/Internet",
      description: "Kuota internet harian, mingguan, bulanan, dan paket unlimited.",
      icon: (
        <svg className="w-12 h-12 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="9"/>
          <path d="M3 12h18"/>
          <path d="M12 3a15 15 0 010 18"/>
          <path d="M12 3a15 15 0 000 18"/>
        </svg>
      ),
      features: ["Beragam Paket", "Aktivasi Cepat", "Masa Aktif Panjang", "Jaringan Luas"],
      link: "/services/prices?src=https%3A%2F%2Ftravelpulsa.otoreport.com%2Fharga.js.php%3Fid%3D714d11989ce0494d7bead6f3176a81b489401dab365516fead937d1b70577a4e590f252e0e2e58bc4c6fccec690e8f9a-209"
    },
    {
      title: "Voucher Game",
      description: "Topup game dan platform digital: MLBB, Free Fire, Steam, PUBG, dll.",
      icon: (
        <svg className="w-12 h-12 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="8" width="18" height="8" rx="3"/>
          <path d="M9 10.5h-1.2a1.3 1.3 0 00-1.3 1.3V12m9-1.5h1.2a1.3 1.3 0 011.3 1.3V12"/>
          <path d="M11 11h2m-1-1v2"/>
          <circle cx="16.5" cy="12" r="1.2"/>
        </svg>
      ),
      features: ["Pilihan Lengkap", "Kode Voucher/ID", "Harga Grosir", "Legal/Official"],
      link: "/services/prices?src=https%3A%2F%2Ftravelpulsa.otoreport.com%2Fharga.js.php%3Fid%3D281b9e983e6ab87a86483e40b2b1b68ac7cfdeb39135e0587ae029a5ae2cbee4ff4019190b72b8c9be2a904fe3a3de22-210"
    },
    {
      title: "Saldo E-Money",
      description: "OVO, DANA, GoPay, ShopeePay, LinkAja, GrabPay dan lainnya.",
      icon: (
        <svg className="w-12 h-12 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 8.5h16a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-7a2 2 0 012-2h9"/>
          <path d="M16 8.5V7a2 2 0 00-2-2H8"/>
          <circle cx="17" cy="13.5" r="1.3"/>
        </svg>
      ),
      features: ["Instan", "Biaya Rendah", "Mitra Resmi", "Notifikasi Real-time"],
      link: "/services/prices?src=https%3A%2F%2Ftravelpulsa.otoreport.com%2Fharga.js.php%3Fid%3D318cd6c8a93bf0a2d69da2daebc3a293a15305031dfac809d7e3c9571d2e36761eba0dc957948fffb74ccdbe95405396-211"
    },
    {
      title: "Tagihan PPOB",
      description: "Bayar PLN, PDAM, Telkom, multifinance, TV Kabel, BPJS, dll.",
      icon: (
        <svg className="w-12 h-12 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M8 2.5h8v3.5H8z"/>
          <rect x="4" y="6" width="16" height="14" rx="2"/>
          <path d="M8 10h8M8 13.5h7M8 17h5"/>
        </svg>
      ),
      features: ["Produk Lengkap", "Riwayat Otomatis", "Struk Digital", "Terintegrasi"],
      link: "/services/prices?src=https%3A%2F%2Ftravelpulsa.otoreport.com%2Fharga.js.php%3Fid%3D9b62c285fe1221338d940dc159b080dc9a5127a644aea91f3f40bab565bfdf83c8494a5871de87db7e5f3f27a7275bbe-214"
    },
    {
      title: "SMS & Telpon",
      description: "Paket nelpon/SMS semua operator untuk komunikasi hemat.",
      icon: (
        <svg className="w-12 h-12 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 14a5 5 0 01-5 5h-1l-4 2v-2H8a5 5 0 01-5-5V8a5 5 0 015-5h8a5 5 0 015 5z"/>
          <path d="M7.5 11h5M7.5 13.5h3"/>
          <path d="M15.5 10.5l2 2-2 2"/>
        </svg>
      ),
      features: ["Pilihan Paket", "Masa Aktif Sesuai", "Sinyal Stabil", "Harga Ekonomis"],
      link: "/services/prices?src=https%3A%2F%2Ftravelpulsa.otoreport.com%2Fharga.js.php%3Fid%3D85a079d65e61df2557bd44071392dd7412c44630df85094ab83e72002460068633154a589b3f7ac3d8f1705c3015b945-212"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-secondary mb-6 reveal">
              Produk <span className="text-primary">Digital</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto reveal" data-delay="150">
              Solusi lengkap untuk kebutuhan pulsa, data, topup game, e‑wallet, dan pembayaran tagihan.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              Layanan Produk Digital
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Dari travel hingga komunikasi, kami hadir untuk memudahkan hidup Anda
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 border border-gray-100 reveal"
                data-delay={`${index * 100}`}
              >
                <div className="text-center mb-6">
                  <div className="mb-4 pt-2 flex items-center justify-center">{service.icon}</div>
                  <h3 className="text-2xl font-bold text-secondary mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                </div>
                
                <div className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <svg className="w-5 h-5 text-primary mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  {service.link ? (
                    <a href={service.link} className="w-full inline-flex justify-center bg-primary text-white px-4 py-3 rounded-lg hover:bg-primary-700 transition-colors duration-200 font-medium">
                      Pelajari Lebih Lanjut
                    </a>
                  ) : (
                    <button className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-700 transition-colors duration-200 font-medium">
                      Pelajari Lebih Lanjut
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .reveal { opacity: 0; transform: translateY(14px); }
        .reveal-show { opacity: 1; transform: translateY(0); transition: opacity 600ms ease, transform 600ms ease; }
      `}</style>

      {/* CTA Section - match home */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Siap Memulai Bisnis Anda?</h2>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Bergabunglah dengan jutaan pengguna yang telah mempercayai Travel Pulsa untuk semua kebutuhan digital dan komunikasi mereka.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://play.google.com/store/apps/details?id=com.otoreport.travelpulsa&hl=id"
              className="bg-[#303030] text-white px-8 py-3 rounded-lg hover:bg-[#262626] transition-colors duration-200 font-medium text-lg"
            >
              Download Sekarang
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
