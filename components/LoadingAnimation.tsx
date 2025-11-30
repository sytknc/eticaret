import React, { useState, useEffect } from 'react'

interface LoadingAnimationProps {
  onComplete: () => void
}

export default function LoadingAnimation({ onComplete }: LoadingAnimationProps) {
  const [progress, setProgress] = useState(0)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // İçeriği göster
    setShowContent(true)
    
    // Progress animasyonu - 5 saniye sürecek şekilde
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          // Animasyon tamamlandıktan sonra 500ms bekle
          setTimeout(() => {
            onComplete()
          }, 500)
          return 100
        }
        return prev + Math.random() * 8 + 3 // Daha yavaş artış (5 saniye için)
      })
    }, 150) // Daha yavaş interval

    return () => clearInterval(progressInterval)
  }, [onComplete])

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 z-50 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-6">
        {/* Logo Animasyonu */}
        <div className={`mb-8 transition-all duration-1000 ${showContent ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
          <div className="relative">
            {/* Ana Logo */}
            <div className="w-24 h-24 mx-auto mb-4 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full animate-pulse"></div>
              <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
            </div>
            
            {/* Etrafındaki Dönen Elementler */}
            <div className="absolute inset-0 animate-spin">
              <div className="w-32 h-32 mx-auto border-4 border-amber-200 border-t-amber-500 rounded-full"></div>
            </div>
            <div className="absolute inset-0 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '3s' }}>
              <div className="w-36 h-36 mx-auto border-2 border-orange-200 border-r-orange-400 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Slogan Animasyonu */}
        <div className={`mb-8 transition-all duration-1000 delay-300 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Toptan Baklava
            </span>
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-1">
            & Börek
          </h2>
          <p className="text-sm md:text-base text-gray-600 font-medium">
            İstanbul'un En Kaliteli Baklava ve Börek Evi
          </p>
        </div>

        {/* Progress Bar */}
        <div className={`mb-6 transition-all duration-1000 delay-500 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-2 font-medium">
            Yükleniyor... {Math.round(progress)}%
          </p>
        </div>

        {/* Alt Mesaj */}
        <div className={`transition-all duration-1000 delay-700 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-sm text-gray-500">
            Günlük taze üretim • 3.5kg tepsi boyutu
          </p>
          <p className="text-xs text-gray-400 mt-1">
            WhatsApp: +90 537 839 58 01
          </p>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Sol üst */}
          <div className="absolute top-10 left-10 w-4 h-4 bg-amber-300 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '2s' }}></div>
          <div className="absolute top-20 left-20 w-2 h-2 bg-orange-300 rounded-full animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '2.5s' }}></div>
          
          {/* Sağ üst */}
          <div className="absolute top-16 right-16 w-3 h-3 bg-yellow-300 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '3s' }}></div>
          <div className="absolute top-8 right-8 w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '2.2s' }}></div>
          
          {/* Sol alt */}
          <div className="absolute bottom-16 left-16 w-3 h-3 bg-orange-300 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '2.8s' }}></div>
          <div className="absolute bottom-8 left-8 w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '2.5s', animationDuration: '3.2s' }}></div>
          
          {/* Sağ alt */}
          <div className="absolute bottom-12 right-12 w-4 h-4 bg-amber-300 rounded-full animate-bounce" style={{ animationDelay: '3s', animationDuration: '2.5s' }}></div>
          <div className="absolute bottom-20 right-20 w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '3.5s', animationDuration: '2.8s' }}></div>
        </div>
      </div>
    </div>
  )
}
