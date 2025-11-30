import React from 'react'
import Layout from '../components/Layout'

export default function Contact() {
  const handleWhatsAppClick = () => {
    const message = "Merhaba. Ürünleriniz hakkında bilgi almak istiyorum."
    const whatsappUrl = `https://wa.me/905378395801?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <Layout title="İletişim" description="Bizimle iletişime geçin - Baklava & Börek sipariş ve bilgi hattı">
      <div className="container mx-auto px-4 py-12">
        {/* Professional Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl mb-8 shadow-xl">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-8 tracking-tight">
            <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text text-transparent">
              İletişim
            </span>
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto rounded-full mb-8"></div>
                     <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium">
             Toptan baklava ve börek tedariği için bizimle iletişime geçin
           </p>
        </div>

        {/* Professional Contact Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
          {/* Phone */}
          <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:-translate-y-2 border border-white/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-bl-full"></div>
            <div className="relative z-10 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-200">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">Telefon</h3>
              <a href="tel:+905378395801" className="text-blue-600 font-black text-xl hover:text-blue-700 transition-colors duration-200 block mb-4">
                +90 537 839 58 01
              </a>
              <p className="text-gray-600 font-medium">7/24 Hizmet</p>
            </div>
          </div>

          {/* WhatsApp */}
          <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:-translate-y-2 border border-white/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-bl-full"></div>
            <div className="relative z-10 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-200">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.886 3.488"/>
                </svg>
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">WhatsApp</h3>
              <button 
                onClick={handleWhatsAppClick}
                className="text-green-600 font-black text-xl hover:text-green-700 transition-colors duration-200 block mb-4"
              >
                Mesaj Gönder
              </button>
              <p className="text-gray-600 font-medium">Anında Yanıt</p>
            </div>
          </div>

          {/* Email */}
          <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:-translate-y-2 border border-white/50 relative overflow-hidden md:col-span-2 lg:col-span-1">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-bl-full"></div>
            <div className="relative z-10 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-200">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">E-posta</h3>
              <a href="mailto:info@toptanbaklavaborek.com" className="text-amber-600 font-black text-lg hover:text-amber-700 transition-colors duration-200 block mb-4 break-all">
                info@toptanbaklavaborek.com
              </a>
              <p className="text-gray-600 font-medium">24 Saat İçinde Yanıt</p>
            </div>
          </div>
        </div>

        {/* Professional Address Section */}
        <div className="bg-gradient-to-br from-slate-50 via-amber-50 to-orange-50 rounded-3xl p-12 mb-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f59e0b' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
          </div>
          
          <div className="relative z-10">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl mb-6 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Adres</h2>
              <p className="text-xl text-gray-700 font-medium">İstanbul, Türkiye</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-black text-gray-900 mb-4">Çalışma Saatleri</h3>
                <div className="space-y-2 text-gray-700">
                  <div className="flex justify-between">
                    <span>Pazartesi - Cuma:</span>
                    <span className="font-semibold">08:00 - 20:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cumartesi:</span>
                    <span className="font-semibold">09:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pazar:</span>
                    <span className="font-semibold">10:00 - 16:00</span>
                  </div>
                  <div className="flex justify-between text-amber-600 font-bold">
                    <span>Acil Siparişler:</span>
                    <span>7/24</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-black text-gray-900 mb-4">Teslimat Bilgileri</h3>
                <div className="space-y-3 text-gray-700">
                  <div className="flex items-start space-x-3">
                    <span className="text-amber-600 text-xl">🚚</span>
                    <div>
                      <div className="font-semibold">Aynı Gün Teslimat</div>
                      <div className="text-sm">İstanbul içi siparişler</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-amber-600 text-xl">⏰</span>
                    <div>
                      <div className="font-semibold">Hızlı Teslimat</div>
                      <div className="text-sm">2-4 saat içinde</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-amber-600 text-xl">📦</span>
                    <div>
                      <div className="font-semibold">Özel Paketleme</div>
                      <div className="text-sm">Güvenli ve hijyenik</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-amber-600 via-yellow-500 to-orange-600 rounded-3xl p-12 text-center text-white shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-black mb-6">Hemen Sipariş Verin!</h2>
          <p className="text-xl mb-8 opacity-90">Taze baklava ve börek için hemen iletişime geçin</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleWhatsAppClick}
              className="bg-white text-amber-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-amber-50 transition-all duration-200 transform hover:scale-105"
            >
              📱 WhatsApp'tan Sipariş Ver
            </button>
            <button
              onClick={() => {
                window.location.href = 'tel:+905378395801'
              }}
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-amber-700 transition-all duration-200 transform hover:scale-105"
            >
              📞 Hemen Ara
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}
