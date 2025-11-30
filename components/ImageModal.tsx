import React, { useEffect, useState } from 'react'

type ImageModalProps = {
  isOpen: boolean
  imageSrc: string
  imageAlt: string
  images?: string[]
  onClose: () => void
}

export default function ImageModal({ isOpen, imageSrc, imageAlt, images, onClose }: ImageModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [autoPlayInterval, setAutoPlayInterval] = useState<NodeJS.Timeout | null>(null)
  
  // Reset current image index when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0)
      setIsAutoPlaying(true)
    }
  }, [isOpen])

  // Auto-play functionality
  useEffect(() => {
    if (!isOpen || !images || images.length <= 1) return

    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentImageIndex(prev => (prev + 1) % images.length)
      }, 4000) // 4 seconds

      setAutoPlayInterval(interval)

      return () => {
        if (interval) clearInterval(interval)
      }
    } else {
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval)
        setAutoPlayInterval(null)
      }
    }
  }, [isOpen, isAutoPlaying, images])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval)
      }
    }
  }, [autoPlayInterval])

  // ESC tuşu ile kapatma
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    // Arrow keys for navigation
    const handleArrowKeys = (e: KeyboardEvent) => {
      if (!images || images.length <= 1) return
      
      if (e.key === 'ArrowLeft') {
        setCurrentImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1)
        // Pause auto-play when user interacts
        setIsAutoPlaying(false)
      } else if (e.key === 'ArrowRight') {
        setCurrentImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1)
        // Pause auto-play when user interacts
        setIsAutoPlaying(false)
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape, { passive: true })
      document.addEventListener('keydown', handleArrowKeys, { passive: true })
      document.body.style.overflow = 'hidden' // Scroll'u engelle
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('keydown', handleArrowKeys)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose, images])

  const handlePrevious = () => {
    if (!images || images.length <= 1) return
    setCurrentImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1)
    setIsAutoPlaying(false) // Pause auto-play when user interacts
  }

  const handleNext = () => {
    if (!images || images.length <= 1) return
    setCurrentImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1)
    setIsAutoPlaying(false) // Pause auto-play when user interacts
  }

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying)
  }

  if (!isOpen) return null

  const currentImage = images && images.length > 0 ? images[currentImageIndex] : imageSrc
  const hasMultipleImages = images && images.length > 1

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative z-10 max-w-4xl max-h-[90vh] mx-4">
        {/* Close Button - Higher z-index and better positioning */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }}
          className="absolute -top-16 right-0 text-white hover:text-amber-400 transition-colors duration-200 z-[10000]"
        >
          <div className="w-12 h-12 bg-black/70 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 hover:bg-black/90">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </button>

        {/* Auto-play Toggle Button */}
        {hasMultipleImages && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              toggleAutoPlay()
            }}
            className="absolute -top-16 right-16 text-white hover:text-amber-400 transition-colors duration-200 z-[10000]"
          >
            <div className="w-12 h-12 bg-black/70 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 hover:bg-black/90">
              {isAutoPlaying ? (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
                </svg>
              ) : (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>
          </button>
        )}

        {/* Navigation Buttons */}
        {hasMultipleImages && (
          <>
            {/* Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                handlePrevious()
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-amber-400 transition-colors duration-200 z-[10000]"
            >
              <div className="w-12 h-12 bg-black/70 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 hover:bg-black/90">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </div>
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleNext()
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-amber-400 transition-colors duration-200 z-[10000]"
            >
              <div className="w-12 h-12 bg-black/70 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 hover:bg-black/90">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          </>
        )}

        {/* Image Container */}
        <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl">
          {/* Image */}
          <picture>
            <source srcSet={currentImage} type="image/webp" />
            <img
              src={currentImage.replace('.webp', '.jpg')}
              alt={`${imageAlt} - Fotoğraf ${currentImageIndex + 1}`}
              className="w-full h-auto max-h-[80vh] object-contain"
              loading="eager"
            />
          </picture>
          
          {/* Image Info - Sadece geçiş noktaları */}
          {hasMultipleImages && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="flex space-x-2">
                {images.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
