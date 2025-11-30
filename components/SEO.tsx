import React from 'react'
import Head from 'next/head'

interface SEOProps {
  title: string
  description: string
  keywords?: string
  url?: string
  image?: string
  type?: 'website' | 'article' | 'product'
  structuredData?: any
  canonical?: string
  noindex?: boolean
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
  tags?: string[]
}

export default function SEO({
  title,
  description,
  keywords,
  url = '',
  image = '',
  type = 'website',
  structuredData,
  canonical,
  noindex = false,
  publishedTime,
  modifiedTime,
  author = 'Toptan Baklava & Börek',
  section,
  tags = []
}: SEOProps) {
  const fullTitle = `${title} - Toptan Baklava & Börek | İstanbul'un En Kaliteli Baklava ve Börek Evi | +90 537 839 58 01`
  const fullDescription = `${description} 3.5kg tepsi boyutunda günlük taze üretim. Düğün, cenaze, ofis siparişleri için profesyonel çözümler. Anadolu Yakası ₺300, Avrupa Yakası ₺500 teslimat. WhatsApp: +90 537 839 58 01`
  
  // Default structured data for bakery
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    "name": "Toptan Baklava & Börek",
    "description": "İstanbul'un en kaliteli baklava ve börek evi. 3.5kg tepsi boyutunda günlük taze üretim.",
    "url": "https://toptanbaklavaborek.com",
    "telephone": "+905378395801",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "İstanbul",
      "addressCountry": "TR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "41.0082",
      "longitude": "28.9784"
    },
    "openingHours": "Mo-Su 08:00-20:00",
    "priceRange": "₺₺",
    "servesCuisine": ["Turkish", "Baklava", "Börek"],
    "hasMenu": "https://toptanbaklavaborek.com/menu",
    "acceptsReservations": true,
    "deliveryAvailable": true,
    "sameAs": [
      "https://wa.me/905378395801"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "156",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Ahmet Yılmaz"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "Mükemmel kalitede baklava ve börek. Düğünümüzde kullandık, herkes çok beğendi. Kesinlikle tavsiye ederim."
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Fatma Kaya"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "Ofis siparişlerimiz için kullanıyoruz. Taze ve lezzetli ürünler. Teslimat da çok hızlı."
      }
    ],
    "menu": [
      {
        "@type": "MenuItem",
        "name": "Cevizli Baklava",
        "description": "Klasik cevizli baklava. 3.5kg tepsi boyutunda taze ceviz ve tereyağı ile hazırlanmış geleneksel lezzet.",
        "offers": {
          "@type": "Offer",
          "price": "1500",
          "priceCurrency": "TRY"
        }
      },
      {
        "@type": "MenuItem",
        "name": "Su Böreği Peynirli",
        "description": "Katman katman hazırlanmış peynirli su böreği. 3.5kg tepsi boyutunda yaklaşık 40 dilim.",
        "offers": {
          "@type": "Offer",
          "price": "1250",
          "priceCurrency": "TRY"
        }
      },
      {
        "@type": "MenuItem",
        "name": "Adana Böreği",
        "description": "Adana usulü özel baharatlarla hazırlanmış peynirli börek. 3.5kg tepsi boyutunda geleneksel tarifle el yapımı.",
        "offers": {
          "@type": "Offer",
          "price": "1250",
          "priceCurrency": "TRY"
        }
      },
      {
        "@type": "MenuItem",
        "name": "Fıstıklı Baklava",
        "description": "Premium Antep fıstığı ile hazırlanmış özel baklava. 3.5kg tepsi boyutunda geleneksel tarifle el yapımı.",
        "offers": {
          "@type": "Offer",
          "price": "3000",
          "priceCurrency": "TRY"
        }
      },
      {
        "@type": "MenuItem",
        "name": "Fındıklı Baklava",
        "description": "Giresun fındığı ile hazırlanmış özel baklava. 3.5kg tepsi boyutunda geleneksel tarifle el yapımı.",
        "offers": {
          "@type": "Offer",
          "price": "2250",
          "priceCurrency": "TRY"
        }
      }
    ]
  }

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={keywords || "toptan baklava, toptan börek, baklava istanbul, börek istanbul, geleneksel baklava, tereyağlı börek, el yapımı baklava, taze börek, baklava siparişi, börek siparişi, istanbul baklava, günlük taze üretim, 3.5kg tepsi baklava, düğün baklava, cenaze baklava, ofis baklava, plaza baklava, toplu sipariş baklava, wholesale baklava, wholesale borek, baklava toptan satış, börek toptan satış, cevizli baklava 1500 tl, fıstıklı baklava 3000 tl, fındıklı baklava 2250 tl, su böreği 1250 tl, adana böreği 1250 tl, otel baklava tedariki, restoran börek tedariki, profesyonel yemek hizmeti, +90 537 839 58 01"} />
      <meta name="author" content={author} />
      <meta name="robots" content={noindex ? "noindex,nofollow" : "index,follow"} />
      <meta name="googlebot" content={noindex ? "noindex,nofollow" : "index,follow"} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical || url} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image || "https://toptanbaklavaborek.com/images/icon.png"} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Toptan Baklava & Börek - İstanbul'un En Kaliteli Baklava ve Börek Evi | WhatsApp: +90 537 839 58 01" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:secure_url" content={image || "https://toptanbaklavaborek.com/images/icon.png"} />
      <meta property="og:site_name" content="Toptan Baklava & Börek" />
      <meta property="og:locale" content="tr_TR" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={image || "https://toptanbaklavaborek.com/images/icon.png"} />
      <meta name="twitter:image:alt" content="Toptan Baklava & Börek - İstanbul'un En Kaliteli Baklava ve Börek Evi | WhatsApp: +90 537 839 58 01" />
      <meta name="twitter:creator" content="@toptanbaklava" />
      <meta name="twitter:site" content="@toptanbaklava" />
      
      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#f59e0b" />
      <meta name="msapplication-TileColor" content="#f59e0b" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Toptan Baklava" />
      
      {/* İstanbul ve Türkiye SEO Meta Tags */}
      <meta name="geo.region" content="TR-34" />
      <meta name="geo.placename" content="İstanbul" />
      <meta name="geo.position" content="41.0082;28.9784" />
      <meta name="ICBM" content="41.0082, 28.9784" />
      <meta name="language" content="tr" />
      <meta httpEquiv="Content-Language" content="tr" />
      <meta name="country" content="Türkiye" />
      <meta name="city" content="İstanbul" />
      
      {/* Sosyal Medya Meta Tags */}
      <meta name="twitter:site" content="@toptanbaklava" />
      <meta name="twitter:creator" content="@toptanbaklava" />
      <meta property="og:site_name" content="Toptan Baklava & Börek" />
      <meta property="og:locale" content="tr_TR" />
      <meta property="og:locale:alternate" content="en_US" />
      
      {/* LinkedIn Meta Tags */}
      <meta property="linkedin:owner" content="toptanbaklava" />
      <meta property="linkedin:page_id" content="toptanbaklava" />
      
      {/* Pinterest Meta Tags */}
      <meta name="pinterest-rich-pin" content="true" />
      <meta name="pinterest:description" content="İstanbul'un en kaliteli toptan baklava ve börek evi. 3.5kg tepsi boyutunda günlük taze üretim. WhatsApp: +90 537 839 58 01" />
      
      {/* TikTok Meta Tags */}
      <meta name="tiktok:creator" content="@toptanbaklava" />
      <meta name="tiktok:site" content="@toptanbaklava" />
      
      {/* WhatsApp ve Telegram Meta Tags */}
      <meta name="whatsapp:phone" content="+905378395801" />
      <meta name="telegram:channel" content="@toptanbaklava" />
      <meta name="instagram:username" content="toptanbaklava" />
      
      {/* İş Meta Tags */}
      <meta name="business:contact_data:street_address" content="İstanbul, Türkiye" />
      <meta name="business:contact_data:locality" content="İstanbul" />
      <meta name="business:contact_data:postal_code" content="34000" />
      <meta name="business:contact_data:country_name" content="Türkiye" />
      <meta name="business:contact_data:phone_number" content="+905378395801" />
      <meta name="business:contact_data:website" content="https://toptanbaklavaborek.com" />
      
      {/* Article specific meta tags */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
      {type === 'article' && section && (
        <meta property="article:section" content={section} />
      )}
      {type === 'article' && tags.length > 0 && (
        tags.map((tag, index) => (
          <meta key={index} property="article:tag" content={tag} />
        ))
      )}
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData || defaultStructuredData)
        }}
      />
      
      {/* Additional Structured Data for Local Business */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Toptan Baklava & Börek",
            "image": "https://toptanbaklavaborek.com/images/bakery-front.jpg",
            "description": "İstanbul'un en kaliteli baklava ve börek evi. 3.5kg tepsi boyutunda günlük taze üretim.",
            "url": "https://toptanbaklavaborek.com",
            "telephone": "+905378395801",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "İstanbul, Türkiye",
              "addressLocality": "İstanbul",
              "addressRegion": "İstanbul",
              "postalCode": "34000",
              "addressCountry": "TR"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "41.0082",
              "longitude": "28.9784"
            },
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                "opens": "08:00",
                "closes": "20:00"
              }
            ],
            "priceRange": "₺₺",
            "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer"],
            "currenciesAccepted": "TRY",
            "deliveryAvailable": true,
            "pickupAvailable": true,
            "areaServed": {
              "@type": "City",
              "name": "İstanbul"
            },
            "serviceArea": {
              "@type": "City",
              "name": "İstanbul"
            }
          })
        }}
      />
      
      {/* FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Baklava ve börek siparişi nasıl verebilirim?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "WhatsApp üzerinden veya telefon ile sipariş verebilirsiniz. 3.5kg tepsi boyutunda ürünlerimiz mevcuttur."
                }
              },
              {
                "@type": "Question",
                "name": "Teslimat ücreti ne kadar?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Anadolu Yakası ₺300, Avrupa Yakası ₺500 teslimat ücreti alınmaktadır."
                }
              },
              {
                "@type": "Question",
                "name": "Hangi ürünler mevcut?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Cevizli Baklava (₺1.500), Su Böreği Peynirli (₺1.250), Adana Böreği (₺1.250), Fıstıklı Baklava (₺3.000), Fındıklı Baklava (₺2.250) ürünlerimiz mevcuttur."
                }
              },
              {
                "@type": "Question",
                "name": "Toplu sipariş veriyor musunuz?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Evet, düğün, cenaze, ofis ve plaza siparişleri için toplu üretim yapıyoruz."
                }
              },
              {
                "@type": "Question",
                "name": "Minimum sipariş miktarı nedir?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "3.5kg tepsi boyutunda minimum sipariş alıyoruz. Toplu siparişler için özel fiyatlandırma yapıyoruz."
                }
              },
              {
                "@type": "Question",
                "name": "Hangi bölgelere teslimat yapıyorsunuz?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "İstanbul'un tüm ilçelerine teslimat yapıyoruz. Anadolu Yakası ₺300, Avrupa Yakası ₺500 teslimat ücreti."
                }
              },
              {
                "@type": "Question",
                "name": "Sipariş vermek için nasıl iletişime geçebilirim?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "WhatsApp: +90 537 839 58 01 veya telefon ile sipariş verebilirsiniz. Aynı gün teslimat mümkündür."
                }
              }
            ]
          })
        }}
      />
      
      {/* Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Ana Sayfa",
                "item": "https://toptanbaklavaborek.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Ürünler",
                "item": "https://toptanbaklavaborek.com/urunler"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "İletişim",
                "item": "https://toptanbaklavaborek.com/contact"
              }
            ]
          })
        }}
      />
      
      {/* Organization Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Toptan Baklava & Börek",
            "url": "https://toptanbaklavaborek.com",
            "logo": "https://toptanbaklavaborek.com/images/icon.png",
            "image": "https://toptanbaklavaborek.com/images/icon.png",
            "description": "İstanbul'un en kaliteli toptan baklava ve börek evi. 3.5kg tepsi boyutunda günlük taze üretim.",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+905378395801",
              "contactType": "customer service",
              "availableLanguage": "Turkish"
            },
            "sameAs": [
              "https://wa.me/905378395801"
            ]
          })
        }}
      />
    </Head>
  )
}
