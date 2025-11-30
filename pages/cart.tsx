import React, { useState } from 'react'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { useCart } from '../contexts/CartContext'
import { useRouter } from 'next/router'
import products from '../data/products.json'

function formatPrice(amount: number) {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(amount)
}

export default function Cart() {
  const { items, totalAmount, itemCount, removeItem, updateQuantity, clearCart, addItem } = useCart()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedDelivery, setSelectedDelivery] = useState<'anadolu' | 'avrupa'>('anadolu')
  
  const deliveryFee = selectedDelivery === 'anadolu' ? 300 : 500
  const finalTotal = totalAmount + deliveryFee

  const handleAddPopularProduct = (productId: string) => {
    const product = products.find(p => p.id === productId)
    if (product) {
      addItem({
        id: productId,
        name: product.name,
        price: product.price
      })
    }
  }

  const handleWhatsAppOrder = () => {
    const message = "Merhaba. Ürünleriniz hakkında bilgi almak istiyorum."
    const whatsappUrl = `https://wa.me/905378395801?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const handleContinueShopping = () => {
    router.push('/#products')
  }

  // Empty Cart State - Mobile First
  if (items.length === 0) {
    return (
      <Layout>
        <SEO 
          title="Sepetim - Baklava & Börek"
          description="Sepetiniz boş. Taze baklava ve börek çeşitlerimizi keşfedin."
        />
        
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 py-2 px-3">
          <div className="max-w-sm mx-auto">
            {/* Mobile Header */}
            <div className="bg-white rounded-2xl shadow-lg p-4 mb-4">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-amber-100 to-orange-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-12 h-12 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5.5M7 13v6a2 2 0 002 2h6a2 2 0 002-2v-6" />
                  </svg>
                </div>
                                 <h1 className="text-2xl font-black text-gray-900 mb-3">Sepetiniz Boş</h1>
                 <p className="text-gray-600 text-base leading-relaxed mb-6">Taze baklava ve böreklerimizi keşfetmeye ne dersiniz?</p>
              </div>
            </div>

            {/* Quick Actions - Mobile */}
            <div className="space-y-2">
                             <button
                 onClick={handleContinueShopping}
                 className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 px-4 rounded-xl font-black text-base tracking-wide hover:from-amber-600 hover:to-orange-600 transition-all duration-200 shadow-lg"
               >
                 <div className="flex items-center justify-center space-x-2">
                   <span>🥧</span>
                   <span>Ürünleri Keşfet</span>
                 </div>
               </button>
              
              <button
                onClick={() => window.open('https://wa.me/905378395801', '_blank')}
                className="w-full border-2 border-green-500 text-green-600 py-2 px-4 rounded-xl font-semibold text-sm tracking-wide hover:bg-green-50 transition-all duration-200"
              >
                <div className="flex items-center justify-center space-x-2">
                  <span>💬</span>
                  <span>WhatsApp ile Sipariş</span>
                </div>
              </button>
            </div>

            {/* Popular Products Suggestion */}
            <div className="bg-white rounded-2xl shadow-lg p-4 mt-4">
              <h3 className="font-bold text-gray-900 mb-3">Popüler Ürünlerimiz</h3>
              <div className="space-y-2">
                {products.slice(0, 2).map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-2 bg-amber-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">🥧</span>
                      <div>
                        <div className="font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-amber-600 font-bold">{formatPrice(product.price)}</div>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleAddPopularProduct(product.id)}
                      className="bg-amber-500 text-white px-3 py-1 rounded-lg text-sm font-bold hover:bg-amber-600 transition-colors"
                    >
                      +
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  // Filled Cart State - Mobile First
  return (
    <Layout>
      <SEO 
        title={`Sepetim (${itemCount} ürün) - Baklava & Börek`}
        description={`Sepetinizde ${itemCount} ürün bulunuyor. Toplam tutar: ${formatPrice(totalAmount)}`}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 py-2 px-3">
        <div className="max-w-sm mx-auto">
          {/* Mobile Header with Summary */}
          <div className="bg-white rounded-2xl shadow-lg p-3 mb-3">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-gray-900">Sepetim</h1>
                <p className="text-sm text-gray-600">
                  {itemCount} ürün • <span className="font-bold text-amber-600">{formatPrice(totalAmount)}</span>
                </p>
              </div>
              <button
                onClick={clearCart}
                className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-all duration-200"
                title="Sepeti Temizle"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Cart Items - Mobile Optimized */}
          <div className="space-y-2 mb-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-lg p-3">
                <div className="flex items-center space-x-4">
                                     {/* Product Image/Icon */}
                   <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                     <span className="text-xl">🥧</span>
                   </div>
                  
                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 text-sm truncate">{item.name}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-amber-600 font-bold text-sm">{formatPrice(item.price)}</span>
                      
                      {/* Quantity Controls - Mobile Optimized */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors duration-200"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                        
                        <span className="w-8 text-center font-bold text-gray-900">{item.quantity}</span>
                        
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 bg-amber-100 hover:bg-amber-200 text-amber-600 rounded-lg flex items-center justify-center transition-colors duration-200"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-all duration-200 flex-shrink-0"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                                 {/* Item Total */}
                 <div className="mt-2 pt-2 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-sm text-gray-600">Ara Toplam</span>
                  <span className="font-bold text-gray-900">{formatPrice(item.price * item.quantity)}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary - Mobile */}
          <div className="bg-white rounded-2xl shadow-lg p-4 mb-4">
            <h3 className="font-bold text-gray-900 mb-3">Sipariş Özeti</h3>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Ürün Toplamı ({itemCount} ürün)</span>
                <span className="font-medium">{formatPrice(totalAmount)}</span>
              </div>
              
                                                           <div className="space-y-2">
                  <span className="text-gray-600 text-sm">Teslimat Seçimi</span>
                  <div className="space-y-1">
                   <label className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                     <input
                       type="radio"
                       name="delivery"
                       value="anadolu"
                       checked={selectedDelivery === 'anadolu'}
                       onChange={(e) => setSelectedDelivery(e.target.value as 'anadolu' | 'avrupa')}
                       className="w-4 h-4 text-amber-600 bg-gray-100 border-gray-300 focus:ring-amber-500"
                     />
                     <div className="flex-1">
                       <div className="font-medium text-gray-900 text-sm">Anadolu Yakası</div>
                       <div className="text-xs text-gray-600">₺300</div>
                     </div>
                   </label>
                   
                   <label className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                     <input
                       type="radio"
                       name="delivery"
                       value="avrupa"
                       checked={selectedDelivery === 'avrupa'}
                       onChange={(e) => setSelectedDelivery(e.target.value as 'anadolu' | 'avrupa')}
                       className="w-4 h-4 text-amber-600 bg-gray-100 border-gray-300 focus:ring-amber-500"
                     />
                     <div className="flex-1">
                       <div className="font-medium text-gray-900 text-sm">Avrupa Yakası</div>
                       <div className="text-xs text-gray-600">₺500</div>
                     </div>
                   </label>
                 </div>
               </div>
              
                             <div className="border-t border-gray-200 pt-2">
                 <div className="space-y-1">
                   <div className="flex justify-between text-sm">
                     <span className="text-gray-600">Teslimat Ücreti</span>
                     <span className="font-medium">{formatPrice(deliveryFee)}</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-lg font-bold text-gray-900">Genel Toplam</span>
                     <span className="text-lg font-bold text-amber-600">{formatPrice(finalTotal)}</span>
                   </div>
                 </div>
               </div>
            </div>
          </div>

                     {/* Action Buttons - Mobile */}
           <div className="space-y-2 pb-24">
            <button
                              onClick={handleWhatsAppOrder}
              disabled={isProcessing}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-xl font-bold text-base hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg disabled:opacity-50"
            >
              {isProcessing ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>İşleniyor...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <span>💬</span>
                  <span>WhatsApp'tan Sipariş Ver</span>
                </div>
              )}
            </button>
            
            <button
              onClick={handleContinueShopping}
              className="w-full border-2 border-amber-300 text-amber-600 py-2 px-4 rounded-xl font-bold text-sm hover:bg-amber-50 transition-all duration-200"
            >
              <div className="flex items-center justify-center space-x-2">
                <span>🛍️</span>
                <span>Alışverişe Devam Et</span>
              </div>
            </button>
            

          </div>
        </div>
      </div>
    </Layout>
  )
}
