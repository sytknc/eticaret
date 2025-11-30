import type { NextApiRequest, NextApiResponse } from 'next'
import type { AdminSettings } from '../../../types/admin'

const defaultSettings: AdminSettings = {
  whatsapp: '+90 531 123 45 67',
  supportPhone: '+90 212 555 44 33',
  supportEmail: 'destek@toptanbaklavaborek.com',
  infoBanner: { enabled: true, text: '39 ilçe aynı gün teslimat · Canlı WhatsApp desteği' },
  hero: { title: 'Baklava & Börek', subtitle: 'Supabase ile canlı ürün ve sipariş yönetimi' },
  topMenu: [
    { label: 'Anasayfa', href: '/' },
    { label: 'Hakkımızda', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'İletişim', href: '/contact' }
  ],
  footerMenu: [
    { label: 'Gizlilik', href: '/privacy' },
    { label: 'İade Politikası', href: '/refund-policy' },
    { label: 'Güvenlik', href: '/security-policy' }
  ],
  mobileMenu: [
    { label: 'Sepet', href: '/cart' },
    { label: 'Teslimat Bölgeleri', href: '/contact' },
    { label: 'Kampanyalar', href: '/blog' }
  ],
  socialLinks: [
    { platform: 'Instagram', url: 'https://instagram.com/toptanbaklavaborek' },
    { platform: 'WhatsApp', url: 'https://wa.me/905311234567' }
  ],
  deployment: { live: true, maintenance: false, lastDeploy: 'Bugün 10:15', environment: 'Üretim' }
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<AdminSettings | { message: string }>
) {
  if (req.method && req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  res.setHeader('Cache-Control', 'public, max-age=120, s-maxage=300')
  return res.status(200).json(defaultSettings)
}
