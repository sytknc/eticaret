import React from 'react'
import Header from './Header'
import Footer from './Footer'
import SEO from './SEO'
import CartDrawer from './CartDrawer'
import MobileBottomBar from './MobileBottomBar'
import ProductSchema from './ProductSchema'

type Props = {
  children: React.ReactNode
  title?: string
  description?: string
  url?: string
  image?: string
  keywords?: string
  type?: 'website' | 'article' | 'product'
  canonical?: string
  noindex?: boolean
}

export default function Layout({ 
  children, 
  title = 'Toptan Baklava & Börek', 
  description = 'İstanbul\'un en kaliteli baklava ve börek evi. 3.5 kg tepsi boyutunda günlük taze üretim.', 
  url, 
  image, 
  keywords,
  type = 'website',
  canonical,
  noindex = false
}: Props) {
  return (
    <>
      <SEO 
        title={title} 
        description={description} 
        url={url} 
        image={image}
        keywords={keywords}
        type={type}
        canonical={canonical}
        noindex={noindex}
      />
      <ProductSchema />
      <div className="min-h-screen flex flex-col pb-20 md:pb-0">
        <Header />
        <main className="flex-1 pt-20 md:pt-24">{children}</main>
        <Footer />
      </div>
      <CartDrawer />
      <MobileBottomBar />
    </>
  )
}
