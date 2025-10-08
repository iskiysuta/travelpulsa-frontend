import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-28 group">
        {/* Modern gradient mesh + subtle grid background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_-10%_-10%,rgba(221,11,42,0.15),transparent),radial-gradient(800px_400px_at_110%_10%,rgba(48,48,48,0.08),transparent),radial-gradient(600px_300px_at_50%_120%,rgba(221,11,42,0.12),transparent)]" />
          {/* Hover boost red overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-30 transition-opacity duration-300 bg-[radial-gradient(900px_450px_at_50%_30%,rgba(221,11,42,0.5),transparent)]" />
          {/* Pulse orbs on hover */}
          <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="absolute left-[15%] top-[30%] w-24 h-24 rounded-full bg-[#dd0b2a]/40 animate-ping" />
            <span className="absolute left-[60%] top-[25%] w-16 h-16 rounded-full bg-[#dd0b2a]/50 animate-ping [animation-duration:2.2s]" />
            <span className="absolute left-[40%] top-[65%] w-20 h-20 rounded-full bg-[#dd0b2a]/40 animate-ping [animation-duration:1.8s]" />
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Card wrapper with drop shadow */}
          <div className="relative rounded-3xl shadow-[0_30px_120px_-30px_rgba(0,0,0,0.45)] ring-1 ring-black/5 overflow-hidden">
            {/* Diagonal edge lines removed as requested */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-6 md:px-12 py-10">
            <div>
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
                <span>All-in-one platform</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-secondary mb-6 reveal">
                Genggam Bisnismu Sekarang !
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-xl reveal" data-delay="150">
                Ambil Kendali Penuh atas Setiap Keputusan dan Masa Depan Keuntungan Usaha Anda dengan Travel Pulsa.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://play.google.com/store/apps/details?id=com.otoreport.travelpulsa&hl=id"
            target="_blank"
            rel="noopener noreferrer"
                  className="bg-primary text-white px-8 py-3 rounded-xl hover:bg-primary-700 transition-colors font-semibold"
                >
                  Download Sekarang
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
              <div className="relative bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                <div className="grid grid-cols-2 gap-4">
                  <Link href="/services/prices?src=https%3A%2F%2Ftravelpulsa.otoreport.com%2Fharga.js.php%3Fid%3D281b9e983e6ab87a86483e40b2b1b68ac7cfdeb39135e0587ae029a5ae2cbee4ff4019190b72b8c9be2a904fe3a3de22-210" className="group p-4 rounded-xl bg-gray-50 border border-transparent transition-colors hover:bg-primary/10 hover:border-primary">
                    <p className="text-sm text-gray-500">Top-Up</p>
                    <p className="text-xl font-bold text-secondary group-hover:text-primary">Game</p>
                  </Link>
                  <Link href="/services/prices?src=https%3A%2F%2Ftravelpulsa.otoreport.com%2Fharga.js.php%3Fid%3D714d11989ce0494d7bead6f3176a81b489401dab365516fead937d1b70577a4e590f252e0e2e58bc4c6fccec690e8f9a-209" className="group p-4 rounded-xl bg-gray-50 border border-transparent transition-colors hover:bg-primary/10 hover:border-primary">
                    <p className="text-sm text-gray-500">Top-up</p>
                    <p className="text-xl font-bold text-secondary group-hover:text-primary">Pulsa & Data</p>
                  </Link>
                  <Link href="/services/prices?src=https%3A%2F%2Ftravelpulsa.otoreport.com%2Fharga.js.php%3Fid%3D318cd6c8a93bf0a2d69da2daebc3a293a15305031dfac809d7e3c9571d2e36761eba0dc957948fffb74ccdbe95405396-211" className="group p-4 rounded-xl bg-gray-50 border border-transparent transition-colors hover:bg-primary/10 hover:border-primary">
                    <p className="text-sm text-gray-500">Top-Up</p>
                    <p className="text-xl font-bold text-secondary group-hover:text-primary">Emoney</p>
                  </Link>
                  <Link href="/services/prices?src=https%3A%2F%2Ftravelpulsa.otoreport.com%2Fharga.js.php%3Fid%3D9b62c285fe1221338d940dc159b080dc9a5127a644aea91f3f40bab565bfdf83c8494a5871de87db7e5f3f27a7275bbe-214" className="group p-4 rounded-xl bg-gray-50 border border-transparent transition-colors hover:bg-primary/10 hover:border-primary">
                    <p className="text-sm text-gray-500">Pembayaran</p>
                    <p className="text-xl font-bold text-secondary group-hover:text-primary">Tagihan</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              Mengapa Memilih Travel Pulsa?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Kami memberikan solusi terbaik untuk semua kebutuhan perjalanan dan komunikasi Anda
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group text-center p-6 rounded-lg transition duration-200 bg-primary text-white border border-transparent shadow-sm hover:shadow-xl hover:-translate-y-1 transform reveal" data-delay="100">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Harga Terbaik</h3>
              <p className="text-white/90">
                Dapatkan harga terbaik untuk semua layanan travel dan top-up pulsa dengan garansi harga termurah.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group text-center p-6 rounded-lg transition duration-200 bg-primary text-white border border-transparent shadow-sm hover:shadow-xl hover:-translate-y-1 transform reveal" data-delay="200">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Proses Cepat</h3>
              <p className="text-white/90">
                Transaksi cepat dan mudah dengan teknologi terdepan untuk pengalaman yang seamless.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group text-center p-6 rounded-lg transition duration-200 bg-primary text-white border border-transparent shadow-sm hover:shadow-xl hover:-translate-y-1 transform reveal" data-delay="300">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Terpercaya</h3>
              <p className="text-white/90">
                Platform terpercaya dengan jutaan pengguna puas dan sistem keamanan berlapis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              Layanan Kami
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Solusi lengkap untuk semua kebutuhan bisnis dan komunikasi Anda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Pulsa All Operator */}
            <Link href="/services/prices" className="group bg-white p-8 rounded-lg shadow-lg transition-colors duration-200 hover:bg-primary reveal" data-delay="100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4 group-hover:bg-white">
                  {/* Phone icon */}
                  <svg className="w-6 h-6 text-white group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 2.5h4A2.5 2.5 0 0116.5 5v14A2.5 2.5 0 0114 21.5h-4A2.5 2.5 0 017.5 19V5A2.5 2.5 0 0110 2.5zM9 17h6" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-secondary group-hover:text-white">Pulsa All Operator</h3>
              </div>
              <p className="text-gray-600 group-hover:text-white/90">Pulsa Regular dan Pulsa transfer Telkomsel, Indosat, XL, Tri, Smarfren semua ready</p>
            </Link>

            {/* Paket Data */}
            <Link href="/services/prices?src=https%3A%2F%2Ftravelpulsa.otoreport.com%2Fharga.js.php%3Fid%3D714d11989ce0494d7bead6f3176a81b489401dab365516fead937d1b70577a4e590f252e0e2e58bc4c6fccec690e8f9a-209" className="group bg-white p-8 rounded-lg shadow-lg transition-colors duration-200 hover:bg-primary reveal" data-delay="200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4 group-hover:bg-white">
                  {/* Wifi icon */}
                  <svg className="w-6 h-6 text-white group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.5 8.5a15 15 0 0119 0M5.5 11.5a10.5 10.5 0 0113 0M8.5 14.5a6 6 0 017 0M12 18.5h.01" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-secondary group-hover:text-white">Paket Data</h3>
              </div>
              <p className="text-gray-600 group-hover:text-white/90">Paket data atau kuota internet all operator dengan berbagai variasi produk tersedia</p>
            </Link>

            {/* Token Listrik */}
            <Link href="/services/prices?src=https%3A%2F%2Ftravelpulsa.otoreport.com%2Fharga.js.php%3Fid%3D0f7829687054b2345e2ba498b31111cf794118a90d77c16e332eb9492765b84f4b054b0c98e8d6bbcfc0639a0e1ce7c0-215" className="group bg-white p-8 rounded-lg shadow-lg transition-colors duration-200 hover:bg-primary reveal" data-delay="300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4 group-hover:bg-white">
                  <svg className="w-6 h-6 text-white group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-secondary group-hover:text-white">Token Listrik</h3>
              </div>
              <p className="text-gray-600 group-hover:text-white/90">Produk token listrik PLN dengan harga promo paling murah ada disini</p>
            </Link>

            {/* Topup E-Money */}
            <Link href="/services/prices?src=https%3A%2F%2Ftravelpulsa.otoreport.com%2Fharga.js.php%3Fid%3D318cd6c8a93bf0a2d69da2daebc3a293a15305031dfac809d7e3c9571d2e36761eba0dc957948fffb74ccdbe95405396-211" className="group bg-white p-8 rounded-lg shadow-lg transition-colors duration-200 hover:bg-primary reveal" data-delay="400">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4 group-hover:bg-white">
                  {/* Money icon */}
                  <svg className="w-6 h-6 text-white group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6c1.657 0 3 .895 3 2s-1.343 2-3 2-3 .895-3 2 1.343 2 3 2m0-10v10m-7 4h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-secondary group-hover:text-white">Topup E-Money</h3>
              </div>
              <p className="text-gray-600 group-hover:text-white/90">Isi Saldo OVO, Dana, LinkAja, Gopay, Grab, Shopeepay selalu ready</p>
            </Link>

            {/* Tagihan Bulanan */}
            <Link href="/services/prices?src=https%3A%2F%2Ftravelpulsa.otoreport.com%2Fharga.js.php%3Fid%3D9b62c285fe1221338d940dc159b080dc9a5127a644aea91f3f40bab565bfdf83c8494a5871de87db7e5f3f27a7275bbe-214" className="group bg-white p-8 rounded-lg shadow-lg transition-colors duration-200 hover:bg-primary reveal" data-delay="500">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4 group-hover:bg-white">
                  {/* Calendar with date icon */}
                  <svg className="w-6 h-6 text-white group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 3v3m10-3v3M4 8h16M5 8h14v11a2 2 0 01-2 2H7a2 2 0 01-2-2V8z" />
                    <rect x="8.5" y="12" width="3" height="3" rx="0.5" fill="currentColor" stroke="none" />
                    <rect x="12.5" y="12" width="3" height="3" rx="0.5" fill="currentColor" stroke="none" />
                    <rect x="8.5" y="16" width="3" height="3" rx="0.5" fill="currentColor" stroke="none" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-secondary group-hover:text-white">Tagihan Bulanan</h3>
              </div>
              <p className="text-gray-600 group-hover:text-white/90">Bisa bayar tagihan PLN, PDAM, BPJS, Telkom, dan berbagai pembayaran multifinance lainnya</p>
            </Link>

            {/* SMS & Telpon */}
            <Link href="/services/prices?src=https%3A%2F%2Ftravelpulsa.otoreport.com%2Fharga.js.php%3Fid%3D85a079d65e61df2557bd44071392dd7412c44630df85094ab83e72002460068633154a589b3f7ac3d8f1705c3015b945-212" className="group bg-white p-8 rounded-lg shadow-lg transition-colors duration-200 hover:bg-primary reveal" data-delay="600">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4 group-hover:bg-white">
                  <div className="flex items-center gap-1">
                    {/* Chat bubble */}
                    <svg className="w-5 h-5 text-white group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a8.5 8.5 0 01-8.5 8.5c-1.3 0-2.55-.25-3.69-.73L3 21l1.23-5.81A8.5 8.5 0 1121 12z" />
                    </svg>
                    {/* Phone */}
                    <svg className="w-5 h-5 text-white group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.5 7.5l3-3 4 4-2 2a12 12 0 006 6l2-2 4 4-3 3c-6.5 0-14-7.5-14-14z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-secondary group-hover:text-white">SMS & Telpon</h3>
              </div>
              <p className="text-gray-600 group-hover:text-white/90">Tersedia paket SMS & Nelpon untuk berkomunikasi dengan mudah dan hemat ke semua operator.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Siap Memulai Bisnis Anda?
          </h2>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Bergabunglah dengan jutaan pengguna yang telah mempercayai Travel Pulsa untuk semua kebutuhan digital dan komunikasi mereka.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://play.google.com/store/apps/details?id=com.otoreport.travelpulsa&hl=id"
              className="bg-[#303030] text-white px-8 py-3 rounded-lg hover:bg-[#262626] transition-colors duration-200 font-medium text-lg"
            >
              Download Sekarang
            </Link>
           
          </div>
        </div>
      </section>
    </div>
  );
}