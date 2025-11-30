# 🥧 Baklava & Börek Lezzet Evi

İstanbul'un en kaliteli baklava ve börek evi için modern web sitesi. 3.5kg tepsi boyutunda günlük taze üretim, düğün, cenaze, ofis ve plaza siparişleri için profesyonel çözümler.

## 🚀 Özellikler

- **📱 Mobil Uyumlu**: Tüm cihazlarda mükemmel görünüm
- **⚡ Hızlı Yükleme**: Next.js ile optimize edilmiş performans
- **🛒 Sepet Sistemi**: WhatsApp entegrasyonlu sipariş sistemi
- **🎯 SEO Optimizasyonu**: İstanbul 39 ilçe için tam optimizasyon
- **📝 Blog Sistemi**: Tarif, kültür ve bilgi kategorileri
- **📞 İletişim**: WhatsApp, telefon ve sosyal medya entegrasyonu
- **🏢 Kurumsal**: Düğün, cenaze, mevlid, ofis siparişleri için özel çözümler
- **🗺️ İstanbul Kapsamı**: 39 ilçeye teslimat hizmeti

## 🛠️ Teknolojiler

- **Frontend**: Next.js 15.5.0, React 18, TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **SEO**: Structured Data, Open Graph, Twitter Cards
- **Performance**: Image optimization, lazy loading, caching
- **Deployment**: Vercel (önerilen)

## 📦 Kurulum

```bash
# Projeyi klonlayın
git clone https://github.com/hsyndgzl2834/baklavaveb-rekkk.git
cd baklava-borek-website

# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev

# Tarayıcıda açın
open http://localhost:3000
```

## 🏗️ Proje Yapısı

```
baklava-borek-website/
├── components/          # React bileşenleri
│   ├── Header.tsx      # Üst menü
│   ├── ProductCard.tsx # Ürün kartı
│   ├── SEO.tsx         # SEO bileşeni
│   └── ...
├── pages/              # Next.js sayfaları
│   ├── index.tsx       # Ana sayfa
│   ├── cart.tsx        # Sepet sayfası
│   └── api/            # API rotaları
├── public/             # Statik dosyalar
│   ├── images/         # Ürün görselleri
│   ├── sitemap.xml     # Site haritası
│   └── robots.txt      # Robot kuralları
├── styles/             # CSS dosyaları
├── contexts/           # React Context'leri
└── data/               # Veri dosyaları
```

## 🎨 Özelleştirme

### Ürün Ekleme
`data/products.json` dosyasını düzenleyerek yeni ürünler ekleyebilirsiniz:

```json
{
  "id": "6",
  "name": "Yeni Ürün",
  "description": "Ürün açıklaması",
  "price": 1000,
  "image": "/images/yeni-urun.jpg"
}
```

### SEO Ayarları
`components/SEO.tsx` dosyasında meta tag'leri özelleştirebilirsiniz.

### Renk Teması
`tailwind.config.js` dosyasında renk paletini değiştirebilirsiniz.

## 📱 Mobil Optimizasyon

- Responsive tasarım
- Touch-friendly butonlar
- Hızlı yükleme
- PWA desteği
- Offline çalışma

## 🔍 SEO Özellikleri

- **Structured Data**: Schema.org markup
- **Open Graph**: Facebook paylaşım optimizasyonu
- **Twitter Cards**: Twitter paylaşım optimizasyonu
- **Sitemap**: Otomatik site haritası
- **Robots.txt**: Arama motoru kuralları
- **Meta Tags**: Kapsamlı meta tag'ler
- **Canonical URLs**: Duplicate content önleme

## 📞 İletişim Bilgileri

- **Telefon**: +90 537 839 58 01
- **WhatsApp**: +90 537 839 58 01
- **Website**: https://toptanbaklavaborek.com
- **Email**: info@toptanbaklavaborek.com
- **Adres**: İstanbul, Türkiye

## 🚚 Teslimat Bilgileri

- **Anadolu Yakası**: ₺300
- **Avrupa Yakası**: ₺500
- **Teslimat Süresi**: Aynı gün
- **Minimum Sipariş**: Yok

## 💼 Kurumsal Hizmetler

- **Düğün Siparişleri**: Özel paketleme ve sunum
- **Nişan Organizasyonları**: Premium baklava paketleri
- **Cenaze Siparişleri**: 7/24 acil teslimat hizmeti
- **Mevlid Programları**: Dini organizasyonlar için özel indirim
- **Sünnet Düğünleri**: Aile organizasyonları
- **Ofis Siparişleri**: Toplu indirimler ve kurumsal faturalandırma
- **Plaza Siparişleri**: İş merkezleri için profesyonel catering
- **İstanbul 39 İlçe**: Kapsamlı teslimat ağı

## 🛠️ Geliştirme

### Scripts

```bash
# Geliştirme
npm run dev

# Production build
npm run build

# Production start
npm start

# Lint
npm run lint

# Type check
npm run type-check
```

### Environment Variables

```env
NEXT_PUBLIC_SITE_URL=https://toptanbaklavaborek.com
NEXT_PUBLIC_PHONE=+905378395801
NEXT_PUBLIC_WHATSAPP=+905378395801
```

## 📊 Performans

- **Lighthouse Score**: 95+
- **Core Web Vitals**: Yeşil
- **PageSpeed Insights**: 90+
- **Mobile Performance**: Optimize edilmiş

## 🔒 Güvenlik

- HTTPS zorunlu
- CSP (Content Security Policy)
- XSS koruması
- CSRF koruması
- Rate limiting

## 📈 Analytics

- Google Analytics 4
- Google Search Console
- Yandex Metrica
- Hotjar (opsiyonel)

## 🚀 Deployment

### Vercel (Önerilen)

```bash
# Vercel CLI kurulumu
npm i -g vercel

# Deploy
vercel

# Production deploy
vercel --prod
```

### Diğer Platformlar

- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Heroku

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakın.

## 🙏 Teşekkürler

- Next.js ekibi
- Tailwind CSS ekibi
- React ekibi
- Tüm katkıda bulunanlara

## 📞 Destek

Herhangi bir sorun yaşarsanız:

- **Email**: info@toptanbaklavaborek.com
- **WhatsApp**: +90 537 839 58 01
- **GitHub Issues**: [Issues sayfası](https://github.com/hsyndgzl2834/baklavaveb-rekkk/issues)

---

**Baklava & Börek Lezzet Evi** - İstanbul'un En Kaliteli Baklava ve Börek Evi 🥧✨

