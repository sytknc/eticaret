export type MenuItem = {
  label: string
  href: string
}

export type AdminSettings = {
  whatsapp: string
  supportPhone: string
  supportEmail: string
  infoBanner: { enabled: boolean; text: string }
  hero: { title: string; subtitle: string }
  topMenu: MenuItem[]
  footerMenu: MenuItem[]
  mobileMenu: MenuItem[]
  socialLinks: { platform: string; url: string }[]
  deployment: { live: boolean; maintenance: boolean; lastDeploy: string; environment: string }
}
