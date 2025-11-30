import React from 'react'
import Layout from '../components/Layout'

export default function About() {
  return (
    <Layout title="Hakkımızda" description="Baklava & Börek hakkında - Geleneksel lezzetlerin hikayesi">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl mb-8 shadow-xl">
            <span className="text-3xl">🥧</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text text-transparent">
              Hakkımızda
            </span>
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto rounded-full mb-8"></div>
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium">
            1950 yılından bu yana İstanbul'un kalbinde, toptan baklava ve börek alanında hizmet veren firmamız, nesilden nesile aktarılan tecrübesi ve titiz çalışmasıyla müşterilerinin güvenini kazanmıştır.
          </p>
        </div>

        {/* Story Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-white/50">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-8 tracking-tight text-center">
              <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Bizim Hikayemiz
              </span>
            </h2>
            <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
              <p>
                Kuruluşumuzdan bu yana, kaliteli malzeme ve geleneksel tariflerimizi modern hizmet anlayışıyla birleştirerek, her türlü toplu organizasyon için ideal çözümler sunuyoruz.
              </p>
              <p>
                Düğünlerden sünnet törenlerine, cenaze ikramlarından ofis ve işyeri etkinliklerine kadar, büyük ve küçük tüm organizasyonlarda binlerce tepsi baklava ve böreği özenle hazırlayıp zamanında teslim ediyoruz. Cevizli, fıstıklı ve fındıklı baklava çeşitlerimiz, su böreği ve Adana böreğimizle misafirlerinize unutulmaz tatlar sunuyoruz.
              </p>
              <p>
                Tarihimize duyduğumuz saygı ve müşteri memnuniyetine verdiğimiz önem, her siparişimizde kaliteyi ve tazeliği garanti etmemizi sağlıyor. 70 yılı aşkın deneyimimizle, hem ekonomik hem de güvenilir toplu siparişler için yanınızdayız.
              </p>
              <p>
                Siz de özel günleriniz ve iş organizasyonlarınız için, güvenle tercih edebileceğiniz bir adres arıyorsanız, geleneği ve kaliteyi bir arada sunan firmamızı seçebilirsiniz.
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-200 transform hover:-translate-y-2">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-white text-3xl">🎯</span>
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-4">Kalite</h3>
            <p className="text-gray-600 text-lg leading-relaxed">70 yılı aşkın deneyimimizle, her ürünümüzde en yüksek kaliteyi garanti ediyoruz. Geleneksel tarifler ve modern hijyen standartları bir arada.</p>
          </div>
          <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-200 transform hover:-translate-y-2">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-white text-3xl">❤️</span>
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-4">Güven</h3>
            <p className="text-gray-600 text-lg leading-relaxed">Nesilden nesile aktarılan tecrübemiz ve titiz çalışmamızla müşterilerimizin güvenini kazanmış, her organizasyonda yanınızdayız.</p>
          </div>
          <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-200 transform hover:-translate-y-2">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-white text-3xl">⚡</span>
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-4">Tazelik</h3>
            <p className="text-gray-600 text-lg leading-relaxed">Günlük taze üretim, zamanında teslimat ve her zaman taze lezzetler. Binlerce tepsi baklava ve böreği özenle hazırlıyoruz.</p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-3xl p-8 md:p-12 text-white text-center shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-black mb-8">Rakamlarla Biz</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="group">
              <div className="text-4xl md:text-5xl font-black mb-2 group-hover:scale-110 transition-transform duration-200">70+</div>
              <div className="text-amber-100 text-lg">Yıllık Deneyim</div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-black mb-2 group-hover:scale-110 transition-transform duration-200">50K+</div>
              <div className="text-amber-100 text-lg">Mutlu Müşteri</div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-black mb-2 group-hover:scale-110 transition-transform duration-200">100K+</div>
              <div className="text-amber-100 text-lg">Tepsi Teslim</div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-black mb-2 group-hover:scale-110 transition-transform duration-200">7/24</div>
              <div className="text-amber-100 text-lg">Hizmet</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
