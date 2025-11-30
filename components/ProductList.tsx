import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import productsData from '../data/products.json'

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

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch('/api/products')

        if (!response.ok) {
          throw new Error('Ürünler alınamadı')
        }

        const data: Product[] = await response.json()
        setProducts(data.slice(0, 5))
      } catch (err) {
        console.error('API üzerinden ürünler çekilirken hata oluştu, statik veri kullanılacak.', err)
        setProducts(productsData.slice(0, 5))
        setError('Bağlantı sorunu yaşandı. Lütfen WhatsApp\'tan yazın.')
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  return (
    <section id="products" className="py-8 bg-gradient-to-b from-white to-amber-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Ürünlerimiz</span>
          </h2>
          <p className="text-gray-700 text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed px-4">
            Günlük taze üretilen el yapımı lezzetlerimizi keşfedin
          </p>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-0">
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
      </div>
    </section>
  )
}
