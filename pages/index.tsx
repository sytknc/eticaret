import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import ProductList from '../components/ProductList'
import Testimonials from '../components/Testimonials'
import LoadingAnimation from '../components/LoadingAnimation'
import { useCart } from '../contexts/CartContext'

// Modern Hero Section
function HeroSection() {
  const { itemCount, totalAmount } = useCart()

  const handleWhatsAppClick = () => {
    if (typeof window !== 'undefined') {
      const message = "Merhaba. Ürünleriniz hakkında bilgi almak istiyorum."
      const whatsappUrl = `https://wa.me/905378395801?text=${encodeURIComponent(message)}`
      window.open(whatsappUrl, '_blank')
    }
  }

  const handlePhoneClick = () => {
    if (typeof window !== 'undefined') {
      window.location.href = 'tel:+905378395801'
    }
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(251,191,36,0.2),transparent_25%),radial-gradient(circle_at_80%_0%,rgba(248,113,113,0.16),transparent_25%),radial-gradient(circle_at_30%_80%,rgba(52,211,153,0.15),transparent_25%)]"></div>
      <div className="absolute inset-0 opacity-[0.07] mix-blend-multiply" aria-hidden>
        <div className="grid grid-cols-8 sm:grid-cols-12 gap-2 h-full">
          {Array.from({ length: 96 }).map((_, i) => (
            <div key={i} className="bg-amber-600 rounded-full"></div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center min-h-screen py-12 sm:py-16 lg:py-24 gap-10">
          {/* Left Content - Hero Text */}
          <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-white/70 backdrop-blur border border-amber-100 shadow-sm px-4 py-2 rounded-full text-amber-700 font-semibold text-sm">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <span>İstanbul içi aynı gün teslim • Kurumsal faturalı</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black text-gray-900 leading-tight">
              Toptan <span className="text-amber-600">Baklava</span> & <span className="text-orange-600">Börek</span> siparişiniz hazır
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              3.5 kg tepsilerde günlük taze üretim. Düğün, cenaze, mevlid ve ofis siparişleri için profesyonel teslimat. Sepetinizi doldurun, WhatsApp'tan onaylayalım.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={handleWhatsAppClick}
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-4 rounded-2xl font-black text-lg transition-all duration-300 transform hover:translate-y-[-2px] shadow-xl shadow-amber-200"
              >
                📱 WhatsApp'tan Sipariş Ver
              </button>
              <button
                onClick={() => {
                  if (window.location.pathname === '/') {
                    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
                  } else {
                    window.location.href = '/#products'
                  }
                }}
                className="border-2 border-amber-500 text-amber-700 hover:bg-amber-500 hover:text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300"
              >
                🛒 Ürünleri Gör
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-gray-700">
              {[{ label: 'Aynı gün teslim', icon: '🚚' }, { label: 'Isı kontrollü araç', icon: '❄️' }, { label: 'Vakum paketleme', icon: '🧊' }, { label: '4.9/5 müşteri puanı', icon: '⭐' }].map((item) => (
                <div key={item.label} className="flex items-center space-x-2 bg-white/70 backdrop-blur border border-amber-100 rounded-xl px-3 py-2 shadow-sm justify-center lg:justify-start">
                  <span>{item.icon}</span>
                  <span className="font-semibold text-gray-800">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Product Preview */}
          <div className="lg:w-1/2 w-full">
            <div className="bg-white/80 backdrop-blur border border-amber-100 rounded-3xl shadow-2xl shadow-amber-100/50 p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute -top-10 -right-6 w-40 h-40 bg-gradient-to-br from-amber-200/60 to-orange-200/40 rounded-full blur-3xl" aria-hidden></div>
              <div className="absolute -bottom-10 -left-6 w-44 h-44 bg-gradient-to-br from-emerald-200/50 to-cyan-200/30 rounded-full blur-3xl" aria-hidden></div>

              <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {[{ title: 'Cevizli Baklava', badge: '3.5 kg', price: '₺1.500', accent: 'from-amber-400 to-orange-500' }, { title: 'Peynirli Su Böreği', badge: '3.5 kg', price: '₺1.250', accent: 'from-green-400 to-emerald-500' }, { title: 'Fıstıklı Baklava', badge: 'Premium', price: '₺3.000', accent: 'from-purple-400 to-pink-500' }, { title: 'Adana Böreği', badge: 'Kaşarlı', price: '₺1.250', accent: 'from-orange-400 to-red-500' }].map((product, index) => (
                  <div
                    key={product.title}
                    className={`bg-white rounded-2xl p-4 sm:p-5 shadow-lg border border-amber-100 transform ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'} hover:rotate-0 transition-all duration-300 hover:shadow-2xl`}
                  >
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r ${product.accent} rounded-2xl flex items-center justify-center mb-3 text-2xl`}>🥧</div>
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-black text-gray-900 text-lg">{product.title}</h3>
                      <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-100">{product.badge}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">Günlük taze üretim, dilimli servis.</p>
                    <div className="text-amber-600 font-black text-xl">{product.price}</div>
                  </div>
                ))}
              </div>

              <div className="relative mt-6 p-4 bg-gray-900 text-white rounded-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-xl">
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-white/60 font-semibold">Sepet özeti</div>
                  <div className="text-lg font-black">{itemCount} ürün • {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(totalAmount)}</div>
                  <p className="text-sm text-white/70">Teslimat ilçesini ödeme sayfasında seçebilirsiniz.</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => window.location.assign('/cart')}
                    className="bg-white text-gray-900 px-4 py-2 rounded-xl font-bold text-sm shadow-lg"
                  >
                    Sepeti Aç
                  </button>
                  <button
                    onClick={handlePhoneClick}
                    className="px-4 py-2 rounded-xl border border-white/20 text-white font-semibold text-sm hover:bg-white/10"
                  >
                    📞 Hemen Ara
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Modern Features Section
function FeaturesSection() {
  const features = [
    {
      icon: "💒",
      title: "Düğün & Nişan",
      description: "Özel günleriniz için özel baklava ve börek tedariği",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: "🕊️",
      title: "Cenaze & Mevlid",
      description: "Cenaze ve mevlid organizasyonları için özel baklava ve börek tedariği",
      color: "from-gray-500 to-slate-500"
    },
    {
      icon: "🎉",
      title: "Sünnet",
      description: "Sünnet düğünleri için özel baklava ve börek tedariği",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: "🏢",
      title: "Ofis & Etkinlik",
      description: "Ofis ve etkinlik organizasyonları için özel baklava ve börek tedariği",
      color: "from-green-500 to-emerald-500"
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Hizmet Alanlarımız</span>
          </h2>
          <p className="text-gray-700 text-xl md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed">
            Düğün, nişan, sünnet, mevlid, cenaze ve ofis siparişleri için toplu çözümler
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg`}>
                <span className="text-3xl">{feature.icon}</span>
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-3 text-center tracking-wide">{feature.title}</h3>
              <p className="text-gray-700 text-lg text-center leading-relaxed font-medium">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}



// Modern CTA Section
function CTASection() {
  return (
    <section className="py-16 bg-gradient-to-r from-amber-600 via-yellow-500 to-orange-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 gap-2 h-full">
          {Array.from({ length: 120 }).map((_, i) => (
            <div key={i} className="bg-white transform rotate-45 rounded-sm"></div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center text-white">
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            Lezzeti Geciktirmeyin!
          </h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Sınırsız günlük baklava ve börek üretimi. Hemen sipariş verin!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                if (window.location.pathname === '/') {
                  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.location.href = '/#products';
                }
              }}
              className="group bg-white text-amber-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-amber-50 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              🥧 Ürünleri Gör
              <svg className="inline ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            <button
              onClick={() => {
                window.location.href = 'tel:+905378395801'
              }}
              className="group border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-amber-700 transition-all duration-300 transform hover:scale-105"
            >
              Ara
              <svg className="inline ml-2 w-5 h-5 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </button>
          </div>

          <div className="mt-8 flex items-center justify-center space-x-6 text-sm opacity-80">
            <div className="flex items-center">
              <span className="mr-2">⏰</span>
              <span>Aynı Gün Teslimat</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">✨</span>
              <span>%100 Taze</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Sayfa yüklendiğinde loading'i başlat
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 5000) // 5 saniye loading

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingAnimation onComplete={() => setIsLoading(false)} />
  }

  return (
    <Layout 
      title="Ana Sayfa"
      description="İstanbul'un en kaliteli toptan baklava ve börek evi. 3.5kg tepsi boyutunda günlük taze üretim. Düğün, cenaze, ofis siparişleri için profesyonel çözümler. Anadolu Yakası ₺300, Avrupa Yakası ₺500 teslimat. WhatsApp: +90 537 839 58 01"
      keywords="toptan baklava, toptan börek, baklava istanbul, börek istanbul, geleneksel baklava, tereyağlı börek, el yapımı baklava, taze börek, baklava siparişi, börek siparişi, istanbul baklava, günlük taze üretim, 3.5kg tepsi baklava, düğün baklava, cenaze baklava, ofis baklava, plaza baklava, toplu sipariş baklava, wholesale baklava, wholesale borek, baklava toptan satış, börek toptan satış, +90 537 839 58 01"
      url="https://toptanbaklavaborek.com"
      image="https://toptanbaklavaborek.com/images/og-image.jpg"
      type="website"
      canonical="https://toptanbaklavaborek.com"
    >
      {/* Fixed WhatsApp Button */}
      <div className="fixed bottom-48 right-4 z-50">
        <button
          onClick={() => {
            const message = "Merhaba. Ürünleriniz hakkında bilgi almak istiyorum."
            const whatsappUrl = `https://wa.me/905378395801?text=${encodeURIComponent(message)}`
            window.open(whatsappUrl, '_blank')
          }}
          className="group bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center animate-pulse"
        >
          <svg className="w-5 h-5 mr-2 transition-transform group-hover:rotate-12" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
          <span className="font-semibold text-sm">WhatsApp</span>
        </button>
      </div>
      
      <ProductList />
      <FeaturesSection />
      <CTASection />
      <Testimonials />
    </Layout>
  )
}
