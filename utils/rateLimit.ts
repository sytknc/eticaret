interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

const store: RateLimitStore = {}

export function rateLimit(identifier: string, limit: number = 100, windowMs: number = 15 * 60 * 1000) {
  const now = Date.now()
  const key = identifier
  
  if (!store[key] || now > store[key].resetTime) {
    store[key] = {
      count: 1,
      resetTime: now + windowMs
    }
    return { success: true, remaining: limit - 1 }
  }
  
  if (store[key].count >= limit) {
    return { success: false, remaining: 0 }
  }
  
  store[key].count++
  return { success: true, remaining: limit - store[key].count }
}

export function getClientIP(req: any): string {
  return req.headers['x-forwarded-for']?.split(',')[0] || 
         req.headers['x-real-ip'] || 
         req.connection?.remoteAddress || 
         req.socket?.remoteAddress || 
         'unknown'
}

export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // XSS koruması
    .replace(/['"]/g, '') // SQL injection koruması
    .trim()
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/
  return phoneRegex.test(phone)
}
