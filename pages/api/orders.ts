import type { NextApiRequest, NextApiResponse } from 'next'
import { getSupabaseServiceRoleClient } from '../../utils/supabaseClient'

export type Order = {
  id: string
  customer: string
  total: number
  status: 'hazırlanıyor' | 'yolda' | 'teslim edildi'
  deliveryArea: string
  payment: 'kredi kartı' | 'kapıda ödeme' | 'havale'
}

type OrderFromDb = {
  id: string
  customer: string
  total: number | string
  status: Order['status']
  delivery_area: string
  payment: Order['payment']
}

const fallbackOrders: Order[] = [
  {
    id: '#ORD-5432',
    customer: 'Ayşe Yılmaz',
    total: 5400,
    status: 'teslim edildi',
    deliveryArea: 'Beşiktaş',
    payment: 'kredi kartı'
  },
  {
    id: '#ORD-5431',
    customer: 'Efe Kara',
    total: 3250,
    status: 'yolda',
    deliveryArea: 'Ataşehir',
    payment: 'kapıda ödeme'
  },
  {
    id: '#ORD-5428',
    customer: 'Melisa Tan',
    total: 2675,
    status: 'hazırlanıyor',
    deliveryArea: 'Bağcılar',
    payment: 'havale'
  }
]

export default async function handler(req: NextApiRequest, res: NextApiResponse<Order[] | { message: string }>) {
  if (req.method && req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const supabase = getSupabaseServiceRoleClient()
    const { data, error } = await supabase
      .from('orders')
      .select('id, customer, total, status, delivery_area, payment')
      .order('id', { ascending: false })

    if (error) {
      throw error
    }

    if (data && data.length > 0) {
      res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=600')
      return res.status(200).json(
        (data as OrderFromDb[]).map((order) => ({
          id: order.id,
          customer: order.customer,
          total: typeof order.total === 'number' ? order.total : Number(order.total),
          status: order.status as Order['status'],
          deliveryArea: order.delivery_area,
          payment: order.payment as Order['payment']
        }))
      )
    }
  } catch (error) {
    console.error('Supabase siparişleri çekilirken hata oluştu, statik veri kullanılacak:', error)
  }

  res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=120')
  return res.status(200).json(fallbackOrders)
}
