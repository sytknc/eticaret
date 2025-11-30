import React from 'react'
import Layout from '../components/Layout'

export default function Cookies() {
  return (
    <Layout title="Çerez Politikası" description="Baklava & Börek çerez politikası - Çerezlerin kullanımı hakkında bilgi">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 tracking-tight">
            Çerez Politikası
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">
            Web sitemizde çerezlerin nasıl kullanıldığını ve bu çerezleri nasıl kontrol edebileceğinizi öğrenin.
          </p>
        </div>

        {/* Content Sections */}
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Çerez Nedir */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border">
            <h2 className="text-3xl font-black text-gray-900 mb-6 tracking-tight">
              Çerez Nedir?
            </h2>
            <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
              <p>
                Çerezler, web sitemizi ziyaret ettiğinizde cihazınıza (bilgisayar, tablet veya telefon) kaydedilen küçük metin dosyalarıdır. 
                Bu dosyalar, web sitesinin sizi tanımasını ve deneyiminizi iyileştirmesini sağlar.
              </p>
              <p>
                Çerezler, web sitesinin daha hızlı yüklenmesini, tercihlerinizi hatırlamasını ve size kişiselleştirilmiş içerik sunmasını sağlar.
              </p>
            </div>
          </div>

          {/* Çerez Türleri */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border">
            <h2 className="text-3xl font-black text-gray-900 mb-6 tracking-tight">
              Hangi Çerezleri Kullanıyoruz?
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Zorunlu Çerezler</h3>
                <p className="text-gray-700 leading-relaxed">
                  Bu çerezler web sitesinin temel işlevlerini yerine getirmek için gereklidir. 
                  Sepetinizi korumak, güvenlik sağlamak ve temel site işlevlerini desteklemek için kullanılır.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Performans Çerezleri</h3>
                <p className="text-gray-700 leading-relaxed">
                  Web sitesinin performansını analiz etmek ve iyileştirmek için kullanılır. 
                  Hangi sayfaların en çok ziyaret edildiğini ve kullanıcıların siteyi nasıl kullandığını anlamamıza yardımcı olur.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">İşlevsellik Çerezleri</h3>
                <p className="text-gray-700 leading-relaxed">
                  Tercihlerinizi hatırlamak ve size kişiselleştirilmiş deneyim sunmak için kullanılır. 
                  Dil tercihleriniz, bölge ayarlarınız ve diğer kişisel ayarlarınız bu çerezlerde saklanır.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Pazarlama Çerezleri</h3>
                <p className="text-gray-700 leading-relaxed">
                  Size ilgi alanlarınıza uygun reklamlar göstermek ve pazarlama kampanyalarının etkinliğini ölçmek için kullanılır. 
                  Bu çerezler sadece izninizle kullanılır.
                </p>
              </div>
            </div>
          </div>

          {/* Üçüncü Taraf Çerezler */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border">
            <h2 className="text-3xl font-black text-gray-900 mb-6 tracking-tight">
              Üçüncü Taraf Çerezler
            </h2>
            <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
              <p>
                Web sitemizde aşağıdaki üçüncü taraf hizmetlerini kullanıyoruz:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Google Analytics:</strong> Site trafiğini analiz etmek için</li>
                <li><strong>Stripe:</strong> Güvenli ödeme işlemleri için</li>
                <li><strong>Facebook Pixel:</strong> Reklam performansını ölçmek için (izin verdiğiniz takdirde)</li>
                <li><strong>Google Ads:</strong> Reklam kampanyalarını yönetmek için (izin verdiğiniz takdirde)</li>
              </ul>
              <p className="mt-4">
                Bu hizmetler kendi çerez politikalarına sahiptir ve verilerinizi kendi amaçları doğrultusunda kullanabilirler.
              </p>
            </div>
          </div>

          {/* Çerez Yönetimi */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border">
            <h2 className="text-3xl font-black text-gray-900 mb-6 tracking-tight">
              Çerezlerinizi Nasıl Yönetebilirsiniz?
            </h2>
            <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
              <p>
                Çerezlerinizi kontrol etmek ve yönetmek için aşağıdaki seçeneklere sahipsiniz:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Tarayıcı Ayarları:</strong> Tarayıcınızın ayarlarından çerezleri silebilir veya devre dışı bırakabilirsiniz</li>
                <li><strong>Çerez Banner'ı:</strong> Sitemizi ziyaret ettiğinizde çıkan banner'dan çerez tercihlerinizi yönetebilirsiniz</li>
                <li><strong>Üçüncü Taraf Opt-out:</strong> Belirli üçüncü taraf hizmetler için opt-out seçeneklerini kullanabilirsiniz</li>
                <li><strong>İletişim:</strong> Çerez politikamız hakkında sorularınız için bizimle iletişime geçebilirsiniz</li>
              </ul>
              <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
                <p className="text-amber-800 font-medium">
                  <strong>Önemli:</strong> Çerezleri devre dışı bırakırsanız, web sitemizin bazı özellikleri düzgün çalışmayabilir.
                </p>
              </div>
            </div>
          </div>

          {/* Çerez Süreleri */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border">
            <h2 className="text-3xl font-black text-gray-900 mb-6 tracking-tight">
              Çerez Süreleri
            </h2>
            <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
              <p>
                Kullandığımız çerezler farklı sürelerde saklanır:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Oturum Çerezleri:</strong> Tarayıcınızı kapattığınızda silinir</li>
                <li><strong>Kalıcı Çerezler:</strong> Belirli bir süre sonra otomatik olarak silinir (genellikle 1-2 yıl)</li>
                <li><strong>Analitik Çerezleri:</strong> 26 ay boyunca saklanır</li>
                <li><strong>Pazarlama Çerezleri:</strong> 13 ay boyunca saklanır</li>
              </ul>
            </div>
          </div>

          {/* Güncellemeler */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border">
            <h2 className="text-3xl font-black text-gray-900 mb-6 tracking-tight">
              Politika Güncellemeleri
            </h2>
            <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
              <p>
                Bu çerez politikası zaman zaman güncellenebilir. Önemli değişiklikler olduğunda:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Web sitemizde duyuru yaparız</li>
                <li>E-posta ile bilgilendirme göndeririz (kayıtlı kullanıcılar için)</li>
                <li>Politikanın son güncelleme tarihini güncelleriz</li>
              </ul>
              <p className="mt-4">
                Politikanın güncel versiyonunu her zaman bu sayfada bulabilirsiniz.
              </p>
            </div>
          </div>

          {/* İletişim */}
          <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl p-8 text-white text-center">
            <h2 className="text-3xl font-black mb-6">Sorularınız mı Var?</h2>
            <p className="text-xl mb-6">
              Çerez politikamız hakkında sorularınız için bizimle iletişime geçebilirsiniz.
            </p>
            <div className="space-y-2 text-amber-100">
              <p><strong>E-posta:</strong> cookies@baklavaborek.com</p>
              <p><strong>Telefon:</strong> +90 (212) 555 0123</p>
              <p><strong>Adres:</strong> İstanbul, Türkiye</p>
            </div>
          </div>

          {/* Son Güncelleme */}
          <div className="text-center text-gray-600">
            <p className="text-sm">
              <strong>Son Güncelleme:</strong> {new Date().toLocaleDateString('tr-TR')}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}
