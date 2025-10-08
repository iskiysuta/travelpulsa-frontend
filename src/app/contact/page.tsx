'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Terima kasih! Pesan Anda telah dikirim.');
  };

  const contactInfo = [
    {
      icon: "📍",
      title: "Alamat Kantor",
      details: "GRAHA ZANTECH Jl. Padasuka Atas No.41 RT. 01/09. Ds. Cibeunying Kidul, Padasuka, Kec. Cimenyan, Kabupaten Bandung, Jawa Barat 40191"
    },
    {
      icon: "📞",
      title: "Telepon",
      details: "(022) 20504976"
    },
    {
      icon: "📧",
      title: "Email",
      details: "business@travelpulsa.id"
    },
    {
      icon: "🕒",
      title: "Jam Operasional kantor",
      details: "Senin - Sabtu: 08:00 - 17:00 WIB"
    },
    {
      icon: "🎧",
      title: "Layanan Customer Service 24/7",
      details: "Tersedia 24 jam setiap hari melalui channel dukungan kami"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-secondary mb-6 reveal">
              Hubungi <span className="text-primary">Kami</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto reveal" data-delay="150">
              Ada pertanyaan atau butuh bantuan? Tim kami siap membantu Anda
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="reveal">
              <h2 className="text-3xl font-bold text-secondary mb-8">
                Informasi Kontak
              </h2>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start reveal" data-delay={`${index * 100}`}>
                    <div className="text-3xl mr-4">{info.icon}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-secondary mb-2">{info.title}</h3>
                      <p className="text-gray-600">{info.details}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CS 24/7 Quick Channels */}
              <div className="mt-6 reveal" data-delay="300">
                <h3 className="text-lg font-semibold text-secondary mb-3">Channel Layanan 24/7</h3>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://wa.me/6282320401992"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 text-primary ring-1 ring-primary/20 hover:bg-primary/20 transition-colors"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12.04 2C6.59 2 2.2 6.39 2.2 11.84c0 2.01.57 3.89 1.57 5.49L2 22l4.83-1.53c1.55.85 3.33 1.34 5.21 1.34 5.45 0 9.84-4.39 9.84-9.84C21.88 6.39 17.49 2 12.04 2zm0 17.94c-1.64 0-3.17-.48-4.45-1.31l-.32-.2-2.86.91.94-2.78-.21-.33a8.06 8.06 0 01-1.32-4.49c0-4.46 3.63-8.09 8.09-8.09s8.09 3.63 8.09 8.09-3.63 8.2-8.09 8.2zm4.63-5.95c-.25-.13-1.46-.72-1.69-.8-.23-.09-.4-.13-.57.13-.17.25-.65.8-.8.96-.15.17-.3.19-.55.06-.25-.13-1.06-.39-2.02-1.24-.75-.67-1.25-1.5-1.4-1.75-.15-.25-.02-.38.11-.51.12-.12.25-.32.38-.48.13-.17.17-.29.26-.48.09-.19.04-.36-.02-.51-.06-.13-.57-1.37-.78-1.88-.2-.48-.4-.41-.57-.42l-.49-.01c-.17 0-.45.06-.69.32-.25.25-.91.89-.91 2.16 0 1.27.93 2.5 1.06 2.67.13.17 1.83 2.78 4.44 3.9.62.27 1.1.43 1.48.55.62.2 1.18.17 1.62.1.49-.07 1.46-.6 1.67-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.48-.29z"/>
                    </svg>
                    <span>WhatsApp : 082320401992</span>
                  </a>
                  <a
                    href="https://t.me/kcstp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-secondary ring-1 ring-gray-300 hover:bg-gray-100 transition-colors"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M9.036 15.28l-.377 5.31c.54 0 .775-.232 1.055-.51l2.53-2.425 5.245 3.84c.963.532 1.648.252 1.912-.89l3.463-16.23.001-.001c.307-1.432-.518-1.99-1.46-1.64L1.64 9.2c-1.41.548-1.39 1.335-.24 1.69l5.26 1.64 12.22-7.71c.575-.35 1.1-.156.67.19"/>
                    </svg>
                    <span>Telegram : @kcstp</span>
                  </a>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-8 reveal" data-delay="450">
                <h3 className="text-lg font-semibold text-secondary mb-4">Ikuti Kami</h3>
                <div className="flex space-x-4">
                  {/* Instagram */}
                  <a href="https://www.instagram.com/travelpulsa.id/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white hover:bg-primary-700 transition-colors duration-200">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm0 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H7zm5 3.5A5.5 5.5 0 1112 18.5 5.5 5.5 0 0112 7.5zm0 2A3.5 3.5 0 1015.5 13 3.5 3.5 0 0012 9.5zm5.75-2.75a1.25 1.25 0 11-1.25 1.25 1.25 1.25 0 011.25-1.25z"/>
                    </svg>
                  </a>
                  {/* TikTok */}
                  <a href="https://www.tiktok.com/@travelpulsa.id?lang=en" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white hover:bg-primary-700 transition-colors duration-200">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13.5 2h3.2c.3 2 1.7 3.8 3.7 4.4v3.2c-1.6-.1-3.1-.6-4.4-1.5v6.9a6.3 6.3 0 11-6.3-6.3c.3 0 .5 0 .8.1v3.4c-.2-.1-.5-.1-.8-.1a2.9 2.9 0 102.9 2.9V2z"/>
                    </svg>
                  </a>
                  {/* Facebook */}
                  <a href="https://www.facebook.com/travelpulsa.id" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white hover:bg-primary-700 transition-colors duration-200">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12a10 10 0 10-11.6 9.9v-7h-2.7V12h2.7V9.7c0-2.7 1.6-4.2 4-4.2 1.2 0 2.5.2 2.5.2v2.7h-1.4c-1.4 0-1.8.9-1.8 1.8V12h3.1l-.5 2.9h-2.6v7A10 10 0 0022 12z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="reveal" data-delay="200">
              <h2 className="text-3xl font-bold text-secondary mb-8">
                Kirim Pesan
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6 reveal" data-delay="300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Masukkan nama lengkap"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Masukkan email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Nomor Telepon
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Masukkan nomor telepon"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subjek *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Pilih subjek</option>
                      <option value="general">Pertanyaan Umum</option>
                      <option value="support">Bantuan Teknis</option>
                      <option value="billing">Pertanyaan Billing</option>
                      <option value="partnership">Kerjasama</option>
                      <option value="other">Lainnya</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Pesan *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Tuliskan pesan Anda di sini..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors duration-200 font-medium"
                >
                  Kirim Pesan
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section removed as requested */}
    </div>
  );
}
