import React, { useState, useEffect } from 'react'
import { useCart } from '../contexts/CartContext'
import { useRouter } from 'next/router'

export default function MobileBottomBar() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const { itemCount } = useCart()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const handleNavigation = (path: string, isScroll = false) => {
    console.log('Navigation clicked:', path) // Debug için
    if (isScroll && router.pathname === '/') {
      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      try {
        router.push(path)
      } catch (error) {
        console.error('Navigation error:', error)
        // Fallback olarak window.location kullan
        window.location.href = path
      }
    }
  }

  const handleWhatsApp = () => {
            const message = "Merhaba. Ürünleriniz hakkında bilgi almak istiyorum."
    const whatsappUrl = `https://wa.me/905378395801?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const handleCall = () => {
                    window.location.href = 'tel:+905378395801'
  }

  return (
    <div className={`md:hidden fixed inset-x-0 bottom-0 z-50 transition-all duration-200 ${
      isVisible ? 'translate-y-0' : 'translate-y-full'
    }`}>
      {/* Enhanced backdrop with baklava theme */}
      <div className="bg-gradient-to-t from-amber-50/95 via-white/95 to-white/90 backdrop-blur-xl border-t-2 border-amber-200/50 shadow-2xl">
        {/* Decorative top line with baklava pattern */}
        <div className="h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        </div>
        
                 <div className="px-2 py-2 safe-area-bottom">
          <div className="grid grid-cols-5 gap-1 max-w-md mx-auto">
            {/* Ana Sayfa */}
                         <button
               onClick={() => handleNavigation('/')}
               className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-100 ${
                 router.pathname === '/' 
                   ? 'bg-gradient-to-b from-amber-500 to-orange-500 text-white shadow-lg scale-105' 
                   : 'text-gray-600 hover:text-amber-600 hover:bg-amber-50 active:scale-95'
               }`}
             >
               <div className={`w-5 h-5 mb-1 ${router.pathname === '/' ? 'animate-pulse' : ''}`}>
                 <span className="text-lg">🏠</span>
               </div>
               <span className="text-xs font-semibold">Ana Sayfa</span>
             </button>

            {/* Ürünler */}
                         <button
               onClick={() => handleNavigation('/#products', true)}
               className="flex flex-col items-center justify-center p-2 rounded-xl text-gray-600 hover:text-amber-600 hover:bg-amber-50 transition-all duration-100 active:scale-95"
             >
               <div className="w-5 h-5 mb-1">
                 <span className="text-lg">🥧</span>
               </div>
               <span className="text-xs font-semibold">Ürünler</span>
             </button>

            {/* Sepet */}
                         <button
               onClick={() => handleNavigation('/cart')}
               className={`relative flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-100 touch-manipulation ${
                 router.pathname === '/cart'
                   ? 'bg-gradient-to-b from-amber-500 to-orange-500 text-white shadow-lg scale-105'
                   : 'text-gray-600 hover:text-amber-600 hover:bg-amber-50 active:scale-95'
               }`}
             >
               <div className="relative w-5 h-5 mb-1">
                 <span className="text-lg">🛒</span>
                 {itemCount > 0 && (
                   <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                     {itemCount > 9 ? '9+' : itemCount}
                   </div>
                 )}
               </div>
               <span className="text-xs font-semibold">Sepet</span>
             </button>

            {/* WhatsApp */}
                         <button
               onClick={handleWhatsApp}
               className="flex flex-col items-center justify-center p-2 rounded-xl text-gray-600 hover:text-green-600 hover:bg-green-50 transition-all duration-100 active:scale-95"
             >
               <div className="w-5 h-5 mb-1">
                 <span className="text-lg">💬</span>
               </div>
               <span className="text-xs font-semibold">WhatsApp</span>
             </button>

            {/* Ara */}
                         <button
               onClick={handleCall}
               className="flex flex-col items-center justify-center p-2 rounded-xl text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-100 active:scale-95"
             >
               <div className="w-5 h-5 mb-1">
                 <span className="text-lg">📞</span>
               </div>
               <span className="text-xs font-semibold">Ara</span>
             </button>
          </div>

                    {/* Ana CTA Butonları */}
          <div className="mt-2 px-2 space-y-2">
            {/* Birincil CTA - Hemen Sipariş Ver */}
            <button
              onClick={() => handleNavigation('/cart')}
              className="w-full bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 hover:from-amber-600 hover:via-yellow-600 hover:to-orange-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-150 transform hover:scale-105 active:scale-95"
            >
              <div className="flex items-center justify-center space-x-2">
                <span className="text-lg">🛒</span>
                <span>Hemen Sipariş Ver</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </button>
            
            
          </div>
        </div>
      </div>

      {/* Safe area bottom padding for iOS */}
      <div className="h-safe-area-inset-bottom bg-gradient-to-t from-amber-50/95 to-transparent"></div>
    </div>
  )
}
