import React from 'react'
import Head from 'next/head'

export default function ProductSchema() {
  const products = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Cevizli Baklava",
      "description": "Klasik cevizli baklava. 3.5kg tepsi boyutunda taze ceviz ve tereyağı ile hazırlanmış geleneksel lezzet.",
      "image": "https://toptanbaklavaborek.com/images/cevizli-baklava.webp",
      "category": "Baklava",
      "brand": {
        "@type": "Brand",
        "name": "Toptan Baklava & Börek"
      },
      "offers": {
        "@type": "Offer",
        "price": "1250",
        "priceCurrency": "TRY",
        "availability": "https://schema.org/InStock",
        "deliveryAvailable": true,
        "pickupAvailable": true
      },
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
          "reviewBody": "Mükemmel kalitede baklava ve börek. Düğünümüzde kullandık, herkes çok beğendi. Kesinlikle tavsiye ederim.",
          "datePublished": "2024-01-10"
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
          "reviewBody": "Ofis siparişlerimiz için kullanıyoruz. Taze ve lezzetli ürünler. Teslimat da çok hızlı.",
          "datePublished": "2024-01-08"
        }
      ]
    },
    {
      "@type": "Product",
      "name": "Su Böreği Peynirli",
      "description": "Katman katman hazırlanmış peynirli su böreği. 3.5kg tepsi boyutunda yaklaşık 40 dilim.",
      "image": "https://toptanbaklavaborek.com/images/peynirli-su-borek.webp",
      "category": "Börek",
      "brand": {
        "@type": "Brand",
        "name": "Toptan Baklava & Börek"
      },
      "offers": {
        "@type": "Offer",
        "price": "750",
        "priceCurrency": "TRY",
        "availability": "https://schema.org/InStock",
        "deliveryAvailable": true,
        "pickupAvailable": true
      },
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
          "reviewBody": "Mükemmel kalitede baklava ve börek. Düğünümüzde kullandık, herkes çok beğendi. Kesinlikle tavsiye ederim.",
          "datePublished": "2024-01-10"
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
          "reviewBody": "Ofis siparişlerimiz için kullanıyoruz. Taze ve lezzetli ürünler. Teslimat da çok hızlı.",
          "datePublished": "2024-01-08"
        }
      ]
    },
    {
      "@type": "Product",
      "name": "Adana Böreği",
      "description": "Adana usulü özel baharatlarla hazırlanmış peynirli börek. 3.5kg tepsi boyutunda geleneksel tarifle el yapımı.",
      "image": "https://toptanbaklavaborek.com/images/adana-borek.webp",
      "category": "Börek",
      "brand": {
        "@type": "Brand",
        "name": "Toptan Baklava & Börek"
      },
      "offers": {
        "@type": "Offer",
        "price": "750",
        "priceCurrency": "TRY",
        "availability": "https://schema.org/InStock",
        "deliveryAvailable": true,
        "pickupAvailable": true
      },
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
          "reviewBody": "Mükemmel kalitede baklava ve börek. Düğünümüzde kullandık, herkes çok beğendi. Kesinlikle tavsiye ederim.",
          "datePublished": "2024-01-10"
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
          "reviewBody": "Ofis siparişlerimiz için kullanıyoruz. Taze ve lezzetli ürünler. Teslimat da çok hızlı.",
          "datePublished": "2024-01-08"
        }
      ]
    },
    {
      "@type": "Product",
      "name": "Fıstıklı Baklava",
      "description": "Premium Antep fıstığı ile hazırlanmış özel baklava. 3.5kg tepsi boyutunda geleneksel tarifle el yapımı.",
      "image": "https://toptanbaklavaborek.com/images/fistikli-baklava.webp",
      "category": "Baklava",
      "brand": {
        "@type": "Brand",
        "name": "Toptan Baklava & Börek"
      },
      "offers": {
        "@type": "Offer",
        "price": "2750",
        "priceCurrency": "TRY",
        "availability": "https://schema.org/InStock",
        "deliveryAvailable": true,
        "pickupAvailable": true
      },
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
          "reviewBody": "Mükemmel kalitede baklava ve börek. Düğünümüzde kullandık, herkes çok beğendi. Kesinlikle tavsiye ederim.",
          "datePublished": "2024-01-10"
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
          "reviewBody": "Ofis siparişlerimiz için kullanıyoruz. Taze ve lezzetli ürünler. Teslimat da çok hızlı.",
          "datePublished": "2024-01-08"
        }
      ]
    },
    {
      "@type": "Product",
      "name": "Fındıklı Baklava",
      "description": "Giresun fındığı ile hazırlanmış özel baklava. 3.5kg tepsi boyutunda geleneksel tarifle el yapımı.",
      "image": "https://toptanbaklavaborek.com/images/findikli-baklava.webp",
      "category": "Baklava",
      "brand": {
        "@type": "Brand",
        "name": "Toptan Baklava & Börek"
      },
      "offers": {
        "@type": "Offer",
        "price": "2000",
        "priceCurrency": "TRY",
        "availability": "https://schema.org/InStock",
        "deliveryAvailable": true,
        "pickupAvailable": true
      },
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
          "reviewBody": "Mükemmel kalitede baklava ve börek. Düğünümüzde kullandık, herkes çok beğendi. Kesinlikle tavsiye ederim.",
          "datePublished": "2024-01-10"
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
          "reviewBody": "Ofis siparişlerimiz için kullanıyoruz. Taze ve lezzetli ürünler. Teslimat da çok hızlı.",
          "datePublished": "2024-01-08"
        }
      ]
    }
  ]

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Toptan Baklava & Börek",
    "url": "https://toptanbaklavaborek.com",
    "logo": "https://toptanbaklavaborek.com/images/icon.png",
    "image": "https://toptanbaklavaborek.com/images/icon.png",
    "description": "İstanbul'un en kaliteli toptan baklava ve börek evi. 3.5kg tepsi boyutunda günlük taze üretim.",
    "foundingDate": "1950",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "İstanbul, Türkiye",
      "addressLocality": "İstanbul",
      "addressRegion": "İstanbul",
      "postalCode": "34000",
      "addressCountry": "TR"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+905378395801",
      "contactType": "customer service",
      "availableLanguage": "Turkish",
      "areaServed": "TR",
      "hoursAvailable": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "08:00",
        "closes": "20:00"
      }
    },
    "sameAs": [
      "https://wa.me/905378395801"
    ],
    "serviceArea": {
      "@type": "City",
      "name": "İstanbul"
    },
    "areaServed": {
      "@type": "City",
      "name": "İstanbul"
    },
    "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer"],
    "currenciesAccepted": "TRY",
    "priceRange": "₺₺",
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
        "reviewBody": "Mükemmel kalitede baklava ve börek. Düğünümüzde kullandık, herkes çok beğendi. Kesinlikle tavsiye ederim.",
        "datePublished": "2024-01-10"
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
        "reviewBody": "Ofis siparişlerimiz için kullanıyoruz. Taze ve lezzetli ürünler. Teslimat da çok hızlı.",
        "datePublished": "2024-01-08"
      }
    ]
  }

  return (
    <Head>
      {/* Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationData)
        }}
      />
      {/* Individual Product Schemas */}
      {products.map((product, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(product)
          }}
        />
      ))}
    </Head>
  )
}

