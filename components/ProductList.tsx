import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import productsData from '../data/products.json'
import { useCart } from '../contexts/CartContext'

type Product = {
  id: string
  name: string
  description: string
  price: number
  image?: string
  images?: string[]
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { itemCount, totalAmount } = useCart()

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch('/api/products')

        if (!response.ok) {
          throw new Error('Ürünler alınamadı')
        }

        const data: Product[] = await response.json()
        setProducts(data.slice(0, 6))
      } catch (err) {
        console.error('API üzerinden ürünler çekilirken hata oluştu, statik veri kullanılacak.', err)
        setProducts(productsData.slice(0, 6))
        setError('Bağlantı sorunu yaşandı. Lütfen WhatsApp\'tan yazın.')
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  return (
    <section id="products" className="py-12 sm:py-16 bg-gradient-to-b from-white via-amber-50 to-orange-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12 lg:mb-14 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-white border border-amber-100 shadow-sm px-4 py-2 rounded-full text-amber-700 font-semibold text-sm">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <span>Günlük taze üretim • 3.5 kg tepsiler</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-gray-900 tracking-tight">
            <span className="bg-gradient-to-r from-amber-600 via-orange-500 to-red-500 bg-clip-text text-transparent">İşletmeniz İçin Hazır Ürünler</span>
          </h2>
          <p className="text-gray-700 text-lg sm:text-xl md:text-2xl max-w-4xl mx-auto font-medium leading-relaxed px-4">
            Toptan baklava ve börek siparişlerinizi anında oluşturun, sepette avantajlı fiyatları görün ve WhatsApp'tan onaylayın.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-5xl mx-auto text-left">
            <div className="flex items-center space-x-3 bg-white/70 backdrop-blur rounded-xl p-3 shadow-sm border border-amber-100">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center text-2xl">🥧</div>
              <div>
                <div className="font-bold text-gray-900">80+ dilim</div>
                <p className="text-sm text-gray-600">Standart tepsilerde bol malzeme</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-white/70 backdrop-blur rounded-xl p-3 shadow-sm border border-amber-100">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center text-2xl">⚡</div>
              <div>
                <div className="font-bold text-gray-900">Aynı gün</div>
                <p className="text-sm text-gray-600">İstanbul içi hızlı teslimat</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-white/70 backdrop-blur rounded-xl p-3 shadow-sm border border-amber-100">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center text-2xl">💎</div>
              <div>
                <div className="font-bold text-gray-900">Premium yağ</div>
                <p className="text-sm text-gray-600">Tereyağı ve Antep fıstığı garantisi</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur border border-amber-100 rounded-2xl shadow-lg shadow-amber-100/40 p-4 sm:p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-white flex items-center justify-center text-lg font-black shadow-lg shadow-amber-200">%
              </div>
              <div>
                <div className="text-sm font-bold text-amber-700">Online sepete özel</div>
                <p className="text-gray-700 text-sm sm:text-base font-medium">Toplu siparişlerde ücretsiz dilimleme ve vakum paketleme</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-semibold">Minimum sipariş yok</span>
              <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 font-semibold">Kurumsal faturalandırma</span>
              <span className="px-3 py-1 rounded-full bg-orange-50 text-orange-700 font-semibold">Isı kontrollü araçlar</span>
            </div>
          </div>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
            <span className="ml-2 text-gray-600 text-sm">Yükleniyor...</span>
          </div>
        )}
        
        {error && (
          <div className="text-center py-6">
            <div className="w-20 h-20 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-3xl">⚠️</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Bağlantı Sorunu</h3>
            <p className="text-gray-600 mb-4 max-w-md mx-auto">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-amber-700 transition-colors"
            >
              Yenile ve Tekrar Dene
            </button>
          </div>
        )}

        {!loading && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-0">
            {products.map((p) => (
              <ProductCard
                key={p.id}
                id={p.id}
                name={p.name}
                description={p.description}
                price={p.price}
                image={p.image}
                images={p.images}
              />
            ))}
          </div>
        )}

        {!loading && (
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-amber-100 p-6 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 text-white flex items-center justify-center text-lg font-black shadow-lg shadow-green-200">✓</div>
                <div>
                  <h3 className="text-xl font-black text-gray-900">Sipariş Akışı</h3>
                  <p className="text-gray-600 text-sm">Toplu siparişi dakikalar içinde tamamlayın.</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {[{ title: 'Ürünü seç', desc: 'Tepsi boyu ve adetini belirle' }, { title: 'Sepete ekle', desc: 'Teslimat ilçesini belirtin' }, { title: 'WhatsApp onayı', desc: 'Faturanızı paylaşalım' }, { title: 'Aynı gün teslim', desc: 'Isı kontrollü araçlarımız yolda' }].map((step, index) => (
                  <div key={step.title} className="p-3 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 shadow-sm">
                    <div className="text-xs font-black text-amber-700 mb-1">0{index + 1}</div>
                    <div className="font-bold text-gray-900">{step.title}</div>
                    <p className="text-sm text-gray-600">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-900 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-rose-500/10"></div>
              <div className="relative flex items-center justify-between mb-4">
                <div>
                  <div className="text-sm uppercase tracking-[0.2em] text-white/70 font-semibold">Anlık sepet</div>
                  <h3 className="text-2xl font-black">Sipariş Özeti</h3>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-2xl">🛒</div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Ürün adedi</span>
                  <span className="font-black text-lg">{itemCount} ürün</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Sepet tutarı</span>
                  <span className="font-black text-xl">{new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(totalAmount)}</span>
                </div>
                <p className="text-sm text-white/70">Teslimat ücretleri ödeme sayfasında seçtiğiniz ilçeye göre eklenir.</p>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <a
                    href="/cart"
                    className="text-center bg-white text-gray-900 py-3 rounded-xl font-black text-sm shadow-lg hover:-translate-y-0.5 transition-transform"
                  >
                    Sepete Git
                  </a>
                  <button
                    onClick={() => {
                      const message = 'Merhaba, sepetime eklediğim ürünleri onaylamak istiyorum.'
                      const whatsappUrl = `https://wa.me/905378395801?text=${encodeURIComponent(message)}`
                      window.open(whatsappUrl, '_blank')
                    }}
                    className="text-center border border-white/30 text-white py-3 rounded-xl font-black text-sm hover:bg-white/10 transition"
                  >
                    WhatsApp Onay
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
