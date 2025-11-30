import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

const SimpleMobileMenu = dynamic(() => import('./SimpleMobileMenu'), {
  ssr: false
})

export default function Header() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isClient, setIsClient] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      setScrolled(currentScrollY > 20)
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
        setOpen(false)
      } else if (currentScrollY < lastScrollY || currentScrollY <= 100) {
        setIsVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY, isClient])

  useEffect(() => {
    if (!isClient) return

    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node) && open) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside, { passive: true })
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open, isClient])

  const handleProductsClick = () => {
    if (!isClient) return
    
    if (window.location.pathname === '/') {
      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push('/#products');
    }
  }

  const handleOrderClick = () => {
    if (!isClient) return
    window.location.href = 'tel:+905378395801'
  }

  // Client-side rendering için
  if (!isClient) {
    return (
      <header className="sticky top-0 left-0 right-0 bg-white/95 backdrop-blur-lg shadow-lg z-[55]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 sm:h-16 py-2">
            {/* Logo */}
            <Link
              href="/"
              className="relative group"
              aria-label="Ana sayfa"
            >
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="relative">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg border-2 border-white/20">
                    <img 
                      src="/favicon.png" 
                      alt="Toptan Baklava & Börek Logo" 
                      className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg"
                    />
                  </div>
                </div>
                <div className="block">
                  <div className="text-lg sm:text-xl md:text-2xl font-black tracking-tight bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text text-transparent leading-none">
                    Toptan Baklava & Börek
                  </div>
                  <div className="text-xs font-semibold text-gray-600 -mt-0.5 tracking-wider uppercase">Kaliteli Baklava ve Börek</div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </header>
    )
  }

  return (
    <>
      <header 
        ref={headerRef}
        className={`sticky top-0 left-0 right-0 bg-white/95 backdrop-blur-lg shadow-lg transition-transform duration-200 ease-in-out z-[55] ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 sm:h-16 py-2">
            {/* Logo */}
            <Link
              href="/"
              className="relative group"
              aria-label="Ana sayfa"
            >
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="relative">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 border-2 border-white/20">
                    <img 
                      src="/favicon.png" 
                      alt="Toptan Baklava & Börek Logo" 
                      className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg"
                    />
                  </div>
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400/30 via-orange-500/30 to-amber-600/30 rounded-2xl blur-sm group-hover:blur-md transition-all duration-300 -z-10"></div>
                </div>
                <div className="block">
                  <div className="text-lg sm:text-xl md:text-2xl font-black tracking-tight bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text text-transparent leading-none">
                    Toptan Baklava & Börek
                  </div>
                  <div className="text-xs font-semibold text-gray-600 -mt-0.5 tracking-wider uppercase">Kaliteli Baklava ve Börek</div>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1 bg-gray-50/50 backdrop-blur-sm rounded-full px-2 py-1" aria-label="Ana gezinme">
              <button 
                onClick={handleProductsClick}
                className="px-5 py-2.5 text-gray-800 hover:text-amber-700 font-semibold text-sm tracking-wide transition-all duration-200 rounded-full hover:bg-white hover:shadow-md"
                title="Ürünler bölümüne git"
              >
                ÜRÜNLER
              </button>
              <Link 
                href="/about"
                className="px-5 py-2.5 text-gray-800 hover:text-amber-700 font-semibold text-sm tracking-wide transition-all duration-200 rounded-full hover:bg-white hover:shadow-md"
                title="Hakkımızda sayfasına git"
              >
                HAKKIMIZDA
              </Link>
              <Link 
                href="/contact"
                className="px-5 py-2.5 text-gray-800 hover:text-amber-700 font-semibold text-sm tracking-wide transition-all duration-200 rounded-full hover:bg-white hover:shadow-md"
                title="İletişim sayfasına git"
              >
                İLETİŞİM
              </Link>
              <Link 
                href="/blog"
                className="px-5 py-2.5 text-gray-800 hover:text-amber-700 font-semibold text-sm tracking-wide transition-all duration-200 rounded-full hover:bg-white hover:shadow-md"
                title="Blog sayfasına git"
              >
                BLOG
              </Link>

              <button 
                onClick={handleOrderClick}
                className="ml-4 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:via-orange-600 hover:to-amber-700 text-white px-6 py-2.5 rounded-full font-bold text-sm tracking-wide transition-all duration-200 transform hover:scale-105 hover:shadow-lg shadow-amber-500/25 uppercase"
                title="Sipariş vermek için tıklayın"
              >
                <span className="flex items-center space-x-2">
                  <span>Sipariş Ver</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </span>
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden relative">
              <button
                className="relative p-2 sm:p-3 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all duration-200 shadow-lg hover:shadow-xl"
                aria-controls="mobile-navigation"
                aria-expanded={open}
                onClick={() => setOpen(!open)}
                title={open ? "Menüyü kapat" : "Menüyü aç"}
              >
                <span className="sr-only">Menüyü aç/kapat</span>
                <div className="w-5 h-5 flex flex-col justify-center items-center">
                  <span className={`bg-gradient-to-r from-amber-600 to-orange-600 block h-0.5 w-5 rounded-full transition-all duration-300 ${
                    open ? 'rotate-45 translate-y-1' : '-translate-y-0.5'
                  }`}></span>
                  <span className={`bg-gradient-to-r from-amber-600 to-orange-600 block h-0.5 w-5 rounded-full transition-all duration-300 ${
                    open ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                  }`}></span>
                  <span className={`bg-gradient-to-r from-amber-600 to-orange-600 block h-0.5 w-5 rounded-full transition-all duration-300 ${
                    open ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'
                  }`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Simple Mobile Menu */}
      <SimpleMobileMenu isOpen={open} onClose={() => setOpen(false)} />
    </>
  )
}
