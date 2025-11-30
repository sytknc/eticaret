import type { NextApiRequest, NextApiResponse } from 'next'
import productsFallback from '../../data/products.json'
import { getSupabaseServiceRoleClient } from '../../utils/supabaseClient'

type Product = {
  id: string
  name: string
  description: string
  price: number
  image?: string
  images?: string[]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Product[] | { message: string }>) {
  if (req.method && req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const supabase = getSupabaseServiceRoleClient()

    const { data, error } = await supabase
      .from('products')
      .select('id, name, description, price, image, images')
      .order('id', { ascending: true })

    if (error) {
      throw error
    }

    if (data && data.length > 0) {
      res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=600')
      return res.status(200).json(
        data.map((product) => ({
          ...product,
          price: typeof product.price === 'number' ? product.price : Number(product.price)
        }))
      )
    }
  } catch (error) {
    console.error('Supabase ürünleri getirirken hata oluştu, statik veriye düşülüyor:', error)
  }

  res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=120')
  return res.status(200).json(productsFallback)
}
