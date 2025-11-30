const testimonials = [
  {
    id: 1,
    name: "Ayşe Demir",
    location: "İstanbul, Beşiktaş",
    rating: 5,
    comment: "Düğünümüzde misafirlerimize ikram etmek üzere 60 tepsi cevizli ve fıstıklı baklava siparişi verdik. Hem fiyatlar çok uygundu hem de tatlıların tazeliği ve lezzeti dillere destan oldu. Hiçbir misafirimiz tatlılardan şikayet etmedi, aksine herkes övgüyle bahsetti. Büyük organizasyonlar için kesinlikle tavsiye ederim.",
    shortComment: "Düğünümüzde 60 tepsi baklava siparişi verdik. Hem fiyatlar çok uygundu hem de tatlıların tazeliği ve lezzeti dillere destan oldu...",
    date: "2025-08-28"
  },
  {
    id: 2,
    name: "Mehmet Kaya",
    location: "İstanbul, Kadıköy",
    rating: 5,
    comment: "Cenazemiz için 50 tepsi su böreği ve fındıklı baklava siparişi verdik. Zamanında teslimat yapıldı, ürünler taptaze geldi. Hem ekonomik fiyatı hem de hızlı servisiyle zor zamanımızda yanımızda oldular. Allah razı olsun.",
    shortComment: "Cenazemiz için 50 tepsi börek ve baklava siparişi verdik. Zamanında teslimat yapıldı, ürünler taptaze geldi...",
    date: "2024-06-15"
  },
  {
    id: 3,
    name: "Fatma Şahin",
    location: "İstanbul, Şişli",
    rating: 5,
    comment: "Sünnet düğünümüzde misafirlere ikram etmek için 70 tepsi karışık baklava (cevizli, fıstıklı ve fındıklı) sipariş verdik. Gerçekten çok kaliteli, çıtır çıtır ve bol malzemeliydi. Fiyatlar da toplu alım için çok uygundu. Gönül rahatlığıyla tavsiye ediyorum.",
    shortComment: "Sünnet düğünümüzde 70 tepsi karışık baklava sipariş verdik. Gerçekten çok kaliteli, çıtır çıtır ve bol malzemeliydi...",
    date: "2022-09-20"
  },
  {
    id: 4,
    name: "Ali Yılmaz",
    location: "İstanbul, Üsküdar",
    rating: 5,
    comment: "Ofisimizde düzenlediğimiz etkinlik için 50 tepsi Adana böreği ve su böreği sipariş ettik. Börekler sıcacık, kat kat ve bol malzemeliydi. Hem çalışanlarımız hem de misafirlerimiz çok memnun kaldı. Bu kalitede ürünü bu kadar uygun fiyata bulmak gerçekten zor.",
    shortComment: "Ofisimizde düzenlediğimiz etkinlik için 50 tepsi börek sipariş ettik. Börekler sıcacık, kat kat ve bol malzemeliydi...",
    date: "2018-03-12"
  },
  {
    id: 5,
    name: "Zeynep Özkan",
    location: "İstanbul, Bakırköy",
    rating: 5,
    comment: "Nişan törenimizde 55 tepsi fıstıklı ve cevizli baklava siparişi verdik. Hem görselliği hem tadı kusursuzdu. Toplu siparişlerde sağladıkları fiyat avantajı sayesinde bütçemizi aşmadan harika bir ikram hazırlayabildik.",
    shortComment: "Nişan törenimizde 55 tepsi baklava siparişi verdik. Hem görselliği hem tadı kusursuzdu. Toplu siparişlerde fiyat avantajı...",
    date: "2015-11-25"
  },
  {
    id: 6,
    name: "Mustafa Arslan",
    location: "İstanbul, Beylikdüzü",
    rating: 5,
    comment: "Mevlid programımızda ikram etmek üzere 80 tepsi baklava ve börek siparişi verdik. Ürünler çok kısa sürede geldi, hepsi özenle hazırlanmıştı. Hem ekonomik fiyatı hem de kalitesiyle çevremizden de çok övgü aldık. Bundan sonra tüm toplu siparişlerimizi buradan vereceğiz.",
    shortComment: "Mevlid programımızda 80 tepsi baklava ve börek siparişi verdik. Ürünler çok kısa sürede geldi, hepsi özenle hazırlanmıştı...",
    date: "2012-07-08"
  }
]

import React, { useState } from 'react'

export default function Testimonials() {
  const [expandedTestimonials, setExpandedTestimonials] = useState<number[]>([])

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-amber-50 to-orange-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f59e0b' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl mb-6 shadow-lg">
            <span className="text-2xl">⭐</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text text-transparent">
              Müşteri Yorumları
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto rounded-full"></div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 max-w-7xl mx-auto mb-16">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className="group bg-white/80 backdrop-blur-sm p-4 md:p-8 rounded-2xl md:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/50 relative overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-bl-full"></div>
              
              {/* Quote Icon */}
              <div className="absolute top-3 left-3 md:top-6 md:left-6 text-amber-400/30 text-2xl md:text-4xl">"</div>
              
              {/* Rating Stars */}
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 md:w-6 md:h-6 ${
                        i < testimonial.rating ? 'text-yellow-400 drop-shadow-sm' : 'text-gray-200'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs md:text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 md:px-3 rounded-full">
                  {new Date(testimonial.date).toLocaleDateString('tr-TR')}
                </span>
              </div>

              {/* Comment */}
              <blockquote className="text-gray-700 mb-4 italic leading-relaxed text-sm md:text-lg relative z-10">
                "{expandedTestimonials.includes(testimonial.id) ? testimonial.comment : testimonial.shortComment}"
              </blockquote>
              
              {/* Read More/Less Button */}
              <button 
                onClick={() => {
                  if (expandedTestimonials.includes(testimonial.id)) {
                    setExpandedTestimonials(expandedTestimonials.filter(id => id !== testimonial.id))
                  } else {
                    setExpandedTestimonials([...expandedTestimonials, testimonial.id])
                  }
                }}
                className="text-amber-600 hover:text-amber-700 font-semibold text-xs md:text-sm mb-4 md:mb-6 transition-colors duration-200 flex items-center group"
              >
                {expandedTestimonials.includes(testimonial.id) ? 'Daha az göster' : 'Devamını gör'}
                <svg className={`w-3 h-3 md:w-4 md:h-4 ml-1 transition-transform ${expandedTestimonials.includes(testimonial.id) ? 'rotate-180' : 'group-hover:translate-x-1'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Customer Info */}
              <div className="flex items-center">
                <div className="w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl md:rounded-2xl flex items-center justify-center text-white font-black text-lg md:text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="ml-3 md:ml-4">
                  <div className="font-bold text-gray-900 text-sm md:text-lg">{testimonial.name}</div>
                  <div className="text-xs md:text-sm text-gray-500 flex items-center">
                    <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-amber-400 rounded-full mr-1.5 md:mr-2"></span>
                    {testimonial.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Professional Contact Section */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-white/90 to-amber-50/50 backdrop-blur-sm p-12 rounded-3xl shadow-2xl max-w-4xl mx-auto border border-white/50 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-amber-400/10 to-orange-500/10 rounded-full -translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-400/10 to-amber-500/10 rounded-full translate-x-12 translate-y-12"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl mb-8 shadow-xl">
                <span className="text-3xl">📞</span>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
                <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  İletişim
                </span>
              </h3>
              
              <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
                Sipariş ve bilgi için hemen iletişime geçin
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button
                  onClick={() => {
                    const message = "Merhaba. Ürünleriniz hakkında bilgi almak istiyorum."
                    const whatsappUrl = `https://wa.me/905378395801?text=${encodeURIComponent(message)}`
                    window.open(whatsappUrl, '_blank')
                  }}
                  className="group inline-flex items-center justify-center bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
                >
                  <span className="mr-3 text-xl">💬</span>
                  WhatsApp
                  <svg className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                
                <button
                  onClick={() => {
                    window.location.href = 'tel:+905378395801'
                  }}
                  className="group inline-flex items-center justify-center bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
                >
                  <span className="mr-3 text-xl">📞</span>
                  Ara
                  <svg className="ml-3 w-5 h-5 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
