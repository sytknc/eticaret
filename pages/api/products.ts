// Simple product API - later replace with DB
import type { NextApiRequest, NextApiResponse } from 'next'

type Product = {
  id: string
  name: string
  description: string
  price: number
  image?: string
  images?: string[]
}

const products: Product[] = [
    {
    id: '1',
    name: 'Adana Böreği',
    description: 'Adana usulü özel baharatlarla hazırlanmış peynirli börek. 3.5kg tepsi boyutunda geleneksel tarifle el yapımı.',
    price: 1250,
    image: '/images/adana-borek.webp',
    images: [
      '/images/adana-borek.webp',
      '/images/adana-borek-2.webp',
      '/images/adana-borek-3.webp'
    ]
  },
  { 
    id: '2', 
    name: 'Su Böreği Peynirli', 
    description: 'Katman katman hazırlanmış peynirli su böreği. 3.5kg tepsi boyutunda yaklaşık 40 dilim.', 
    price: 1250,
    image: '/images/peynirli-su-borek.webp',
    images: [
      '/images/peynirli-su-borek.webp',
      '/images/peynirli-su-borek-2.webp',
      '/images/peynirli-su-borek-3.webp'
    ]
  },
  { 
    id: '3', 
    name: 'Cevizli Baklava', 
    description: 'Klasik cevizli baklava. 3.5kg tepsi boyutunda taze ceviz ve tereyağı ile hazırlanmış geleneksel lezzet. Yaklaşık 85 dilim.', 
    price: 1500,
    image: '/images/cevizli-baklava.webp',
    images: [
      '/images/cevizli-baklava.webp',
      '/images/cevizli-baklava-2.webp',
      '/images/cevizli-baklava-3.webp'
    ]
  },
  { 
    id: '4', 
    name: 'Fıstıklı Baklava', 
    description: 'Premium Antep fıstığı ile hazırlanmış özel baklava. 3.5kg tepsi boyutunda lüks sunum kutusunda servis edilir.', 
    price: 3000,
    image: '/images/fistikli-baklava.webp',
    images: [
      '/images/fistikli-baklava.webp',
      '/images/fistikli-baklava-2.webp',
      '/images/fistikli-baklava-3.webp'
    ]
  },
  { 
    id: '5', 
    name: 'Fındıklı Baklava', 
    description: 'Taze fındık ile hazırlanmış özel baklava. 3.5kg tepsi boyutunda geleneksel tarifle el yapımı lezzet.', 
    price: 2250,
    image: '/images/findikli-baklava.webp',
    images: [
      '/images/findikli-baklava.webp',
      '/images/findikli-baklava-2.webp',
      '/images/findikli-baklava-3.webp'
    ]
  }
]

export default function handler(req: NextApiRequest, res: NextApiResponse<Product[]>) {
  // Cache headers ekle
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600')
  res.status(200).json(products)
}
