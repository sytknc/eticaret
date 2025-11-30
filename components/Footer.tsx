import React from 'react'
import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white overflow-hidden">
      {/* Professional Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f59e0b' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-gradient-to-br from-amber-500/5 to-orange-500/5 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-gradient-to-br from-green-500/5 to-emerald-500/5 rounded-full blur-xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Professional Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-4 mb-8">
              <div className="flex-shrink-0">
                <img 
                  src="/images/icon-192x192.png" 
                  alt="Toptan Baklava & Börek Logo" 
                  className="w-14 h-14 object-contain"
                />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white leading-tight">
                  Toptan Baklava & Börek
                </h3>
                <p className="text-amber-300 text-sm font-semibold tracking-wide uppercase mt-1">Profesyonel Tedarikçi</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-8 leading-relaxed max-w-lg font-medium text-lg tracking-wide">
              Günlük taze baklava ve börek üretimi. Düğün, cenaze, ofis siparişleriniz için profesyonel çözümler.
            </p>

            {/* Professional Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-sm font-semibold tracking-wide uppercase">Telefon</p>
                  <a href="tel:+905378395801" className="text-white font-black text-lg hover:text-amber-400 transition-colors">
                    +90 537 839 58 01
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.886 3.488"/>
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-sm font-semibold tracking-wide uppercase">WhatsApp</p>
                  <a href="https://wa.me/905378395801?text=Merhaba.%20Ürünleriniz%20hakkında%20bilgi%20almak%20istiyorum." className="text-white font-black text-lg hover:text-green-400 transition-colors">
                    Hemen Mesaj Gönder
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-amber-400 mb-6 tracking-wide uppercase">
              Hızlı Linkler
            </h4>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="text-gray-300 hover:text-amber-400 transition-colors font-medium text-base">
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-amber-400 transition-colors font-medium text-base">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-amber-400 transition-colors font-medium text-base">
                  İletişim
                </Link>
              </li>
              <li>
                <Link href="#products" className="text-gray-300 hover:text-amber-400 transition-colors font-medium text-base">
                  Ürünlerimiz
                </Link>
              </li>
            </ul>
          </div>

          {/* Professional Services */}
          <div>
            <h4 className="text-lg font-bold text-amber-400 mb-6 tracking-wide uppercase">
              Hizmetlerimiz
            </h4>
            <ul className="space-y-4">
              <li>
                <span className="text-gray-300 font-medium text-base">Düğün & Nişan</span>
              </li>
              <li>
                <span className="text-gray-300 font-medium text-base">Cenaze & Mevlid</span>
              </li>
              <li>
                <span className="text-gray-300 font-medium text-base">Sünnet</span>
              </li>
              <li>
                <span className="text-gray-300 font-medium text-base">Ofis & Etkinlik</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Professional Bottom Bar */}
      <div className="relative border-t border-white/10 bg-black/30 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Copyright Section */}
            <div className="text-center lg:text-left">
              <p className="text-gray-400 text-sm font-medium tracking-wide">
                © {currentYear} Toptan Baklava & Börek. Tüm haklar saklıdır.
              </p>
            </div>
            
            {/* Legal Links Section */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center space-x-6">
                <Link href="/privacy" className="text-gray-400 hover:text-amber-400 transition-colors font-medium tracking-wide">
                  Gizlilik
                </Link>
                <Link href="/cookies" className="text-gray-400 hover:text-amber-400 transition-colors font-medium tracking-wide">
                  Çerezler
                </Link>
                <Link href="/refund-policy" className="text-gray-400 hover:text-amber-400 transition-colors font-medium tracking-wide">
                  İade
                </Link>
                <Link href="/security-policy" className="text-gray-400 hover:text-amber-400 transition-colors font-medium tracking-wide">
                  Güvenlik
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
