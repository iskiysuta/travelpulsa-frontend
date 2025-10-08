'use client';
import { useEffect } from 'react';

export default function About() {
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
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-secondary mb-6 reveal">
              Tentang <span className="text-primary">Travel Pulsa</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto reveal" data-delay="150">
              Platform terdepan untuk kebutuhan digital dengan harga terbaik dan pelayanan terpercaya.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story (modern with rose accents) */}
      <section className="py-20 bg-gradient-to-b from-white to-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="relative overflow-hidden rounded-xl border border-rose-100 bg-white p-8 shadow-sm ring-1 ring-rose-50 reveal">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-rose-500 via-rose-400 to-rose-500" />
              <span className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700 ring-1 ring-rose-200">About Us</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-secondary">
                About Us
              </h2>
              <br></br>
              <p className="text-lg text-gray-600 mb-6 text-pretty leading-relaxed reveal">
              Sejak didirikan pada tahun 2010 di bawah naungan PT Zan Digital Nusantara, Travel Pulsa telah berkembang menjadi platform agregator digital spesialis yang dipercaya di Indonesia. Kami berfokus pada penyediaan solusi Payment Point Online Bank (PPOB) dan portofolio produk digital yang komprehensif, mulai dari pulsa, paket data, pembayaran tagihan utilitas (PLN, PDAM), hingga layanan vertikal berorientasi margin tinggi seperti tiket travel dan pemesanan.
              </p>
              <p className="text-lg text-gray-600 mb-8 text-pretty leading-relaxed reveal" data-delay="150">
              Kami memahami bahwa bisnis PPOB menuntut stabilitas dan kecepatan transaksi. Karena itu, Travel Pulsa berinvestasi pada infrastruktur teknologi real-time dengan uptime maksimal 24/7, menjamin kelancaran transaksi mitra.
              </p>
              <p className="text-lg text-gray-600 mb-8 text-pretty leading-relaxed reveal" data-delay="300">
              Selain itu, kami berfokus pada keuntungan mitra melalui struktur harga kompetitif dan menguntungkan, membantu UMKM untuk berkembang dan memperoleh pendapatan optimal. Sebagai bagian dari PT Zan Digital Nusantara, kami menjunjung tinggi prinsip Amanah, kolaboratif, dan bertanggung jawab, demi menciptakan dampak positif nyata bagi komunitas UMKM Indonesia.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="rounded-lg border border-rose-100 bg-rose-50/40 p-6 text-center transition-transform duration-300 hover:-translate-y-1 reveal" data-delay="150">
                  <div className="text-3xl font-extrabold text-rose-600 mb-1">1M+</div>
                  <div className="text-gray-600 text-sm">Pengguna Aktif</div>
                </div>
                <div className="rounded-lg border border-rose-100 bg-rose-50/40 p-6 text-center transition-transform duration-300 hover:-translate-y-1 reveal" data-delay="250">
                  <div className="text-3xl font-extrabold text-rose-600 mb-1">50+</div>
                  <div className="text-gray-600 text-sm">Kota di Indonesia</div>
                </div>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden ring-1 ring-rose-100 bg-white reveal" data-delay="200">
              <img src="/images/app-mock.png" alt="Aplikasi TravelPulsa" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission (single column) */}
      <section className="py-20 bg-gradient-to-b from-white to-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 reveal">
            <span className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-1 text-sm font-semibold text-rose-700 ring-1 ring-rose-200">Tentang Kami</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-secondary">
              Visi & Misi <span className="text-rose-600">Travel Pulsa</span>
            </h2>
          </div>

          <div className="space-y-10">
            <div className="relative overflow-hidden rounded-xl border border-rose-100 bg-white p-8 shadow-sm ring-1 ring-rose-50 hover:shadow-md transition-shadow reveal">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-rose-500 via-rose-400 to-rose-500" />
              <h3 className="text-2xl font-bold text-secondary mb-4 flex items-center gap-2">
                <span className="inline-block h-8 w-8 rounded-md bg-rose-500 text-white grid place-items-center">V</span>
                Visi
              </h3>
              <p className="text-gray-700 text-lg text-justify">
                Menjadi platform layanan digital terbesar dan terdepan di Indonesia yang memberdayakan UMKM serta individu sebagai agen digital, melalui inovasi teknologi transaksi terkini sehingga tercipta ekosistem ekonomi digital yang inklusif, modern, dan tepercaya.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-xl border border-rose-100 bg-white p-8 shadow-sm ring-1 ring-rose-50 hover:shadow-md transition-shadow reveal" data-delay="150">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-rose-500 via-rose-400 to-rose-500" />
              <h3 className="text-2xl font-bold text-secondary mb-4 flex items-center gap-2">
                <span className="inline-block h-8 w-8 rounded-md bg-rose-500 text-white grid place-items-center">M</span>
                Misi
              </h3>
              <div className="space-y-5 text-gray-700 text-lg text-justify">
                <p>
                  <span className="font-semibold">Memberdayakan Pelaku Usaha & Individu:</span> Membuka peluang usaha seluas-luasnya bagi UMKM dan individu di seluruh Indonesia untuk menjadi agen digital yang sukses. Travel Pulsa menyediakan platform yang mudah digunakan serta dukungan edukasi dan komunitas, sehingga mitra dapat meningkatkan pendapatan sekaligus memajukan literasi digital di masyarakat.
                </p>
                <p>
                  <span className="font-semibold">Inovasi Teknologi Transaksi:</span> Mengembangkan teknologi transaksi digital yang aman, cepat, dan mutakhir. Kami terus berinovasi – dari integrasi fintech terbaru, fitur aplikasi yang user-friendly, hingga sistem otomatisasi – untuk memastikan setiap transaksi berjalan lancar dan meningkatkan pengalaman pengguna secara berkelanjutan.
                </p>
                <p>
                  <span className="font-semibold">Jangkauan B2B dan B2C Terpadu:</span> Memperkuat jaringan reseller (B2B) dengan menjalin kemitraan strategis bersama kios, konter pulsa, warung sembako, toko kelontong, pelaku UMKM, serta usaha mikro lainnya di seluruh Nusantara, sekaligus memperluas layanan langsung ke konsumen (B2C) untuk menghadirkan ekosistem transaksi digital yang terjangkau, cepat, dan saling memberdayakan.
                </p>
                <p>
                  <span className="font-semibold">Layanan Prima & Kompetitif:</span> Menyediakan pelayanan pelanggan 24/7 yang responsif dan ramah, didukung sistem transaksi andal serta harga produk yang kompetitif. Fokus kami adalah menjaga kepercayaan dan kepuasan mitra maupun konsumen dengan standar layanan tinggi – mulai dari kemudahan deposit saldo, keamanan data, hingga penyelesaian kendala secara cepat. Hal ini akan membangun loyalitas pengguna dan reputasi Travel Pulsa sebagai platform yang profesional dan terpercaya dibandingkan para pesaing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values (modern red accents) */}
      <section className="py-20 bg-gradient-to-b from-rose-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <span className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-1 text-sm font-semibold text-rose-700 ring-1 ring-rose-200">Nilai-Nilai Kami</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-secondary">Prinsip Utama Travel Pulsa</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 1. Integritas dan Keamanan Data */}
            <div className="relative overflow-hidden rounded-xl border border-rose-100 bg-white p-6 shadow-sm ring-1 ring-rose-50 transition-transform duration-300 hover:-translate-y-1 reveal" data-delay="300">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-rose-500 via-rose-400 to-rose-500" />
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-rose-100 text-rose-600 ring-1 ring-rose-200">
                {/* Shield icon */}
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <h3 className="text-xl font-semibold text-secondary">Integritas dan Keamanan Data</h3>
              <p className="text-sm text-gray-500 mb-3">(Menjaga Kepercayaan Melalui Keamanan Sistem)</p>
              <p className="text-gray-700 text-pretty leading-relaxed">
                Kepercayaan pelanggan adalah aset kami yang paling berharga. Oleh karena itu, kami menerapkan standar keamanan tertinggi dengan teknologi enkripsi mutakhir dan protokol keamanan berlapis untuk melindungi setiap data dan transaksi. Komitmen kami adalah menyediakan sebuah platform yang tidak hanya andal, tetapi juga sepenuhnya aman bagi setiap pengguna.
              </p>
            </div>

            {/* 2. Efisiensi dan Keandalan Proses */}
            <div className="relative overflow-hidden rounded-xl border border-rose-100 bg-white p-6 shadow-sm ring-1 ring-rose-50 transition-transform duration-300 hover:-translate-y-1 animate-fade-in-up">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-rose-500 via-rose-400 to-rose-500" />
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-rose-100 text-rose-600 ring-1 ring-rose-200">
                {/* Lightning icon */}
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              </div>
              <h3 className="text-xl font-semibold text-secondary">Efisiensi dan Keandalan Proses</h3>
              <p className="text-sm text-gray-500 mb-3">(Kecepatan Operasional untuk Kelancaran Aktivitas Anda)</p>
              <p className="text-gray-700 text-pretty leading-relaxed">
                Kami memahami bahwa dalam dunia digital yang dinamis, kecepatan dan keandalan adalah kunci. Infrastruktur teknologi kami dirancang untuk efisiensi maksimal, memastikan setiap proses mulai dari pemesanan hingga konfirmasi berjalan secara instan dan tanpa hambatan. Kami berdedikasi untuk memberikan layanan yang responsif dan dapat diandalkan setiap saat.
              </p>
            </div>

            {/* 3. Transparansi dan Nilai Kompetitif */}
            <div className="relative overflow-hidden rounded-xl border border-rose-100 bg-white p-6 shadow-sm ring-1 ring-rose-50 transition-transform duration-300 hover:-translate-y-1 animate-fade-in-up">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-rose-500 via-rose-400 to-rose-500" />
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-rose-100 text-rose-600 ring-1 ring-rose-200">
                {/* Tag/price icon */}
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7" y2="7"/></svg>
              </div>
              <h3 className="text-xl font-semibold text-secondary">Transparansi dan Nilai Kompetitif</h3>
              <p className="text-sm text-gray-500 mb-3">(Memberikan Nilai Terbaik dengan Harga yang Jujur)</p>
              <p className="text-gray-700 text-pretty leading-relaxed">
                Kami menjalankan bisnis dengan prinsip transparansi penuh. Kami berkomitmen untuk menawarkan struktur harga yang jujur dan kompetitif tanpa pernah mengorbankan kualitas layanan. Tujuan kami adalah memberikan nilai ekonomis terbaik bagi pelanggan, guna membangun kemitraan jangka panjang yang saling menguntungkan.
              </p>
            </div>
          </div>
        </div>
      </section>
    <style jsx>{`
      .reveal { opacity: 0; transform: translateY(14px); }
      .reveal-show { opacity: 1; transform: translateY(0); transition: opacity 600ms ease, transform 600ms ease; }
    `}</style>
    </div>
  );
}
