import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { CartProvider } from '../contexts/CartContext'
import Script from 'next/script'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }: AppProps) {
  const [isClient, setIsClient] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsClient(true)
    
    // Router events for loading state
    const handleStart = () => {
      setLoading(true)
    }
    
    const handleComplete = () => {
      setLoading(false)
    }
    
    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)
    
    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [router])

  return (
    <>
      <Head>
        {/* Viewport Meta Tag */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      {/* Google Analytics - Optimized with next/script */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-113M17S9EK"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('Google Analytics loaded successfully')
        }}
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-113M17S9EK', {
            page_title: document.title,
            page_location: window.location.href
          });
        `}
      </Script>
      
      <CartProvider>
        {/* Loading indicator */}
        {loading && (
          <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
            <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 animate-pulse" style={{width: '100%', animation: 'loading 0.8s ease-in-out'}}></div>
          </div>
        )}
        
        <Component {...pageProps} />
        
        <style jsx>{`
          @keyframes loading {
            0% { width: 0%; }
            50% { width: 70%; }
            100% { width: 100%; }
          }
        `}</style>
      </CartProvider>
    </>
  )
}
