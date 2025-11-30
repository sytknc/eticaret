
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useCart } from '../contexts/CartContext'
import Layout from '../components/Layout'
import SEO from '../components/SEO'

type CustomerInfo = {
  name: string
  phone: string
  email: string
  address: string
  city: string
  district: string
  notes: string
}

type PaymentMethod = 'cash' | 'card' | 'transfer'

function formatPrice(amount: number) {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(amount)
}

export default function Checkout() {
  const router = useRouter()
  const { items, totalAmount, clearCart } = useCart()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)
  
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    district: '',
    notes: ''
  })
  
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash')
  const [deliveryTime, setDeliveryTime] = useState('asap')

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0 && !orderSuccess) {
      router.push('/cart')
    }
  }, [items, router, orderSuccess])

  const handleInputChange = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }))
  }

  const isStepValid = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return customerInfo.name && customerInfo.phone && customerInfo.address
      case 2:
        return paymentMethod
      default:
        return true
    }
  }

  const handleSubmitOrder = async () => {
    setIsLoading(true)
    
    // Simulate order processing with optimized timeout
    const orderTimer = setTimeout(() => {
      setIsLoading(false)
      setOrderSuccess(true)
      clearCart()
      
      // WhatsApp integration for order
      const orderDetails = "Merhaba. Ürünleriniz hakkında bilgi almak istiyorum."

      const whatsappUrl = `https://wa.me/905378395801?text=${encodeURIComponent(orderDetails)}`
      window.open(whatsappUrl, '_blank')
    }, 2000)
    
    // Cleanup timer on component unmount
    return () => clearTimeout(orderTimer)
  }

  if (orderSuccess) {
    return (
      <Layout>
        <SEO 
          title="Sipariş Tamamlandı - Baklava & Börek"
          description="Siparişiniz başarıyla alındı. En kısa sürede size ulaşacağız."
        />
        
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-8 px-4">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              {/* Success Animation */}
              <div className="w-20 h-20 bg-green-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Siparişiniz Alındı! 🎉
              </h1>
              
              <p className="text-gray-600 mb-8 leading-relaxed">
                Siparişiniz başarıyla kaydedildi. WhatsApp üzerinden detayları gönderdik. 
                En kısa sürede size ulaşacağız.
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={() => router.push('/')}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 px-6 rounded-xl font-bold hover:from-amber-600 hover:to-orange-600 transition-all duration-200"
                >
                  Ana Sayfaya Dön
                </button>
                
                <button
                  onClick={() => router.push('/products')}
                  className="w-full border border-amber-300 text-amber-600 py-3 px-6 rounded-xl font-bold hover:bg-amber-50 transition-all duration-200"
                >
                  Alışverişe Devam Et
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <SEO 
        title="Sipariş Ver - Baklava & Börek"
        description="Taze baklava ve böreklerinizi sipariş edin. Hızlı teslimat, güvenli ödeme."
      />
      
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-8 px-4">
        <div className="max-w-md mx-auto">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    stepNumber <= step 
                      ? 'bg-amber-500 text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {stepNumber}
                  </div>
                  {stepNumber < 3 && (
                    <div className={`w-16 h-1 mx-2 ${
                      stepNumber < step ? 'bg-amber-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center">
              <h2 className="text-lg font-bold text-gray-900">
                {step === 1 && 'Bilgilerinizi Girin'}
                {step === 2 && 'Ödeme Yöntemi'}
                {step === 3 && 'Siparişi Onayla'}
              </h2>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Step 1: Customer Information */}
            {step === 1 && (
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Ad Soyad *
                  </label>
                  <input
                    type="text"
                    value={customerInfo.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Adınız ve soyadınız"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Telefon *
                  </label>
                  <input
                    type="tel"
                    value={customerInfo.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="05XX XXX XX XX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    E-posta
                  </label>
                  <input
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="email@example.com"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      İl
                    </label>
                    <input
                      type="text"
                      value={customerInfo.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="İstanbul"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      İlçe
                    </label>
                    <input
                      type="text"
                      value={customerInfo.district}
                      onChange={(e) => handleInputChange('district', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="Kadıköy"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Adres *
                  </label>
                  <textarea
                    value={customerInfo.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Tam adresinizi yazın..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Sipariş Notu
                  </label>
                  <textarea
                    value={customerInfo.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    rows={2}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Özel talepleriniz..."
                  />
                </div>
              </div>
            )}

            {/* Step 2: Payment Method */}
            {step === 2 && (
              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <h3 className="font-bold text-gray-900">Ödeme Yöntemi Seçin</h3>
                  
                  {[
                    { id: 'cash', name: 'Kapıda Nakit Ödeme', icon: '💵', desc: 'Ürününüz teslim edilirken nakit ödeme' },
                    { id: 'card', name: 'Kartla Ödeme', icon: '💳', desc: 'Kapıda kart ile ödeme' },
                    { id: 'transfer', name: 'Havale/EFT', icon: '🏦', desc: 'Banka hesabımıza havale' }
                  ].map((method) => (
                    <label key={method.id} className={`block p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      paymentMethod === method.id 
                        ? 'border-amber-500 bg-amber-50' 
                        : 'border-gray-200 hover:border-amber-300'
                    }`}>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="payment"
                          value={method.id}
                          checked={paymentMethod === method.id}
                          onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                          className="sr-only"
                        />
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{method.icon}</span>
                          <div>
                            <div className="font-bold text-gray-900">{method.name}</div>
                            <div className="text-sm text-gray-600">{method.desc}</div>
                          </div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Teslimat Zamanı</h3>
                  <select
                    value={deliveryTime}
                    onChange={(e) => setDeliveryTime(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    <option value="asap">En Kısa Sürede</option>
                    <option value="1hour">1 Saat İçinde</option>
                    <option value="2hour">2 Saat İçinde</option>
                    <option value="evening">Akşam Saatlerinde</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 3: Order Confirmation */}
            {step === 3 && (
              <div className="p-6 space-y-6">
                {/* Order Summary */}
                <div className="bg-amber-50 rounded-xl p-4">
                  <h3 className="font-bold text-gray-900 mb-3">Sipariş Özeti</h3>
                  <div className="space-y-2">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>{item.quantity}x {item.name}</span>
                        <span className="font-bold">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                    <div className="border-t border-amber-200 pt-2 flex justify-between font-bold">
                      <span>Toplam</span>
                      <span className="text-amber-600">{formatPrice(totalAmount)}</span>
                    </div>
                  </div>
                </div>

                {/* Customer Info Summary */}
                <div className="space-y-3 text-sm">
                  <div><span className="font-bold">Ad:</span> {customerInfo.name}</div>
                  <div><span className="font-bold">Telefon:</span> {customerInfo.phone}</div>
                  <div><span className="font-bold">Adres:</span> {customerInfo.address}</div>
                  <div><span className="font-bold">Ödeme:</span> {
                    paymentMethod === 'cash' ? 'Kapıda Nakit' : 
                    paymentMethod === 'card' ? 'Kartla Ödeme' : 'Havale/EFT'
                  }</div>
                </div>

                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <span className="text-blue-500 text-xl">ℹ️</span>
                    <div className="text-sm text-blue-700">
                      <p className="font-bold mb-1">WhatsApp ile Onay</p>
                      <p>Siparişinizi WhatsApp üzerinden onaylayacağız. Bu sayede anlık iletişim kurabilir, özel isteklerinizi belirtebilirsiniz.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="p-6 bg-gray-50 flex space-x-4">
              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-100 transition-all duration-200"
                >
                  Geri
                </button>
              )}
              
              {step < 3 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  disabled={!isStepValid(step)}
                  className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all duration-200 ${
                    isStepValid(step)
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Devam Et
                </button>
              ) : (
                <button
                  onClick={handleSubmitOrder}
                  disabled={isLoading}
                  className="flex-1 py-3 px-6 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-bold hover:from-green-600 hover:to-green-700 transition-all duration-200 disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sipariş Veriliyor...</span>
                    </div>
                  ) : (
                    'Siparişi Tamamla'
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
