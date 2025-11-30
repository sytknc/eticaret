import { NextApiRequest, NextApiResponse } from 'next'
import products from '../../data/products.json'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  // Google Merchant Center için XML feed oluştur
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Toptan Baklava & Börek</title>
    <link>https://toptanbaklavaborek.com</link>
    <description>Günlük taze baklava ve börek üretimi</description>
    ${products.map(product => `
    <item>
      <g:id>${product.id}</g:id>
      <g:title>${product.name}</g:title>
      <g:description>${product.description}</g:description>
      <g:link>https://toptanbaklavaborek.com/#products</g:link>
      <g:image_link>https://toptanbaklavaborek.com/images/${product.image}</g:image_link>
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
    </item>
    `).join('')}
  </channel>
</rss>`

  res.setHeader('Content-Type', 'application/xml')
  res.setHeader('Cache-Control', 'public, max-age=3600') // 1 saat cache
  res.status(200).send(xml)
}
