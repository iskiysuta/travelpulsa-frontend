// Script untuk menambahkan field favicon ke global settings
// Jalankan di VPS setelah login ke Strapi admin

console.log(`
Langkah untuk menambahkan field favicon:

1. Login ke Strapi Admin: http://202.155.90.36:1337/admin
2. Pergi ke Content-Type Builder
3. Pilih "Global Setting" 
4. Klik "Add another field"
5. Pilih "Media" 
6. Field name: "favicon"
7. Klik "Finish"
8. Klik "Save"

Setelah itu, upload favicon di Global Settings:
1. Pergi ke Content Manager
2. Pilih "Global Setting"
3. Upload favicon (format: .ico, .png, .svg)
4. Save

Favicon akan otomatis tersedia di API: /api/global-setting?populate=*
`);


