import Link from 'next/link'
import { useState, useEffect } from 'react'

interface SimpleMobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function SimpleMobileMenu({ isOpen, onClose }: SimpleMobileMenuProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isOpen || !isClient) return null

  const handleNavigation = (url: string, isScroll = false) => {
    onClose()
    
    if (isScroll && window.location.pathname === '/') {
      requestAnimationFrame(() => {
        const element = document.getElementById('products')
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      })
    } else {
      requestAnimationFrame(() => {
        window.location.href = url
      })
    }
  }

  return (
    <div 
      className="md:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-[10002] transition-all duration-200"
      onClick={onClose}
      style={{ pointerEvents: 'auto' }}
    >
             <div 
         className="fixed top-0 right-0 h-full w-72 max-w-[80vw] sm:w-80 bg-gradient-to-b from-amber-50 to-orange-50 shadow-2xl z-[10003] transform transition-all duration-200 ease-out"
         onClick={(e) => e.stopPropagation()}
         style={{ pointerEvents: 'auto' }}
       >
                 {/* Header - Baklava Temalı */}
         <div className="bg-gradient-to-r from-amber-600 via-yellow-500 to-orange-500 p-4 sm:p-6 text-white relative overflow-hidden">
          {/* Baklava Pattern Background */}
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-6 gap-1 h-full">
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className="bg-white transform rotate-45 rounded-sm"></div>
              ))}
            </div>
          </div>
          
          <div className="flex items-center justify-between relative z-10">
                                   <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="relative">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/25 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg border border-white/30">
                  <img 
                    src="/favicon.png" 
                    alt="Toptan Baklava & Börek Logo" 
                    className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg"
                  />
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-white/20 rounded-2xl blur-sm -z-10"></div>
              </div>
              <div>
                <h3 className="font-black text-lg sm:text-xl tracking-tight">Toptan Baklava & Börek</h3>
                <p className="text-xs opacity-90 font-medium">Kaliteli Baklava ve Börek</p>
              </div>
            </div>
                         <button 
               onTouchEnd={(e) => {
                 e.preventDefault()
                 onClose()
               }}
               onClick={onClose}
               className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200 hover:rotate-90"
               style={{ touchAction: 'manipulation' }}
               aria-label="Menüyü kapat"
             >
               <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
               </svg>
             </button>
          </div>
        </div>

                 {/* Navigation - Börek & Baklava Temalı */}
         <div className="p-4 sm:p-6 space-y-2 sm:space-y-3">
                     {/* Ana Sayfa */}
           <div
             onTouchEnd={(e) => {
               e.preventDefault()
               handleNavigation('/')
             }}
             onClick={() => handleNavigation('/')}
             className="w-full text-left p-3 rounded-lg bg-white/80 border-2 border-amber-200 hover:border-amber-400 hover:bg-white active:bg-amber-50 transition-all duration-200 cursor-pointer group shadow-md hover:shadow-lg"
             style={{ userSelect: 'none', touchAction: 'manipulation' }}
           >
             <div className="flex items-center space-x-2">
                               <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-md">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                  </svg>
                </div>
               <div className="flex-1">
                 <div className="font-bold text-sm text-gray-800 group-hover:text-amber-700 transition-colors duration-200">Ana Sayfa</div>
                 <div className="text-xs text-gray-600">Lezzet yolculuğuna başla</div>
               </div>
             </div>
           </div>

                     {/* Ürünlerimiz */}
           <div
             onTouchEnd={(e) => {
               e.preventDefault()
               handleNavigation('/#products', true)
             }}
             onClick={() => handleNavigation('/#products', true)}
             className="w-full text-left p-3 rounded-lg bg-white/80 border-2 border-amber-200 hover:border-amber-400 hover:bg-white active:bg-amber-50 transition-all duration-200 cursor-pointer group shadow-md hover:shadow-lg"
             style={{ userSelect: 'none', touchAction: 'manipulation' }}
           >
             <div className="flex items-center space-x-2">
                               <div className="w-8 h-8 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-md p-1">
                  <img 
                    src="/favicon.png" 
                    alt="Baklava & Börek" 
                    className="w-5 h-5 rounded-full"
                  />
                </div>
               <div className="flex-1">
                 <div className="font-bold text-sm text-gray-800 group-hover:text-amber-700 transition-colors duration-200">Baklava & Börek</div>
                 <div className="text-xs text-gray-600">Taze el yapımı lezzetler</div>
               </div>
             </div>
           </div>

                     {/* Hakkımızda */}
           <div
             onTouchEnd={(e) => {
               e.preventDefault()
               handleNavigation('/about')
             }}
             onClick={() => handleNavigation('/about')}
             className="w-full text-left p-3 rounded-lg bg-white/80 border-2 border-amber-200 hover:border-amber-400 hover:bg-white active:bg-amber-50 transition-all duration-200 cursor-pointer group shadow-md hover:shadow-lg"
             style={{ userSelect: 'none', touchAction: 'manipulation' }}
           >
             <div className="flex items-center space-x-2">
                               <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-md">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                  </svg>
                </div>
               <div className="flex-1">
                 <div className="font-bold text-sm text-gray-800 group-hover:text-amber-700 transition-colors duration-200">Hakkımızda</div>
                 <div className="text-xs text-gray-600">Geleneksel lezzet yolculuğu</div>
               </div>
             </div>
           </div>

                     {/* İletişim */}
           <div
             onTouchEnd={(e) => {
               e.preventDefault()
               handleNavigation('/contact')
             }}
             onClick={() => handleNavigation('/contact')}
             className="w-full text-left p-3 rounded-lg bg-white/80 border-2 border-amber-200 hover:border-amber-400 hover:bg-white active:bg-amber-50 transition-all duration-200 cursor-pointer group shadow-md hover:shadow-lg"
             style={{ userSelect: 'none', touchAction: 'manipulation' }}
           >
             <div className="flex items-center space-x-2">
                               <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-md">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                </div>
               <div className="flex-1">
                 <div className="font-bold text-sm text-gray-800 group-hover:text-amber-700 transition-colors duration-200">İletişim</div>
                 <div className="text-xs text-gray-600">Sorularınız için buraya</div>
               </div>
             </div>
           </div>

                     {/* Blog */}
           <div
             onTouchEnd={(e) => {
               e.preventDefault()
               handleNavigation('/blog')
             }}
             onClick={() => handleNavigation('/blog')}
             className="w-full text-left p-3 rounded-lg bg-white/80 border-2 border-amber-200 hover:border-amber-400 hover:bg-white active:bg-amber-50 transition-all duration-200 cursor-pointer group shadow-md hover:shadow-lg"
             style={{ userSelect: 'none', touchAction: 'manipulation' }}
           >
             <div className="flex items-center space-x-2">
                               <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-md">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                  </svg>
                </div>
               <div className="flex-1">
                 <div className="font-bold text-sm text-gray-800 group-hover:text-amber-700 transition-colors duration-200">Blog</div>
                 <div className="text-xs text-gray-600">Tarifler ve lezzet hikayeleri</div>
               </div>
             </div>
           </div>

                                          {/* Özel Sipariş Butonu - Baklava Temalı */}
           <div className="pt-3 border-t-2 border-amber-200">
             <div
               onTouchEnd={(e) => {
                 e.preventDefault()
                 handleNavigation('/contact')
               }}
               onClick={() => handleNavigation('/contact')}
               className="w-full text-center p-4 rounded-lg bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 hover:from-amber-600 hover:via-yellow-600 hover:to-orange-600 active:from-amber-700 active:via-yellow-700 active:to-orange-700 transition-all duration-200 cursor-pointer text-white shadow-xl hover:shadow-2xl transform hover:scale-105 relative overflow-hidden"
               style={{ userSelect: 'none', touchAction: 'manipulation' }}
             >
              {/* Sparkle Animation */}
              <div className="absolute inset-0 opacity-20">
                <div className="animate-pulse">
                  <div className="absolute top-2 left-4 w-1 h-1 bg-white rounded-full"></div>
                  <div className="absolute top-6 right-6 w-1 h-1 bg-white rounded-full"></div>
                  <div className="absolute bottom-4 left-8 w-1 h-1 bg-white rounded-full"></div>
                  <div className="absolute bottom-2 right-4 w-1 h-1 bg-white rounded-full"></div>
                </div>
              </div>
              
                             <div className="relative z-10">
                                   <div className="flex items-center justify-center space-x-2 mb-1">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
                    </svg>
                    <span className="font-bold text-base">SİPARİŞ VER</span>
                  </div>
                 <div className="text-xs opacity-90 font-medium">Taze baklava & börek için</div>
               </div>
            </div>
          </div>

                     {/* Alt Bilgi */}
           <div className="pt-3 text-center">
            <div className="text-xs text-gray-500 space-y-1">
              <div className="flex items-center justify-center space-x-1">
                <span>🕐</span>
                <span>Günlük taze üretim</span>
              </div>
              <div className="flex items-center justify-center space-x-1">
                <span>🚚</span>
                <span>Hızlı teslimat</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
