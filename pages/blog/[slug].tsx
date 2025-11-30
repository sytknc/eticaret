import Layout from '../../components/Layout'
import { useRouter } from 'next/router'
import Link from 'next/link'
import blogData from '../../data/blog-posts.json'

type BlogPost = {
  id: string
  title: string
  excerpt: string
  content: string
  image: string
  category: 'tarif' | 'bilgi' | 'kultur'
  date: string
  readTime: string
  slug: string
  keywords?: string[]
  districts?: string[]
  metaDescription?: string
}

const blogPosts: BlogPost[] = blogData.posts.map(post => ({
  ...post,
  category: post.category as 'tarif' | 'bilgi' | 'kultur'
}))

type BlogPostProps = {
  post: BlogPost | null
}

export default function BlogPost({ post }: BlogPostProps) {
  const router = useRouter()

  const handleBackToBlog = () => {
    router.push('/blog')
  }

  const handleWhatsAppShare = () => {
    const url = `https://toptanbaklavaborek.com/blog/${post?.slug}`
    const text = post?.title || ''
    const shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`
    window.open(shareUrl, '_blank')
  }

  const handleFacebookShare = () => {
    const url = `https://toptanbaklavaborek.com/blog/${post?.slug}`
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    window.open(shareUrl, '_blank')
  }

  const handleTwitterShare = () => {
    const url = `https://toptanbaklavaborek.com/blog/${post?.slug}`
    const text = post?.title || ''
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
    window.open(shareUrl, '_blank')
  }

  if (!post) {
    return (
      <Layout title="Yazı Bulunamadı" description="Aradığınız blog yazısı bulunamadı.">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 bg-red-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Yazı Bulunamadı</h1>
            <p className="text-gray-600 mb-6">Aradığınız blog yazısı mevcut değil.</p>
            <button
              onClick={handleBackToBlog}
              className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors duration-200"
            >
              Blog'a Dön
            </button>
          </div>
        </div>
      </Layout>
    )
  }

  const categoryName = post.category === 'tarif' ? 'Tarif' :
                      post.category === 'bilgi' ? 'Bilgi' : 'Kültür'

  const keywords = [
    post.title,
    'baklava tarifi',
    'börek tarifi', 
    'Türk mutfağı',
    'İstanbul baklava',
    'İstanbul börek',
    categoryName,
    ...(post.keywords || [])
  ].join(', ')

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": `https://toptanbaklavaborek.com${post.image}`,
    "author": {
      "@type": "Organization",
      "name": "Toptan Baklava & Börek"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Toptan Baklava & Börek",
      "logo": {
        "@type": "ImageObject",
        "url": "https://toptanbaklavaborek.com/images/icon.png"
      }
    },
    "datePublished": post.date,
    "dateModified": post.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://toptanbaklavaborek.com/blog/${post.slug}`
    }
  }

  return (
    <Layout
      title={`${post.title} | Toptan Baklava Börek Blog`}
      description={post.metaDescription || post.excerpt}
      keywords={keywords}
      url={`https://toptanbaklavaborek.com/blog/${post.slug}`}
      image={`https://toptanbaklavaborek.com${post.image}`}
      type="article"
      canonical={`https://toptanbaklavaborek.com/blog/${post.slug}`}
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <ol className="flex items-center space-x-2 text-sm text-gray-600">
                <li>
                  <Link href="/blog" className="hover:text-amber-600 transition-colors duration-200">
                    Blog
                  </Link>
                </li>
                <li>
                  <span className="text-gray-400">/</span>
                </li>
                <li>
                  <span className="text-gray-900">{post.title}</span>
                </li>
              </ol>
            </nav>

            {/* Article Header */}
            <div className="text-center mb-6 md:mb-8">
              <div className="inline-block mb-3 md:mb-4">
                <span className={`px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium ${
                  post.category === 'tarif' ? 'bg-green-500 text-white' :
                  post.category === 'bilgi' ? 'bg-blue-500 text-white' :
                  'bg-purple-500 text-white'
                }`}>
                  {categoryName}
                </span>
              </div>
              
              <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                {post.title}
              </h1>
              
              <div className="flex flex-col sm:flex-row items-center justify-center text-gray-600 mb-4 md:mb-6 space-y-1 sm:space-y-0">
                <span className="text-sm md:text-base">{new Date(post.date).toLocaleDateString('tr-TR')}</span>
                <span className="hidden sm:inline mx-3">•</span>
                <span className="text-sm md:text-base">{post.readTime} okuma</span>
              </div>
              
              <p className="text-base md:text-xl text-gray-700 max-w-3xl mx-auto px-4 md:px-0">
                {post.excerpt}
              </p>
            </div>

            {/* Featured Image */}
            <div className="relative h-48 sm:h-64 md:h-96 rounded-xl md:rounded-2xl overflow-hidden shadow-xl">
              <img
                src={post.image}
                alt={post.title}
                title={post.title}
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
         </div>
       </div>
     </section>

     {/* Article Content */}
     <section className="py-8 md:py-16 bg-white">
       <div className="container mx-auto px-4">
         <div className="max-w-4xl mx-auto">
           <article className="prose prose-sm md:prose-lg max-w-none">
             <div 
               dangerouslySetInnerHTML={{ __html: post.content }}
               className="text-gray-800 leading-relaxed text-sm md:text-base"
             />
           </article>

           {/* Keywords Section */}
           {post.keywords && post.keywords.length > 0 && (
             <div className="mt-8 pt-6 border-t border-gray-200">
               <h3 className="text-lg font-semibold text-gray-900 mb-3">İlgili Konular:</h3>
               <div className="flex flex-wrap gap-2">
                 {post.keywords.map((keyword, index) => (
                   <span 
                     key={index}
                     className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm"
                   >
                     {keyword}
                   </span>
                 ))}
               </div>
             </div>
           )}

           {/* Share Section */}
           <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-200">
             <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
               <div className="w-full md:w-auto">
                 <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-2">Bu yazıyı paylaş:</h3>
                 <div className="flex flex-wrap gap-2 md:space-x-4">
                   <button
                     onClick={handleWhatsAppShare}
                     className="bg-green-500 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg hover:bg-green-600 transition-colors duration-200 text-sm md:text-base"
                   >
                     WhatsApp
                   </button>
                   <button
                     onClick={handleFacebookShare}
                     className="bg-blue-600 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm md:text-base"
                   >
                     Facebook
                   </button>
                   <button
                     onClick={handleTwitterShare}
                     className="bg-blue-400 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg hover:bg-blue-500 transition-colors duration-200 text-sm md:text-base"
                   >
                     Twitter
                   </button>
                 </div>
               </div>
               
               <button
                 onClick={handleBackToBlog}
                 className="bg-amber-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg hover:bg-amber-700 transition-colors duration-200 text-sm md:text-base w-full md:w-auto inline-block text-center"
               >
                 ← Blog'a Dön
               </button>
             </div>
           </div>
        </div>
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
              const message = "Merhaba! Baklava ve börek siparişi vermek istiyorum."
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

export async function getStaticPaths() {
  const paths = blogPosts.map((post) => ({
    params: { slug: post.slug },
  }))

  return {
    paths,
    fallback: false, // 404 for non-existent posts
  }
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug)

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      post,
    },
  }
}