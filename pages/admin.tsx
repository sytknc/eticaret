import React, { useEffect, useMemo, useState } from 'react'
import Layout from '../components/Layout'

interface ProductRow {
  id: string
  name: string
  category: string
  price: number
  stock: number
  status: 'active' | 'draft'
  margin: number
  featured: boolean
}

interface OrderRow {
  id: string
  customer: string
  total: number
  status: 'hazırlanıyor' | 'yolda' | 'teslim edildi'
  deliveryArea: string
  payment: 'kredi kartı' | 'kapıda ödeme' | 'havale'
}

const toneStyles: Record<string, { text: string; bg: string; ring: string; bar: string }> = {
  emerald: {
    text: 'text-emerald-700',
    bg: 'bg-emerald-50',
    ring: 'ring-emerald-100',
    bar: 'bg-emerald-500'
  },
  amber: {
    text: 'text-amber-700',
    bg: 'bg-amber-50',
    ring: 'ring-amber-100',
    bar: 'bg-amber-500'
  },
  cyan: {
    text: 'text-cyan-700',
    bg: 'bg-cyan-50',
    ring: 'ring-cyan-100',
    bar: 'bg-cyan-500'
  },
  purple: {
    text: 'text-purple-700',
    bg: 'bg-purple-50',
    ring: 'ring-purple-100',
    bar: 'bg-purple-500'
  },
  blue: {
    text: 'text-blue-700',
    bg: 'bg-blue-50',
    ring: 'ring-blue-100',
    bar: 'bg-blue-500'
  }
}

export default function AdminPage() {
  const [products, setProducts] = useState<ProductRow[]>([])
  const [orders, setOrders] = useState<OrderRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [connection, setConnection] = useState({
    host: 'db.gbupsyjaimsxfwtwvygb.supabase.co',
    port: '5432',
    name: 'postgres',
    user: 'postgres',
    password: '••••••••',
    provider: 'postgresql'
  })

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [productsResponse, ordersResponse] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/orders')
        ])

        if (!productsResponse.ok || !ordersResponse.ok) {
          throw new Error('API yanıtı alınamadı')
        }

        const productsData = await productsResponse.json()
        const ordersData = await ordersResponse.json()

        setProducts(
          productsData.map((product: any) => ({
            id: product.id,
            name: product.name,
            category: product.category || 'Genel',
            price: product.price,
            stock: product.stock || 0,
            status: product.status || 'active',
            margin: product.margin || 30,
            featured: product.featured ?? false
          }))
        )

        setOrders(ordersData)
      } catch (err) {
        console.error('Yönetim paneli verileri çekilirken hata oluştu.', err)
        setError('Supabase bağlantısı kurulamadı, statik verilere dönüldü.')
        setProducts([
          {
            id: 'P-1001',
            name: 'Fıstıklı Baklava 3.5kg',
            category: 'Baklava',
            price: 1650,
            stock: 42,
            status: 'active',
            margin: 38,
            featured: true
          },
          {
            id: 'P-1002',
            name: 'Cevizli Baklava 3.5kg',
            category: 'Baklava',
            price: 1350,
            stock: 65,
            status: 'active',
            margin: 33,
            featured: false
          },
          {
            id: 'P-2001',
            name: 'Su Böreği 2kg',
            category: 'Börek',
            price: 1100,
            stock: 28,
            status: 'draft',
            margin: 41,
            featured: false
          }
        ])

        setOrders([
          {
            id: '#ORD-5432',
            customer: 'Ayşe Yılmaz',
            total: 5400,
            status: 'teslim edildi',
            deliveryArea: 'Beşiktaş',
            payment: 'kredi kartı'
          },
          {
            id: '#ORD-5431',
            customer: 'Efe Kara',
            total: 3250,
            status: 'yolda',
            deliveryArea: 'Ataşehir',
            payment: 'kapıda ödeme'
          },
          {
            id: '#ORD-5428',
            customer: 'Melisa Tan',
            total: 2675,
            status: 'hazırlanıyor',
            deliveryArea: 'Bağcılar',
            payment: 'havale'
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    loadDashboard()
  }, [])

  const profitability = useMemo(() => {
    const activeProducts = products.filter((product) => product.status === 'active')
    const averageMargin =
      activeProducts.reduce((sum, product) => sum + product.margin, 0) /
      (activeProducts.length || 1)

    const forecast = activeProducts.reduce((sum, product) => sum + product.price * product.stock * 0.35, 0)

    return {
      averageMargin,
      forecast
    }
  }, [products])

  const toggleProductStatus = (id: string) => {
    setProducts((current) =>
      current.map((product) =>
        product.id === id
          ? {
              ...product,
              status: product.status === 'active' ? 'draft' : 'active'
            }
          : product
      )
    )
  }

  const toggleFeatured = (id: string) => {
    setProducts((current) =>
      current.map((product) =>
        product.id === id
          ? {
              ...product,
              featured: !product.featured
            }
          : product
      )
    )
  }

  const updatePrice = (id: string, value: number) => {
    setProducts((current) =>
      current.map((product) => (product.id === id ? { ...product, price: value } : product))
    )
  }

  return (
    <Layout
      title="Yönetim Paneli | Baklava & Börek"
      description="Ürün, sipariş, teslimat ve altyapı süreçlerini merkezi olarak yönetin."
      noindex
    >
      <div className="mx-auto max-w-7xl px-4 py-12 space-y-8">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-wide text-amber-600">Pro Kontrol Masası</p>
            <h1 className="text-3xl font-bold text-gray-900">Baklava & Börek Yönetim Paneli</h1>
            <p className="text-gray-600">
              Operasyon, içerik, teslimat ve altyapı ayarlarını tek ekrandan yönetin.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700">
              Canlı Ortama Gönder
            </button>
            <button className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:border-amber-400 hover:text-amber-700">
              Taslak Olarak Kaydet
            </button>
            <button className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:border-red-300 hover:text-red-600">
              Bakım Moduna Al
            </button>
          </div>
        </header>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {loading && !error && (
          <div className="flex items-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-700">
            <span className="h-3 w-3 animate-pulse rounded-full bg-blue-500" aria-hidden />
            Supabase verileri yükleniyor...
          </div>
        )}

        <section className="grid gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 md:grid-cols-4">
          {[{ title: 'Günlük Ciro', value: '₺68.400', badge: '+12% Aylık', tone: 'emerald' },
            { title: 'Aktif Sipariş', value: '126', badge: '12 teslimat yolda', tone: 'amber' },
            { title: 'Stok Sağlığı', value: '92%', badge: 'Kritik: 3 ürün', tone: 'cyan' },
            { title: 'Ortalama Marj', value: `${profitability.averageMargin.toFixed(1)}%`, badge: 'Tüm aktif ürünler', tone: 'purple' }
          ].map((item) => {
            const tones = toneStyles[item.tone]
            return (
            <div key={item.title} className="space-y-3 rounded-xl border border-gray-100 bg-gradient-to-br from-amber-50/50 to-white p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-600">{item.title}</p>
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-semibold ${tones.text} ${tones.bg} ${tones.ring}`}
                >
                  {item.badge}
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{item.value}</p>
              <div className="h-1.5 rounded-full bg-gray-100">
                <div className={`h-full w-3/4 rounded-full ${tones.bar}`}></div>
              </div>
            </div>
            )
          })}
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Ürün & Fiyat Yönetimi</h2>
                <p className="text-sm text-gray-600">Stok, marj ve öne çıkarma ayarlarını canlı olarak güncelleyin.</p>
              </div>
              <button className="rounded-lg bg-amber-600 px-3 py-2 text-sm font-semibold text-white hover:bg-amber-700">Yeni Ürün</button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Ürün</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Kategori</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Fiyat</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Stok</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Marj</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Durum</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">İşlem</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-amber-50/50">
                      <td className="px-3 py-3">
                        <div className="font-semibold text-gray-900">{product.name}</div>
                        <div className="text-xs text-gray-500">{product.id}</div>
                      </td>
                      <td className="px-3 py-3 text-gray-700">{product.category}</td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-900 font-semibold">₺{product.price.toLocaleString('tr-TR')}</span>
                          <input
                            type="number"
                            className="w-24 rounded-md border border-gray-200 px-2 py-1 text-sm focus:border-amber-500 focus:outline-none"
                            value={product.price}
                            onChange={(event) => updatePrice(product.id, Number(event.target.value))}
                          />
                        </div>
                      </td>
                      <td className="px-3 py-3 text-gray-700">{product.stock} kg</td>
                      <td className="px-3 py-3 text-gray-700">%{product.margin}</td>
                      <td className="px-3 py-3">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            product.status === 'active'
                              ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100'
                              : 'bg-gray-100 text-gray-700 ring-1 ring-gray-200'
                          }`}
                        >
                          {product.status === 'active' ? 'Aktif' : 'Taslak'}
                        </span>
                      </td>
                      <td className="px-3 py-3 space-x-2 text-right text-sm">
                        <button
                          className="rounded-md border border-gray-200 px-3 py-1 font-semibold text-gray-700 hover:border-amber-400 hover:text-amber-700"
                          onClick={() => toggleProductStatus(product.id)}
                        >
                          Durum
                        </button>
                        <button
                          className={`rounded-md px-3 py-1 font-semibold ${
                            product.featured
                              ? 'bg-purple-600 text-white hover:bg-purple-700'
                              : 'border border-gray-200 text-gray-700 hover:border-purple-300 hover:text-purple-700'
                          }`}
                          onClick={() => toggleFeatured(product.id)}
                        >
                          {product.featured ? 'Öne Çıkarılıyor' : 'Öne Çıkar'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Operasyon Kontrolleri</h3>
                <p className="text-sm text-gray-600">Kritik işlemler için hızlı kısayollar.</p>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
                Canlı
              </span>
            </div>
            <div className="grid gap-3 text-sm">
              <button className="flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3 font-semibold text-gray-800 hover:border-emerald-200 hover:bg-emerald-50">
                <span>Whatsapp kanalını güncelle</span>
                <span className="text-emerald-600">Aktif</span>
              </button>
              <button className="flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3 font-semibold text-gray-800 hover:border-amber-200 hover:bg-amber-50">
                <span>Fiyat listesi PDF indir</span>
                <span className="text-amber-600">Güncel</span>
              </button>
              <button className="flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3 font-semibold text-gray-800 hover:border-blue-200 hover:bg-blue-50">
                <span>Site önbelleğini temizle</span>
                <span className="text-blue-600">Hazır</span>
              </button>
              <button className="flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3 font-semibold text-gray-800 hover:border-red-200 hover:bg-red-50">
                <span>Bakım modunu planla</span>
                <span className="text-red-600">Saat 02:00</span>
              </button>
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Teslimat & İlçe Yönetimi</h3>
                <p className="text-sm text-gray-600">39 ilçe kapsama, minimum sepet ve teslimat ücreti kontrolleri.</p>
              </div>
              <button className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 hover:border-amber-300 hover:text-amber-700">
                Bölge Ekle
              </button>
            </div>
            <div className="space-y-3">
              {[
                { name: 'Avrupa Yakası', fee: 500, minimum: 0, sla: 'Aynı gün', risk: 'orta' },
                { name: 'Anadolu Yakası', fee: 300, minimum: 0, sla: 'Aynı gün', risk: 'düşük' },
                { name: 'Merkez (Beşiktaş, Şişli)', fee: 0, minimum: 500, sla: '2 saat', risk: 'kritik' }
              ].map((zone) => (
                <div
                  key={zone.name}
                  className="flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3 hover:border-amber-200 hover:bg-amber-50/60"
                >
                  <div>
                    <div className="font-semibold text-gray-900">{zone.name}</div>
                    <p className="text-xs text-gray-600">Teslimat: ₺{zone.fee} · Minimum: ₺{zone.minimum} · SLA: {zone.sla}</p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      zone.risk === 'kritik'
                        ? 'bg-red-50 text-red-700 ring-1 ring-red-100'
                        : zone.risk === 'orta'
                        ? 'bg-amber-50 text-amber-700 ring-1 ring-amber-100'
                        : 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100'
                    }`}
                  >
                    {zone.risk === 'kritik' ? 'Yoğunluk' : zone.risk === 'orta' ? 'İzleniyor' : 'Stabil'}
                  </span>
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-dashed border-amber-200 bg-amber-50/40 p-4 text-sm text-amber-800">
              Kapasiteyi aşan siparişlerde sistem otomatik olarak en yakın şubeye yönlendirilir.
            </div>
          </div>

          <div className="space-y-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Veritabanı & Entegrasyon</h3>
                <p className="text-sm text-gray-600">Canlı bağlantı, kullanıcı ve replikasyon ayarları.</p>
              </div>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 ring-1 ring-blue-100">
                Çoklu Bölge
              </span>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <label className="space-y-1 text-sm">
                <span className="text-gray-700">Sunucu</span>
                <input
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-amber-500 focus:outline-none"
                  value={connection.host}
                  onChange={(event) => setConnection({ ...connection, host: event.target.value })}
                />
              </label>
              <label className="space-y-1 text-sm">
                <span className="text-gray-700">Port</span>
                <input
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-amber-500 focus:outline-none"
                  value={connection.port}
                  onChange={(event) => setConnection({ ...connection, port: event.target.value })}
                />
              </label>
              <label className="space-y-1 text-sm">
                <span className="text-gray-700">Veritabanı</span>
                <input
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-amber-500 focus:outline-none"
                  value={connection.name}
                  onChange={(event) => setConnection({ ...connection, name: event.target.value })}
                />
              </label>
              <label className="space-y-1 text-sm">
                <span className="text-gray-700">Kullanıcı</span>
                <input
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-amber-500 focus:outline-none"
                  value={connection.user}
                  onChange={(event) => setConnection({ ...connection, user: event.target.value })}
                />
              </label>
              <label className="space-y-1 text-sm md:col-span-2">
                <span className="text-gray-700">Şifre</span>
                <input
                  type="password"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-amber-500 focus:outline-none"
                  value={connection.password}
                  onChange={(event) => setConnection({ ...connection, password: event.target.value })}
                />
              </label>
              <label className="space-y-1 text-sm">
                <span className="text-gray-700">Sağlayıcı</span>
                <select
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-amber-500 focus:outline-none"
                  value={connection.provider}
                  onChange={(event) => setConnection({ ...connection, provider: event.target.value })}
                >
                  <option value="postgresql">PostgreSQL (Önerilen)</option>
                  <option value="mysql">MySQL</option>
                  <option value="mssql">SQL Server</option>
                </select>
              </label>
              <div className="space-y-2 rounded-lg bg-gray-50 p-3 text-sm text-gray-700">
                <div className="flex items-center justify-between">
                  <span>Replikasyon</span>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">Aktif</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Yedekleme</span>
                  <span className="text-gray-900 font-semibold">02:00, 14:00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Bağlantı Dizisi</span>
                  <span className="font-mono text-xs text-gray-500">{connection.provider}://{connection.user}@{connection.host}:{connection.port}/{connection.name}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="flex-1 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">
                Bağlantıyı Güncelle
              </button>
              <button className="flex-1 rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:border-red-300 hover:text-red-600">
                Replikasyonu Test Et
              </button>
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Sipariş Akışı</h3>
                <p className="text-sm text-gray-600">Operasyon ekibi için güncel durum ve teslimat öncelikleri.</p>
              </div>
              <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-100">
                15 dk&apos;da güncellenir
              </span>
            </div>
            <div className="overflow-hidden rounded-xl border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Sipariş</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Müşteri</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Tutar</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Teslimat</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Ödeme</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-amber-50/40">
                      <td className="px-3 py-3">
                        <div className="font-semibold text-gray-900">{order.id}</div>
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                            order.status === 'teslim edildi'
                              ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100'
                              : order.status === 'yolda'
                              ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-100'
                              : 'bg-amber-50 text-amber-700 ring-1 ring-amber-100'
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-gray-800">{order.customer}</td>
                      <td className="px-3 py-3 font-semibold text-gray-900">₺{order.total.toLocaleString('tr-TR')}</td>
                      <td className="px-3 py-3 text-gray-700">{order.deliveryArea}</td>
                      <td className="px-3 py-3 text-gray-700">{order.payment}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3 text-sm">
              <div>
                <div className="font-semibold text-gray-900">Tahmini Üretim Planı</div>
                <p className="text-gray-600">Önümüzdeki 24 saat için beklenen teslimat: {profitability.forecast.toLocaleString('tr-TR', { maximumFractionDigits: 0 })}₺</p>
              </div>
              <button className="rounded-lg border border-gray-200 px-3 py-2 font-semibold text-gray-700 hover:border-amber-300 hover:text-amber-700">
                Üretimi Optimize Et
              </button>
            </div>
          </div>

          <div className="space-y-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">İçerik & SEO Kontrolü</h3>
                <p className="text-sm text-gray-600">Blog, landing ve şube sayfaları için hızlı düzenlemeler.</p>
              </div>
              <button className="rounded-lg bg-purple-600 px-3 py-2 text-sm font-semibold text-white hover:bg-purple-700">
                Yeni İçerik
              </button>
            </div>
            <div className="grid gap-3 text-sm">
              {[{ title: 'Blog', status: '3 içerik planlandı', tone: 'purple' },
                { title: 'Landing', status: '39 ilçe SEO hazır', tone: 'emerald' },
                { title: 'Kurumsal', status: 'Toplu PDF güncellendi', tone: 'blue' }
              ].map((item) => {
                const tones = toneStyles[item.tone]
                return (
                <div
                  key={item.title}
                  className="flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3 hover:border-amber-200 hover:bg-amber-50/60"
                >
                  <div>
                    <div className="font-semibold text-gray-900">{item.title}</div>
                    <p className="text-xs text-gray-600">{item.status}</p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${tones.text} ${tones.bg} ${tones.ring}`}
                  >
                    Yayında
                  </span>
                </div>
                )
              })}
            </div>
            <div className="rounded-xl bg-gray-50 p-4">
              <div className="text-xs uppercase tracking-wide text-gray-500">Rich Snippet Önizlemesi</div>
              <div className="mt-3 rounded-lg border border-gray-200 bg-white p-4 shadow-inner">
                <p className="text-xs text-gray-500">toptanbaklavaborek.com › teslimat › istanbul</p>
                <p className="text-lg font-semibold text-blue-700">İstanbul 39 İlçe Aynı Gün Teslimat</p>
                <p className="text-sm text-gray-700">
                  3.5kg baklava tepsileri, su böreği ve özel gün siparişlerinde hızlı teslimat. WhatsApp&apos;tan canlı destek.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
