import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="tr">
        <Head>

          
          {/* Google Search Console Verification */}
          <meta name="google-site-verification" content="U-k_uUC62ylnOYwQak88jgOrAIVc1zX2xTOqfyBF4PU" />
          
          {/* Google Analytics - Optimized with next/script */}
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-XXXXXXXXXX', {
                  page_title: document.title,
                  page_location: window.location.href,
                  custom_map: {
                    'custom_parameter_1': 'baklava_category',
                    'custom_parameter_2': 'delivery_area'
                  }
                });
              `
            }}
          />
          
          {/* Google Tag Manager */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-XXXXXXX');
              `
            }}
          />
          
          {/* Favicon ve App Icons - PNG Format */}
          <link rel="icon" type="image/x-icon" href="/favicon.ico" />
          <link rel="icon" type="image/png" href="/favicon.png" />
          <link rel="icon" type="image/png" href="/images/icon-16x16.png" sizes="16x16" />
          <link rel="icon" type="image/png" href="/images/icon-32x32.png" sizes="32x32" />
          <link rel="icon" type="image/png" href="/images/icon-48x48.png" sizes="48x48" />
          <link rel="icon" type="image/png" href="/images/icon-96x96.png" sizes="96x96" />
          
          {/* Apple Touch Icons */}
          <link rel="apple-touch-icon" href="/images/icon-180x180.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/images/icon-180x180.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/images/icon-152x152.png" />
          <link rel="apple-touch-icon" sizes="144x144" href="/images/icon-144x144.png" />
          <link rel="apple-touch-icon" sizes="120x120" href="/images/icon-128x128.png" />
          <link rel="apple-touch-icon" sizes="114x114" href="/images/icon-128x128.png" />
          <link rel="apple-touch-icon" sizes="76x76" href="/images/icon-72x72.png" />
          <link rel="apple-touch-icon" sizes="72x72" href="/images/icon-72x72.png" />
          <link rel="apple-touch-icon" sizes="60x60" href="/images/icon-72x72.png" />
          <link rel="apple-touch-icon" sizes="57x57" href="/images/icon-72x72.png" />
          
          {/* Windows Tiles */}
          <meta name="msapplication-TileImage" content="/images/icon-144x144.png" />
          <meta name="msapplication-TileColor" content="#f59e0b" />
          <meta name="msapplication-TileImage" content="/images/icon-144x144.png" />
          
          {/* PWA */}
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#f59e0b" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="Toptan Baklava" />
          <meta name="application-name" content="Toptan Baklava" />
          <meta name="msapplication-config" content="/browserconfig.xml" />
          
          {/* DNS Prefetch */}
          <link rel="dns-prefetch" href="//www.google-analytics.com" />
          <link rel="dns-prefetch" href="//www.googletagmanager.com" />
          <link rel="dns-prefetch" href="//fonts.googleapis.com" />
          <link rel="dns-prefetch" href="//fonts.gstatic.com" />
          
          {/* Preconnect for faster loading */}
          <link rel="preconnect" href="https://www.google-analytics.com" />
          <link rel="preconnect" href="https://www.googletagmanager.com" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          
          {/* Critical CSS Preload */}
          <link rel="preload" href="/styles/globals.css" as="style" />
          
          {/* Performance hints */}
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          
          {/* SEO Performance */}
          <meta name="revisit-after" content="1 days" />
          <meta name="distribution" content="global" />
          <meta name="rating" content="general" />
          <meta name="target" content="all" />
          <meta name="audience" content="all" />
          <meta name="coverage" content="worldwide" />
          <meta name="classification" content="business" />
          <meta name="category" content="food, bakery, catering" />
          <meta name="subject" content="toptan baklava, toptan börek, istanbul baklava, istanbul börek" />
          <meta name="abstract" content="İstanbul'un en kaliteli toptan baklava ve börek evi. 3.5kg tepsi boyutunda günlük taze üretim." />
          <meta name="summary" content="Toptan baklava ve börek siparişi. İstanbul geneli teslimat. WhatsApp: +90 537 839 58 01" />
          <meta name="designer" content="Toptan Baklava & Börek" />
          <meta name="copyright" content="Toptan Baklava & Börek" />
          <meta name="reply-to" content="info@toptanbaklavaborek.com" />
          <meta name="owner" content="Toptan Baklava & Börek" />
          <meta name="url" content="https://toptanbaklavaborek.com" />
          <meta name="identifier-URL" content="https://toptanbaklavaborek.com" />
          <meta name="directory" content="submission" />
          <meta name="pagename" content="Toptan Baklava & Börek" />
          <meta name="category" content="Food & Beverage" />
          <meta name="coverage" content="Worldwide" />
          <meta name="distribution" content="Global" />
          <meta name="rating" content="General" />
          <meta name="revisit-after" content="1 days" />
          <meta name="subtitle" content="İstanbul'un En Kaliteli Baklava ve Börek Evi" />
          <meta name="target" content="all" />
          <meta name="HandheldFriendly" content="True" />
          <meta name="MobileOptimized" content="320" />
          <meta name="apple-touch-fullscreen" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="msapplication-TileColor" content="#f59e0b" />
          <meta name="msapplication-config" content="/browserconfig.xml" />
          <meta name="theme-color" content="#f59e0b" />
          <meta name="msapplication-navbutton-color" content="#f59e0b" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <meta name="apple-mobile-web-app-title" content="Toptan Baklava" />
          <meta name="application-name" content="Toptan Baklava & Börek" />
          <meta name="msapplication-tooltip" content="İstanbul'un en kaliteli toptan baklava ve börek evi" />
          <meta name="msapplication-starturl" content="/" />
          <meta name="msapplication-tileimage" content="/images/icon-144x144.png" />
          <meta name="msapplication-square70x70logo" content="/images/icon-72x72.png" />
          <meta name="msapplication-square150x150logo" content="/images/icon-144x144.png" />
          <meta name="msapplication-wide310x150logo" content="/images/icon-192x192.png" />
          <meta name="msapplication-square310x310logo" content="/images/icon-384x384.png" />
          
          {/* Schema.org structured data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                "name": "Toptan Baklava & Börek",
                "description": "İstanbul'un en kaliteli toptan baklava ve börek evi. 3.5kg tepsi boyutunda günlük taze üretim.",
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
                "openingHours": "Mo-Su 08:00-20:00",
                "servesCuisine": ["Turkish", "Baklava", "Börek"],
                "priceRange": "₺₺",
                "image": "https://toptanbaklavaborek.com/images/icon.png",
                "logo": "https://toptanbaklavaborek.com/images/icon.png",
                "sameAs": [
                  "https://wa.me/905378395801"
                ]
              })
            }}
          />
        </Head>
        <body>
          {/* Google Tag Manager (noscript) */}
          <noscript>
            <iframe 
              src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
              height="0" 
              width="0" 
              style={{display:'none',visibility:'hidden'}}
            />
          </noscript>
          
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
