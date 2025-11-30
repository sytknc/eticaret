import React, { useState } from 'react'
import { useCart } from '../contexts/CartContext'
import ImageModal from './ImageModal'

type Props = {
  id: string
  name: string
  description: string
  price: number
  image?: string
  images?: string[]
}

function formatPrice(amount: number) {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(amount)
}

export default function ProductCard({ id, name, description, price, image, images }: Props) {
  const { addItem } = useCart()
  const [isAdding, setIsAdding] = useState(false)
  const [isAdded, setIsAdded] = useState(false)
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const productImages = images && images.length > 0 ? images : (image ? [image] : [])
  const currentImage = productImages[currentImageIndex] || image

  const handleAddToCart = () => {
    setIsAdding(true)
    
    // Use requestAnimationFrame for better performance
    requestAnimationFrame(() => {
      addItem({ id, name, price })
      setIsAdding(false)
      setIsAdded(true)
      
      // Reset added state after 2 seconds with optimized timeout
      const resetTimer = setTimeout(() => setIsAdded(false), 2000)
      
      // Cleanup timer on component unmount
      return () => clearTimeout(resetTimer)
    })
  }

  const handleCall = () => {
    window.location.href = 'tel:+905378395801'
  }

  const handleWhatsApp = () => {
    const message = "Merhaba. Ürünleriniz hakkında bilgi almak istiyorum."
    const whatsappUrl = `https://wa.me/905378395801?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const handleImageClick = () => {
    if (currentImage) {
      setIsImageModalOpen(true)
    }
  }

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index)
  }

  return (
    <>
      <article className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group border border-gray-200 hover:border-amber-300 relative">
        {/* Professional Frame with Gradient Border */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-amber-100 via-yellow-50 to-orange-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        
        {/* Image Section - Smaller Size */}
        <div className="relative h-32 sm:h-36 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="grid grid-cols-4 gap-1 h-full p-2">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="bg-amber-600 rounded-sm transform rotate-45"></div>
              ))}
            </div>
          </div>
          
          {/* Product Image or Icon */}
          {currentImage ? (
            <div 
              className="absolute inset-0 flex items-center justify-center cursor-pointer group"
              onClick={handleImageClick}
            >
              <picture>
                <source srcSet={currentImage} type="image/webp" />
                <img 
                  src={currentImage.replace('.webp', '.jpg')}
                  alt={name}
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </picture>
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-300"></div>
              
              {/* 3.5 kg Professional Badge */}
              <div className="absolute top-2 left-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2 py-1 rounded-lg shadow-lg transform -rotate-2 group-hover:rotate-0 transition-transform duration-300">
                <div className="text-xs font-bold tracking-wide">3.5 kg</div>
                <div className="text-[10px] opacity-90">Tepsi</div>
              </div>
              
              {/* Zoom Icon Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                  <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
              
              {/* Click Hint */}
              <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Büyütmek için tıklayın
              </div>

              {/* Image Gallery Indicator */}
              {productImages.length > 1 && (
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {currentImageIndex + 1} / {productImages.length}
                </div>
              )}
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center group-hover:scale-105 transition-transform duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mx-auto mb-2 flex items-center justify-center shadow-md">
                  <span className="text-2xl">🥧</span>
                </div>
                <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                  <span className="text-xs font-medium text-gray-700">Özel Sipariş</span>
                </div>
              </div>
            </div>
          )}

          {/* Price Badge - Smaller */}
          <div className="absolute top-2 right-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2 py-1 rounded-lg shadow-lg">
            <span className="text-sm font-bold tracking-wide">{formatPrice(price)}</span>
          </div>
        </div>

        {/* Thumbnail Gallery - Only show if multiple images */}
        {productImages.length > 1 && (
          <div className="px-3 py-2 bg-gray-50 border-t border-gray-100">
            <div className="flex space-x-2">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => handleThumbnailClick(index)}
                  className={`w-8 h-8 rounded-md overflow-hidden border-2 transition-all duration-200 ${
                    index === currentImageIndex 
                      ? 'border-amber-500 shadow-md' 
                      : 'border-gray-200 hover:border-amber-300'
                  }`}
                >
                  <picture>
                    <source srcSet={img} type="image/webp" />
                    <img 
                      src={img.replace('.webp', '.jpg')}
                      alt={`${name} - Fotoğraf ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </picture>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Content Section - Compact */}
        <div className="p-3 space-y-2 relative z-10">
          {/* Title - Smaller */}
          <h3 className="font-bold text-base sm:text-lg text-gray-900 leading-tight tracking-wide mb-1">
            {name}
          </h3>
          
          {/* Description - Compact */}
          <div className="space-y-1">
            <p className={`text-gray-600 text-sm leading-relaxed ${
              showFullDescription ? '' : 'line-clamp-2'
            }`}>
              {description}
            </p>
            {description.length > 60 && (
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-amber-600 hover:text-amber-700 text-xs font-medium transition-colors"
              >
                {showFullDescription ? 'Daha az göster' : 'Devamını gör'}
              </button>
            )}
          </div>

          

          {/* Action Button - Compact */}
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`w-full py-2 px-3 rounded-lg font-bold text-sm transition-all duration-300 transform tracking-wide ${
              isAdded 
                ? 'bg-green-500 text-white' 
                : isAdding 
                  ? 'bg-gray-400 text-white cursor-not-allowed' 
                  : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white hover:scale-105 active:scale-95'
            } shadow-md hover:shadow-lg`}
          >
            <div className="flex items-center justify-center space-x-1">
              {isAdding ? (
                <>
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Ekleniyor...</span>
                </>
              ) : isAdded ? (
                <>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Sepete Eklendi!</span>
                </>
              ) : (
                <>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5.5M7 13v6a2 2 0 002 2h6a2 2 0 002-2v-6" />
                  </svg>
                  <span>Sepete Ekle</span>
                </>
              )}
            </div>
          </button>

          {/* Quick Actions - Compact */}
          <div className="flex space-x-1">
            <button 
              onClick={handleCall}
              className="flex-1 py-1.5 px-2 border border-amber-300 text-amber-600 rounded-md text-xs font-medium hover:bg-amber-50 transition-colors duration-200"
            >
              <div className="flex items-center justify-center space-x-1">
                <span>📞</span>
                <span>Ara</span>
              </div>
            </button>
            <button 
              onClick={handleWhatsApp}
              className="flex-1 py-1.5 px-2 border border-green-300 text-green-600 rounded-md text-xs font-medium hover:bg-green-50 transition-colors duration-200"
            >
              <div className="flex items-center justify-center space-x-1">
                <span>💬</span>
                <span>WhatsApp</span>
              </div>
            </button>
          </div>
        </div>

        {/* Professional Corner Accent */}
        <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </article>

      {/* Image Modal */}
      <ImageModal
        isOpen={isImageModalOpen}
        imageSrc={currentImage || ''}
        imageAlt={name}
        images={productImages}
        onClose={() => setIsImageModalOpen(false)}
      />
    </>
  )
}
