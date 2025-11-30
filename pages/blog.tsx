import React, { useState } from 'react'
import Layout from '../components/Layout'
import Link from 'next/link'
import { useRouter } from 'next/router'
import blogData from '../data/blog-posts.json'

type BlogPost = {
  id: string
  title: string
  excerpt: string
  content: string
  image: string
  category: 'tarif' | 'bilgi' | 'kultur' | 'profesyonel'
  date: string
  readTime: string
  slug: string
  keywords?: string[]
  districts?: string[]
  metaDescription?: string
}

const blogPosts: BlogPost[] = blogData.posts.map(post => ({
  ...post,
  category: post.category as 'tarif' | 'bilgi' | 'kultur' | 'profesyonel'
}))

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all')
  const router = useRouter()

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    const matchesDistrict = selectedDistrict === 'all' || 
                           (post.districts && (post.districts.includes(selectedDistrict) || post.districts.includes('all')))
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (post.keywords && post.keywords.some(keyword => 
                           keyword.toLowerCase().includes(searchTerm.toLowerCase())
                         ))
    return matchesCategory && matchesSearch && matchesDistrict
  })

  const handlePostClick = (slug: string) => {
    router.push(`/blog/${slug}`)
  }

  const districts = [
    { value: 'all', label: 'Tüm İlçeler' },
    { value: 'kadikoy', label: 'Kadıköy' },
    { value: 'besiktas', label: 'Beşiktaş' },
    { value: 'uskudar', label: 'Üsküdar' },
    { value: 'fatih', label: 'Fatih' },
    { value: 'sisli', label: 'Şişli' },
    { value: 'bakirkoy', label: 'Bakırköy' },
    { value: 'beyoglu', label: 'Beyoğlu' }
  ]

  return (
    <Layout 
      title="Blog - İstanbul Baklava ve Börek Rehberi | Toptan Baklava Börek"
      description="İstanbul'un en iyi baklava ve börek mekanları, geleneksel Türk tatlıları, cevizli baklava, fıstıklı baklava, su böreği tarifleri. Kadıköy, Beşiktaş, Üsküdar, Fatih ve tüm ilçelerdeki en kaliteli tatlı kültürü rehberi."
      keywords="İstanbul baklava, İstanbul börek, Kadıköy baklava, Beşiktaş börek, Üsküdar fıstıklı baklava, Fatih geleneksel börek, Şişli modern fırın, Bakırköy fındıklı baklava, Beyoğlu tatlı, cevizli baklava tarifi, su böreği tarifi, Adana böreği, geleneksel Türk tatlıları, İstanbul tatlı kültürü, baklava toptan, börek toptan"
      url="https://toptanbaklavaborek.com/blog"
      image="https://toptanbaklavaborek.com/images/og-image.jpg"
      type="website"
      canonical="https://toptanbaklavaborek.com/blog"
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
              <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                İstanbul Baklava & Börek
              </span>
              <br />
              Blog & Rehber
            </h1>
            <p className="text-base md:text-xl lg:text-2xl text-gray-700 max-w-3xl mx-auto mb-6 md:mb-8 px-4 md:px-0">
              İstanbul'un en iyi baklava ve börek mekanları, geleneksel Türk tatlıları ve her ilçenin özel lezzetleri
            </p>
           
            {/* Search and Filter */}
            <div className="max-w-2xl mx-auto space-y-4 px-4 md:px-0">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Baklava, börek, ilçe veya tarif ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 md:px-6 py-3 md:py-4 rounded-xl border-2 border-amber-200 focus:border-amber-500 focus:outline-none text-base md:text-lg"
                />
                <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              {/* District Filter */}
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {districts.map((district) => (
                  <button
                    key={district.value}
                    onClick={() => setSelectedDistrict(district.value)}
                    className={`px-3 py-2 rounded-lg font-medium transition-colors duration-200 text-sm ${
                      selectedDistrict === district.value 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-white text-gray-700 hover:bg-blue-50'
                    }`}
                  >
                    {district.label}
                  </button>
                ))}
              </div>
              
              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-2 md:px-4 md:py-2 rounded-lg font-medium transition-colors duration-200 text-sm md:text-base ${
                    selectedCategory === 'all' 
                      ? 'bg-amber-600 text-white' 
                      : 'bg-white text-gray-700 hover:bg-amber-50'
                  }`}
                >
                  Tümü
                </button>
                <button
                  onClick={() => setSelectedCategory('tarif')}
                  className={`px-3 py-2 md:px-4 md:py-2 rounded-lg font-medium transition-colors duration-200 text-sm md:text-base ${
                    selectedCategory === 'tarif' 
                      ? 'bg-amber-600 text-white' 
                      : 'bg-white text-gray-700 hover:bg-amber-50'
                  }`}
                >
                  Tarifler
                </button>
                <button
                  onClick={() => setSelectedCategory('bilgi')}
                  className={`px-3 py-2 md:px-4 md:py-2 rounded-lg font-medium transition-colors duration-200 text-sm md:text-base ${
                    selectedCategory === 'bilgi' 
                      ? 'bg-amber-600 text-white' 
                      : 'bg-white text-gray-700 hover:bg-amber-50'
                  }`}
                >
                  Bilgiler
                </button>
                <button
                  onClick={() => setSelectedCategory('kultur')}
                  className={`px-3 py-2 md:px-4 md:py-2 rounded-lg font-medium transition-colors duration-200 text-sm md:text-base ${
                    selectedCategory === 'kultur' 
                      ? 'bg-amber-600 text-white' 
                      : 'bg-white text-gray-700 hover:bg-amber-50'
                  }`}
                >
                  Kültür
                </button>
                <button
                  onClick={() => setSelectedCategory('profesyonel')}
                  className={`px-3 py-2 md:px-4 md:py-2 rounded-lg font-medium transition-colors duration-200 text-sm md:text-base ${
                    selectedCategory === 'profesyonel' 
                      ? 'bg-amber-600 text-white' 
                      : 'bg-white text-gray-700 hover:bg-amber-50'
                  }`}
                >
                  Profesyonel
                </button>
              </div>
            </div>
         </div>
       </div>
     </section>

     {/* Blog Posts */}
     <section className="py-8 md:py-16 bg-white">
       <div className="container mx-auto px-4">
         {filteredPosts.length === 0 ? (
           <div className="text-center py-8 md:py-12">
             <div className="w-16 h-16 md:w-24 md:h-24 bg-amber-100 rounded-full mx-auto mb-4 md:mb-6 flex items-center justify-center">
               <svg className="w-8 h-8 md:w-12 md:h-12 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
               </svg>
             </div>
             <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">Sonuç Bulunamadı</h3>
             <p className="text-sm md:text-base text-gray-600">Arama kriterlerinize uygun yazı bulunamadı.</p>
           </div>
         ) : (
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {filteredPosts.map((post) => (
              <article 
                key={post.id} 
                className="bg-white rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden group border border-gray-100 cursor-pointer"
                onClick={() => handlePostClick(post.slug)}
              >
                {/* Image */}
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={`${post.title} - ${post.category === 'tarif' ? 'Tarif Görseli' : post.category === 'bilgi' ? 'Bilgi Görseli' : 'Kültür Görseli'}`}
                    title={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                 <div className="absolute top-3 left-3 md:top-4 md:left-4">
                   <span className={`px-2 py-1 md:px-3 md:py-1 rounded-full text-xs font-medium ${
                     post.category === 'tarif' ? 'bg-green-500 text-white' :
                     post.category === 'bilgi' ? 'bg-blue-500 text-white' :
                     'bg-purple-500 text-white'
                   }`}>
                     {post.category === 'tarif' ? 'Tarif' :
                      post.category === 'bilgi' ? 'Bilgi' : 'Kültür'}
                   </span>
                 </div>
               </div>
               
               {/* Content */}
               <div className="p-4 md:p-6">
                 <div className="flex items-center text-xs md:text-sm text-gray-500 mb-2 md:mb-3">
                   <span>{new Date(post.date).toLocaleDateString('tr-TR')}</span>
                   <span className="mx-2">•</span>
                   <span>{post.readTime} okuma</span>
                 </div>
                 
                 <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3 group-hover:text-amber-600 transition-colors duration-200 leading-tight">
                   {post.title}
                 </h2>
                 
                 <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4 line-clamp-3">
                   {post.excerpt}
                 </p>
                 
                 <button 
                   onClick={(e) => {
                     e.stopPropagation()
                     handlePostClick(post.slug)
                   }}
                   className="text-amber-600 hover:text-amber-700 font-medium transition-colors duration-200 text-sm md:text-base"
                 >
                   Devamını Oku →
                 </button>
               </div>
             </article>
           ))}
         </div>
       )}
     </div>
   </section>

   {/* CTA Section */}
   <section className="py-8 md:py-16 bg-gradient-to-r from-amber-600 via-yellow-500 to-orange-600">
     <div className="container mx-auto px-4 text-center text-white">
       <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
         Lezzeti Geciktirmeyin!
       </h2>
       <p className="text-base md:text-xl mb-6 md:mb-8 opacity-90">
         Taze baklava ve börek siparişi için hemen iletişime geçin
       </p>
       <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
         <button
           onClick={() => {
             const message = "Merhaba. Ürünleriniz hakkında bilgi almak istiyorum."
             const whatsappUrl = `https://wa.me/905378395801?text=${encodeURIComponent(message)}`
             window.open(whatsappUrl, '_blank')
           }}
           className="bg-white text-amber-700 px-6 py-3 md:px-8 md:py-4 rounded-xl font-bold text-base md:text-lg hover:bg-amber-50 transition-all duration-200 transform hover:scale-105"
         >
           📱 WhatsApp'tan Sipariş Ver
         </button>
         <button
           onClick={() => {
             window.location.href = 'tel:+905378395801'
           }}
           className="border-2 border-white text-white px-6 py-3 md:px-8 md:py-4 rounded-xl font-bold text-base md:text-lg hover:bg-white hover:text-amber-700 transition-all duration-200 transform hover:scale-105"
         >
           📞 Hemen Ara
         </button>
       </div>
     </div>
   </section>
 </Layout>
)
}