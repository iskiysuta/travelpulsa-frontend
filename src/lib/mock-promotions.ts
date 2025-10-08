// Mock data for development when Strapi is not available
export const mockPromotions = [
  {
    id: 1,
    attributes: {
      title: "Cashback 50% untuk Booking Hotel",
      slug: "cashback-50-untuk-booking-hotel",
      description: "Dapatkan cashback hingga 50% untuk setiap booking hotel melalui Travel Pulsa. Promo berlaku untuk semua hotel partner dengan syarat dan ketentuan berlaku.",
      content: `
        <h2>Promo Cashback Hotel 50%</h2>
        <p>Nikmati cashback hingga 50% untuk setiap booking hotel melalui Travel Pulsa! Promo ini berlaku untuk semua hotel partner kami dengan berbagai keuntungan:</p>
        
        <h3>Keuntungan:</h3>
        <ul>
          <li>Cashback hingga 50% dari total booking</li>
          <li>Berlaku untuk semua hotel partner</li>
          <li>Booking minimal 2 malam</li>
          <li>Cashback masuk ke saldo dalam 1x24 jam</li>
        </ul>
        
        <h3>Cara Menggunakan:</h3>
        <ol>
          <li>Pilih hotel yang diinginkan</li>
          <li>Masukkan kode promo <strong>HOTEL50</strong></li>
          <li>Lakukan pembayaran</li>
          <li>Cashback otomatis masuk ke saldo</li>
        </ol>
      `,
      category: "discount" as const,
      promoCode: "HOTEL50",
      discountType: "percentage" as const,
      discountValue: 50,
      minimumPurchase: 500000,
      maximumDiscount: 1000000,
      startDate: new Date('2024-01-01T00:00:00.000Z').toISOString(),
      endDate: new Date('2024-02-29T23:59:59.000Z').toISOString(),
      isActive: true,
      isFeatured: true,
      priority: 10,
      termsAndConditions: `
        <h3>Syarat dan Ketentuan:</h3>
        <ul>
          <li>Promo berlaku untuk booking minimal 2 malam</li>
          <li>Cashback akan masuk ke saldo Travel Pulsa dalam 1x24 jam</li>
          <li>Tidak dapat digabungkan dengan promo lainnya</li>
          <li>Berlaku untuk semua hotel partner Travel Pulsa</li>
          <li>Maksimal cashback Rp 1.000.000 per transaksi</li>
        </ul>
      `,
      targetAudience: "all-users" as const,
      usageLimit: 1000,
      usedCount: 0,
      tags: ["hotel", "cashback", "travel", "discount"],
      isExternal: false,
      image: {
        data: {
          attributes: {
            url: "/images/hotel-promo.jpg",
            alternativeText: "Hotel Promotion"
          }
        }
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: new Date().toISOString()
    }
  },
  {
    id: 2,
    attributes: {
      title: "Top-up Pulsa Gratis Ongkos Kirim",
      slug: "top-up-pulsa-gratis-ongkos-kirim",
      description: "Top-up pulsa tanpa biaya admin untuk semua operator. Hemat lebih banyak dengan promo ini!",
      content: `
        <h2>Promo Top-up Pulsa Gratis Admin</h2>
        <p>Top-up pulsa tanpa biaya admin untuk semua operator! Hemat lebih banyak dengan promo ini yang berlaku untuk semua operator di Indonesia.</p>
        
        <h3>Keuntungan:</h3>
        <ul>
          <li>Tanpa biaya admin untuk semua operator</li>
          <li>Proses cepat dan aman</li>
          <li>Konfirmasi instan</li>
          <li>Berlaku untuk semua nominal</li>
        </ul>
      `,
      category: "general" as const,
      promoCode: "PULSAFREE",
      discountType: "fixed-amount" as const,
      discountValue: 0,
      minimumPurchase: 10000,
      startDate: new Date('2024-01-01T00:00:00.000Z').toISOString(),
      endDate: new Date('2024-02-15T23:59:59.000Z').toISOString(),
      isActive: true,
      isFeatured: true,
      priority: 9,
      termsAndConditions: `
        <h3>Syarat dan Ketentuan:</h3>
        <ul>
          <li>Promo berlaku untuk top-up minimal Rp 10.000</li>
          <li>Tidak ada biaya admin untuk semua operator</li>
          <li>Promo tidak dapat digabungkan dengan promo lainnya</li>
          <li>Berlaku untuk semua operator di Indonesia</li>
          <li>Proses top-up akan diproses dalam 1-5 menit</li>
        </ul>
      `,
      targetAudience: "all-users" as const,
      usageLimit: 5000,
      usedCount: 0,
      tags: ["pulsa", "gratis", "admin", "top-up"],
      isExternal: false,
      image: {
        data: {
          attributes: {
            url: "/images/pulsa-promo.jpg",
            alternativeText: "Pulsa Promotion"
          }
        }
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: new Date().toISOString()
    }
  },
  {
    id: 3,
    attributes: {
      title: "New User Bonus 20K",
      slug: "new-user-bonus-20k",
      description: "Bonus saldo 20K untuk pengguna baru Travel Pulsa. Daftar sekarang dan nikmati bonusnya!",
      content: `
        <h2>Bonus 20K untuk Pengguna Baru</h2>
        <p>Daftar sebagai pengguna baru Travel Pulsa dan dapatkan bonus saldo 20K! Bonus ini dapat digunakan untuk semua layanan Travel Pulsa.</p>
        
        <h3>Cara Mendapatkan Bonus:</h3>
        <ol>
          <li>Daftar akun baru di Travel Pulsa</li>
          <li>Verifikasi email Anda</li>
          <li>Bonus 20K otomatis masuk ke saldo</li>
          <li>Mulai transaksi dengan bonus saldo</li>
        </ol>
      `,
      category: "bonus" as const,
      promoCode: "NEWUSER20",
      discountType: "fixed-amount" as const,
      discountValue: 20000,
      startDate: new Date('2024-01-01T00:00:00.000Z').toISOString(),
      endDate: new Date('2024-03-31T23:59:59.000Z').toISOString(),
      isActive: true,
      isFeatured: true,
      priority: 8,
      termsAndConditions: `
        <h3>Syarat dan Ketentuan:</h3>
        <ul>
          <li>Bonus hanya berlaku untuk pengguna baru yang melakukan registrasi pertama kali</li>
          <li>Saldo bonus akan masuk otomatis setelah verifikasi email</li>
          <li>Saldo bonus tidak dapat ditarik tunai</li>
          <li>Berlaku untuk satu akun per nomor telepon</li>
          <li>Bonus harus digunakan dalam 30 hari setelah registrasi</li>
        </ul>
      `,
      targetAudience: "new-users" as const,
      usageLimit: 10000,
      usedCount: 0,
      tags: ["bonus", "new-user", "registrasi", "saldo"],
      isExternal: false,
      image: {
        data: {
          attributes: {
            url: "/images/new-user-promo.jpg",
            alternativeText: "New User Promotion"
          }
        }
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: new Date().toISOString()
    }
  }
];

export const mockPromotionsResponse = {
  data: mockPromotions,
  meta: {
    pagination: {
      page: 1,
      pageSize: 12,
      pageCount: 1,
      total: mockPromotions.length
    }
  }
};

export const mockFeaturedPromotions = {
  data: mockPromotions.filter(p => p.attributes.isFeatured),
  meta: {
    pagination: {
      page: 1,
      pageSize: 12,
      pageCount: 1,
      total: mockPromotions.filter(p => p.attributes.isFeatured).length
    }
  }
};
