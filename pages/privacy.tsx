import React from 'react'
import Layout from '../components/Layout'

export default function Privacy() {
  return (
    <Layout title="Gizlilik Politikası" description="Baklava & Börek gizlilik politikası - Kişisel verilerinizin korunması">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 tracking-tight">
            Gizlilik Politikası
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">
            Kişisel verilerinizin güvenliği bizim için çok önemlidir. Bu politika, verilerinizin nasıl toplandığını ve kullanıldığını açıklar.
          </p>
        </div>

        {/* Content Sections */}
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Veri Toplama */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border">
            <h2 className="text-3xl font-black text-gray-900 mb-6 tracking-tight">
              Hangi Verileri Topluyoruz?
            </h2>
            <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
              <p>
                Web sitemizi kullanırken aşağıdaki bilgileri toplayabiliriz:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Kişisel Bilgiler:</strong> Ad, soyad, e-posta adresi, telefon numarası, adres bilgileri</li>
                <li><strong>Sipariş Bilgileri:</strong> Sipariş geçmişi, tercih ettiğiniz ürünler, ödeme bilgileri</li>
                <li><strong>Teknik Veriler:</strong> IP adresi, tarayıcı türü, cihaz bilgileri, sayfa ziyaretleri</li>
                <li><strong>İletişim Verileri:</strong> Müşteri hizmetleri ile yaptığınız görüşmeler</li>
              </ul>
            </div>
          </div>

          {/* Veri Kullanımı */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border">
            <h2 className="text-3xl font-black text-gray-900 mb-6 tracking-tight">
              Verilerinizi Nasıl Kullanıyoruz?
            </h2>
            <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
              <p>
                Topladığımız verileri aşağıdaki amaçlarla kullanırız:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Siparişlerinizi işlemek ve teslimat yapmak</li>
                <li>Müşteri hizmetleri ve destek sağlamak</li>
                <li>Ürün ve hizmetlerimizi geliştirmek</li>
                <li>Yasal yükümlülüklerimizi yerine getirmek</li>
                <li>Güvenlik ve dolandırıcılık önleme</li>
                <li>İletişim ve pazarlama faaliyetleri (izin verdiğiniz takdirde)</li>
              </ul>
            </div>
          </div>

          {/* Veri Paylaşımı */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border">
            <h2 className="text-3xl font-black text-gray-900 mb-6 tracking-tight">
              Verilerinizi Kimlerle Paylaşıyoruz?
            </h2>
            <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
              <p>
                Kişisel verilerinizi üçüncü taraflarla yalnızca aşağıdaki durumlarda paylaşırız:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Hizmet Sağlayıcılar:</strong> Ödeme işlemleri, kargo ve teslimat hizmetleri</li>
                <li><strong>Yasal Zorunluluk:</strong> Yasa gereği veri paylaşımı gerektiğinde</li>
                <li><strong>Güvenlik:</strong> Dolandırıcılık önleme ve güvenlik amaçlı</li>
                <li><strong>İzin:</strong> Açık izniniz olduğunda</li>
              </ul>
              <p className="mt-4">
                Verilerinizi asla satmayız veya ticari amaçla üçüncü taraflara kiralamayız.
              </p>
            </div>
          </div>

          {/* Veri Güvenliği */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border">
            <h2 className="text-3xl font-black text-gray-900 mb-6 tracking-tight">
              Veri Güvenliği
            </h2>
            <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
              <p>
                Kişisel verilerinizin güvenliği için aşağıdaki önlemleri alırız:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>SSL şifreleme ile güvenli veri aktarımı</li>
                <li>Düzenli güvenlik güncellemeleri ve kontrolleri</li>
                <li>Erişim kontrolü ve yetkilendirme sistemleri</li>
                <li>Veri yedekleme ve felaket kurtarma planları</li>
                <li>Çalışanlarımıza veri güvenliği eğitimleri</li>
              </ul>
            </div>
          </div>

          {/* Haklarınız */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border">
            <h2 className="text-3xl font-black text-gray-900 mb-6 tracking-tight">
              Haklarınız
            </h2>
            <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
              <p>
                KVKK kapsamında aşağıdaki haklara sahipsiniz:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                <li>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme</li>
                <li>Kişisel verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
                <li>Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı üçüncü kişileri bilme</li>
                <li>Kişisel verilerinizin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme</li>
                <li>Kişisel verilerinizin silinmesini veya yok edilmesini isteme</li>
                <li>İşlenen verilerinizin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle kişinin kendisi aleyhine bir sonucun ortaya çıkmasına itiraz etme</li>
              </ul>
            </div>
          </div>

          {/* İletişim */}
          <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl p-8 text-white text-center">
            <h2 className="text-3xl font-black mb-6">Sorularınız mı Var?</h2>
            <p className="text-xl mb-6">
              Gizlilik politikamız hakkında sorularınız için bizimle iletişime geçebilirsiniz.
            </p>
            <div className="space-y-2 text-amber-100">
              <p><strong>E-posta:</strong> gizlilik@baklavaborek.com</p>
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
