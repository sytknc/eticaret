import React from 'react'
import Head from 'next/head'
import Layout from '../components/Layout'

export default function SecurityPolicy() {
  return (
    <Layout>
      <Head>
        <title>Güvenlik Politikası - Toptan Baklava & Börek</title>
        <meta name="description" content="Toptan Baklava & Börek güvenlik politikası ve veri koruma önlemleri." />
        <meta name="robots" content="noindex" />
      </Head>

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              Güvenlik Politikası
            </h1>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Veri Güvenliği
                </h2>
                <p className="text-gray-600 mb-4">
                  Toptan Baklava & Börek olarak müşterilerimizin verilerinin güvenliği bizim için en önemli önceliktir. 
                  Aşağıdaki güvenlik önlemlerini uyguluyoruz:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>SSL/TLS şifreleme ile tüm veri iletişimi</li>
                  <li>Güvenli ödeme işlemleri (Stripe entegrasyonu)</li>
                  <li>Rate limiting ve DDoS koruması</li>
                  <li>XSS ve SQL injection koruması</li>
                  <li>Content Security Policy (CSP) uygulaması</li>
                  <li>Düzenli güvenlik güncellemeleri</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Güvenlik Başlıkları
                </h2>
                <p className="text-gray-600 mb-4">
                  Sitemizde aşağıdaki güvenlik başlıkları uygulanmaktadır:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li><strong>X-Frame-Options:</strong> Clickjacking saldırılarına karşı koruma</li>
                  <li><strong>X-Content-Type-Options:</strong> MIME type sniffing koruması</li>
                  <li><strong>X-XSS-Protection:</strong> Cross-site scripting koruması</li>
                  <li><strong>Strict-Transport-Security:</strong> HTTPS zorunluluğu</li>
                  <li><strong>Content-Security-Policy:</strong> Kaynak yükleme kontrolü</li>
                  <li><strong>Referrer-Policy:</strong> Referrer bilgisi kontrolü</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Güvenlik Açığı Bildirimi
                </h2>
                <p className="text-gray-600 mb-4">
                  Güvenlik açığı tespit ederseniz, lütfen aşağıdaki kanallardan bizimle iletişime geçin:
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800">
                    <strong>E-posta:</strong> security@toptanbaklavaborek.com<br />
                    <strong>Telefon:</strong> +90 537 839 58 01<br />
                    <strong>Adres:</strong> İstanbul, Türkiye
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Veri Koruma
                </h2>
                <p className="text-gray-600 mb-4">
                  Müşteri verileriniz:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Şifrelenmiş olarak saklanır</li>
                  <li>Sadece gerekli personel tarafından erişilebilir</li>
                  <li>Yasal zorunluluk dışında üçüncü taraflarla paylaşılmaz</li>
                  <li>Düzenli olarak yedeklenir</li>
                  <li>Silme taleplerinde tamamen kaldırılır</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Ödeme Güvenliği
                </h2>
                <p className="text-gray-600 mb-4">
                  Ödeme işlemleriniz Stripe güvenlik standartları ile korunmaktadır:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>PCI DSS uyumluluğu</li>
                  <li>Kredi kartı bilgileri sunucularımızda saklanmaz</li>
                  <li>3D Secure doğrulama</li>
                  <li>Fraud detection sistemleri</li>
                  <li>Şifreli iletişim kanalları</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Güncellemeler
                </h2>
                <p className="text-gray-600">
                  Bu güvenlik politikası gerektiğinde güncellenebilir. 
                  Önemli değişiklikler olduğunda müşterilerimiz bilgilendirilecektir.
                </p>
              </section>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Son güncelleme: {new Date().toLocaleDateString('tr-TR')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
