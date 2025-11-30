import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import ProductList from '../components/ProductList'
import Testimonials from '../components/Testimonials'
import LoadingAnimation from '../components/LoadingAnimation'

// Modern Hero Section
function HeroSection() {
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
    <section className="relative min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 gap-1 sm:gap-2 h-full">
          {Array.from({ length: 144 }).map((_, i) => (
            <div key={i} className="bg-amber-600 transform rotate-45 rounded-sm"></div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center min-h-screen py-12 sm:py-16 lg:py-20">
          {/* Left Content - Hero Text */}
          <div className="lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-gray-900 mb-6 leading-tight">
              İstanbul'un En Kaliteli{' '}
              <span className="text-amber-600">Toptan Baklava</span> ve Börek Evi
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              3.5 kg tepsi boyutunda günlük taze üretim. Düğün, cenaze, ofis siparişleri için profesyonel çözümler.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={handleWhatsAppClick}
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                📱 WhatsApp'tan Sipariş Ver
              </button>
              <button
                onClick={handlePhoneClick}
                className="border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105"
              >
                📞 Hemen Ara
              </button>
            </div>
            <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-gray-600">
              <div className="flex items-center">
                <span className="mr-2">🚚</span>
                <span>Aynı Gün Teslimat</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">🔥</span>
                <span>Günlük Taze Üretim</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">⭐</span>
                <span>4.9/5 Müşteri Puanı</span>
              </div>
            </div>
          </div>

          {/* Right Content - Product Preview */}
          <div className="lg:w-1/2 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-4 sm:space-y-6">
                <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-xl border border-amber-100 transform rotate-3 hover:rotate-0 transition-all duration-300 hover:shadow-2xl">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                    <span className="text-xl sm:text-2xl">🥧</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Cevizli Baklava</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">3.5 kg Tepsi</p>
                  <div className="text-amber-600 font-bold text-lg sm:text-xl">₺1.250</div>
                </div>
                
                <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-xl border border-amber-100 transform -rotate-2 hover:rotate-0 transition-all duration-300 hover:shadow-2xl">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                    <span className="text-xl sm:text-2xl">🥟</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Su Böreği</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">3.5 kg Peynirli</p>
                  <div className="text-green-600 font-bold text-lg sm:text-xl">₺1.250</div>
                </div>
              </div>
              
              <div className="space-y-4 sm:space-y-6 pt-4 sm:pt-8">
                <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-xl border border-amber-100 transform -rotate-3 hover:rotate-0 transition-all duration-300 hover:shadow-2xl">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                    <span className="text-xl sm:text-2xl">🌰</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Fıstıklı Baklava</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">3.5 kg Premium</p>
                  <div className="text-purple-600 font-bold text-lg sm:text-xl">₺2.250</div>
                </div>
                
                <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-xl border border-amber-100 transform rotate-2 hover:rotate-0 transition-all duration-300 hover:shadow-2xl">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                    <span className="text-xl sm:text-2xl">🥟</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Adana Böreği</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">3.5 kg Peynirli</p>
                  <div className="text-orange-600 font-bold text-lg sm:text-xl">₺1.250</div>
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
