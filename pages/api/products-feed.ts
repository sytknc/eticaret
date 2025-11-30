import { NextApiRequest, NextApiResponse } from 'next'
import productsFallback from '../../data/products.json'
import { getSupabaseServiceRoleClient } from '../../utils/supabaseClient'

type Product = {
  id: string
  name: string
  description: string
  price: number
  image: string
  images: string[]
}

async function fetchProductsFromSupabase() {
  const supabase = getSupabaseServiceRoleClient()

  const { data, error } = await supabase
    .from('products')
    .select('id, name, description, price, image, images')
    .order('id', { ascending: true })

  if (error) throw error

  return data
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  let products: Product[] = productsFallback

  try {
    const supabaseProducts = await fetchProductsFromSupabase()

    if (supabaseProducts && supabaseProducts.length > 0) {
      products = supabaseProducts.map((product: Product) => ({
        ...product,
        id: String(product.id),
        name: String(product.name),
        description: String(product.description),
        image: String(product.image),
        price: typeof product.price === 'number' ? product.price : Number(product.price),
        images: Array.isArray(product.images) ? product.images.map((image) => String(image)) : []
      }))
    }
  } catch (error) {
    console.error('Supabase feed verisi çekilirken hata oluştu, statik veri kullanılacak:', error)
  }

  // Google Merchant Center için XML feed oluştur
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Toptan Baklava & Börek</title>
    <link>https://toptanbaklavaborek.com</link>
    <description>Günlük taze baklava ve börek üretimi</description>
    ${products
      .map(
        (product) => `
    <item>
      <g:id>${product.id}</g:id>
      <g:title>${product.name}</g:title>
      <g:description>${product.description}</g:description>
      <g:link>https://toptanbaklavaborek.com/#products</g:link>
      <g:image_link>https://toptanbaklavaborek.com${product.image?.startsWith('/') ? product.image : `/images/${product.image}`}</g:image_link>
      <g:availability>in stock</g:availability>
      <g:price>${product.price} TRY</g:price>
      <g:brand>Toptan Baklava & Börek</g:brand>
      <g:condition>new</g:condition>
      <g:product_type>Gıda &gt; Tatlı &gt; Baklava</g:product_type>
      <g:google_product_category>Food, Beverages &amp; Tobacco &gt; Food Items &gt; Baked Goods</g:google_product_category>
      <g:shipping_weight>3.5 kg</g:shipping_weight>
      <g:shipping>
        <g:country>TR</g:country>
        <g:service>Standard</g:service>
        <g:price>0 TRY</g:price>
      </g:shipping>
    </item>`
      )
      .join('')}
  </channel>
</rss>`

  res.setHeader('Content-Type', 'application/xml')
  res.setHeader('Cache-Control', 'public, max-age=900, s-maxage=1800')
  res.status(200).send(xml)
}
