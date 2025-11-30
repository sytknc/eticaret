import React from 'react'
import Layout from '../components/Layout'

export default function RefundPolicy() {
  return (
    <Layout 
      title="İade Politikası" 
      description="Toptan Baklava & Börek iade politikası - Müşteri memnuniyeti garantisi"
      type="article"
    >
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl mb-8 shadow-xl">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-8 tracking-tight">
            <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text text-transparent">
              İade Politikası
            </span>
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto rounded-full mb-8"></div>
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium">
            Müşteri memnuniyeti odaklı iade ve değişim politikamız
          </p>
        </div>

        {/* Policy Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-white/50">
            
            {/* General Policy */}
            <div className="mb-12">
              <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-white text-lg">📋</span>
                </div>
                Genel İade Politikası
              </h2>
              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                <p>
                  <strong>Toptan Baklava & Börek</strong> olarak müşteri memnuniyetini en üst düzeyde tutmayı hedefliyoruz. 
                  Gıda ürünlerimizin doğası gereği, iade politikamız aşağıdaki koşullara tabidir:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Tüm ürünlerimiz günlük taze üretimdir</li>
                  <li>Ürün kalitesi ile ilgili sorunlar için anında çözüm sağlanır</li>
                  <li>Hijyen ve güvenlik standartlarına uygunluk garanti edilir</li>
                  <li>Müşteri memnuniyeti önceliğimizdir</li>
                </ul>
              </div>
            </div>

            {/* Return Conditions */}
            <div className="mb-12">
              <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-500 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-white text-lg">✅</span>
                </div>
                İade Koşulları
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-black text-green-600 mb-4">İade Kabul Edilen Durumlar</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      Ürün kalitesi ile ilgili sorunlar
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      Yanlış ürün teslimi
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      Paketleme hasarı
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      Hijyen standartlarına uymayan durumlar
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-black text-red-600 mb-4">İade Kabul Edilmeyen Durumlar</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">✗</span>
                      Müşteri kaynaklı hasarlar
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">✗</span>
                      Uygun olmayan saklama koşulları
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">✗</span>
                      Tüketilmiş ürünler
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">✗</span>
                      Son kullanma tarihi geçmiş ürünler
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Return Process */}
            <div className="mb-12">
              <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-white text-lg">🔄</span>
                </div>
                İade Süreci
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">1</span>
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-2">İletişim</h3>
                  <p className="text-gray-700">WhatsApp veya telefon ile bize ulaşın</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl">
                  <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">2</span>
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-2">Değerlendirme</h3>
                  <p className="text-gray-700">Durumu değerlendirip çözüm öneririz</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">3</span>
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-2">Çözüm</h3>
                  <p className="text-gray-700">Hızlı ve adil çözüm sağlarız</p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mb-12">
              <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-white text-lg">📞</span>
                </div>
                İade İçin İletişim
              </h2>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-black text-gray-900 mb-4">İletişim Bilgileri</h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center mr-4">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.886 3.488"/>
                          </svg>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">WhatsApp</p>
                          <p className="text-gray-700">+90 537 839 58 01</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center mr-4">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Telefon</p>
                          <p className="text-gray-700">+90 537 839 58 01</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-gray-900 mb-4">Çalışma Saatleri</h3>
                    <div className="space-y-2 text-gray-700">
                      <p><strong>7/24 Hizmet</strong></p>
                      <p>İade talepleriniz için her zaman ulaşabilirsiniz</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Notes */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-200">
              <h2 className="text-2xl font-black text-gray-900 mb-4 flex items-center">
                <span className="text-amber-600 mr-3">⚠️</span>
                Önemli Notlar
              </h2>
              <div className="space-y-3 text-gray-700">
                <p>• Gıda ürünlerimiz günlük taze üretimdir ve hijyen standartlarına uygun şekilde hazırlanır</p>
                <p>• İade talepleriniz en kısa sürede değerlendirilir ve çözüme kavuşturulur</p>
                <p>• Müşteri memnuniyeti bizim için en önemli önceliktir</p>
                <p>• Kalite sorunları için anında çözüm sağlanır</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
