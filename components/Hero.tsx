import React from 'react'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-12 md:py-20 lg:py-28 overflow-hidden min-h-[80vh] lg:min-h-[90vh] flex items-center">
      {/* Baklava Pattern Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Geometric Baklava Patterns */}
        <div className="absolute top-10 left-10 w-32 h-32 transform rotate-45 opacity-5">
          <div className="grid grid-cols-4 gap-1 h-full">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="bg-amber-600 rounded-sm"></div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-20 right-20 w-40 h-40 transform -rotate-12 opacity-5">
          <div className="grid grid-cols-5 gap-1 h-full">
            {Array.from({ length: 25 }).map((_, i) => (
              <div key={i} className="bg-orange-600 rounded-sm"></div>
            ))}
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute -top-16 -right-16 w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-16 -left-16 w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-orange-200 to-yellow-200 rounded-full opacity-10 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-yellow-200 to-amber-200 rounded-full opacity-10 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Content with Professional Typography */}
          <div className="text-center lg:text-left mobile-text-scale">
            <div className="flex items-center justify-center lg:justify-start mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mr-4 shadow-lg">
                <span className="text-3xl">🥧</span>
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-amber-600 uppercase tracking-wider">Geleneksel Lezzet</div>
                <div className="text-xs text-gray-600">1950'den beri</div>
              </div>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-gray-900 leading-tight mb-4 lg:mb-6 tracking-tight">
              <span className="block">Lezzet Evi</span>
              <span className="block bg-gradient-to-r from-amber-600 via-yellow-500 to-orange-600 bg-clip-text text-transparent mt-2">
                Taze Baklava & Börek
              </span>
              <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-600 mt-2">
                Geleneksel Tatlar, Modern Lezzet
              </span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 mb-6 lg:mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
              🍯 <strong>Bal ile tatlandırılmış</strong>, tereyağında pişirilmiş geleneksel lezzetler.<br/>
              👨‍🍳 <strong>Usta ellerde hazırlanan</strong>, günlük taze üretim.<br/>
              🏠 <strong>Ailenizle paylaşacağınız</strong> unutulmaz tatlar.
            </p>

            {/* Bulk Sales CTA */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-4 mb-6 lg:mb-8">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">🏢</span>
                </div>
                <h3 className="text-lg font-black text-gray-900">Toplu Sipariş Avantajları</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center space-x-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="text-gray-700"><strong>%25 İndirim</strong> - 50+ adet siparişlerde</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="text-gray-700"><strong>Ücretsiz Teslimat</strong> - İstanbul içi</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="text-gray-700"><strong>Özel Paketleme</strong> - Kurumsal hediye</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="text-gray-700"><strong>Hızlı Üretim</strong> - Aynı gün teslimat</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center lg:justify-start">
              <button 
                onClick={() => {
                  if (window.location.pathname === '/') {
                    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.location.href = '/#products';
                  }
                }}
                className="group relative inline-flex items-center justify-center bg-gradient-to-r from-amber-600 via-yellow-500 to-orange-600 hover:from-amber-700 hover:via-yellow-600 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <span className="relative flex items-center">
                  🥧 Ürünleri İncele
                  <svg className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>
              
                             <button 
                 onClick={() => {
                   const message = "Merhaba! Toplu sipariş hakkında bilgi almak istiyorum. %25 indirim ve özel avantajlarınızı öğrenmek istiyorum."
                   const whatsappUrl = `https://wa.me/905378395801?text=${encodeURIComponent(message)}`
                   window.open(whatsappUrl, '_blank')
                 }}
                 className="group relative inline-flex items-center justify-center bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 hover:from-green-500 hover:via-emerald-500 hover:to-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl overflow-hidden border-2 border-green-500"
               >
                 <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                                   <span className="relative flex items-center">
                                                                                   🏢 Whatsapp Mesaj
                    <svg className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                  </span>
               </button>
              
                             <button 
                 onClick={() => {
                   window.location.href = 'tel:+905378395801'
                 }}
                 className="group inline-flex items-center justify-center border-2 border-amber-600 text-amber-700 hover:bg-amber-600 hover:text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
               >
                                                                       Ara
                 <svg className="ml-2 w-5 h-5 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                 </svg>
               </button>
            </div>

            {/* Enhanced Stats with Baklava Theme */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t-2 border-amber-200">
              <div className="text-center group">
                <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mx-auto mb-2 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">🏆</span>
                </div>
                <div className="text-2xl md:text-3xl font-black text-amber-700 tracking-tight">15+</div>
                <div className="text-sm text-gray-600 font-semibold tracking-wider">Yıllık Deneyim</div>
              </div>
              <div className="text-center group">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mx-auto mb-2 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">😋</span>
                </div>
                <div className="text-2xl md:text-3xl font-black text-amber-700 tracking-tight">500+</div>
                <div className="text-sm text-gray-600 font-semibold tracking-wider">Mutlu Müşteri</div>
              </div>
              <div className="text-center group">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto mb-2 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">🔥</span>
                </div>
                <div className="text-2xl md:text-3xl font-black text-amber-700 tracking-tight">100%</div>
                <div className="text-sm text-gray-600 font-semibold tracking-wider">Taze Üretim</div>
              </div>
            </div>
          </div>

          {/* Enhanced Visual with Baklava Design */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-white via-amber-50 to-orange-50 rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-all duration-500 border-4 border-amber-200">
              {/* Baklava Pattern Inside */}
              <div className="absolute top-4 right-4 w-8 h-8 grid grid-cols-2 gap-1 opacity-20">
                <div className="bg-amber-400 rounded-sm"></div>
                <div className="bg-orange-400 rounded-sm"></div>
                <div className="bg-yellow-400 rounded-sm"></div>
                <div className="bg-amber-400 rounded-sm"></div>
              </div>
              
              <div className="aspect-square bg-gradient-to-br from-amber-100 via-yellow-100 to-orange-100 rounded-xl flex items-center justify-center relative overflow-hidden">
                {/* Inner pattern */}
                <div className="absolute inset-4 grid grid-cols-8 gap-1 opacity-10">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div key={i} className="bg-amber-600 rounded-sm transform rotate-45"></div>
                  ))}
                </div>
                
                <div className="text-center relative z-10">
                  <div className="w-32 h-32 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-xl relative">
                    <span className="text-6xl">🥧</span>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full"></div>
                  </div>
                  <p className="text-gray-700 font-bold text-lg mb-2">Geleneksel Lezzet</p>
                  <p className="text-amber-600 font-semibold text-sm">Her Gün Taze Üretim</p>
                </div>
              </div>
            </div>
            
            {/* Enhanced Floating Elements */}
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-black text-lg animate-bounce shadow-lg">
              <div className="text-center">
                <div className="text-xs">İNDİRİM</div>
                <div className="text-lg">%15</div>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-r from-green-400 to-teal-500 rounded-full flex items-center justify-center text-white font-black animate-pulse shadow-lg">
              <div className="text-center">
                <div className="text-2xl mb-1">🌟</div>
                <div className="text-xs font-bold">TAZE</div>
              </div>
            </div>
            <div className="absolute top-1/2 -left-8 w-16 h-16 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center text-white font-black text-sm shadow-lg animate-pulse" style={{animationDelay: '1s'}}>
              <div className="text-center">
                <div className="text-lg">🍯</div>
                <div className="text-xs">BAL</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
