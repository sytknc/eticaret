// Performance optimization utilities

// Debounce function to prevent excessive function calls
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Throttle function to limit function execution frequency
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Intersection Observer for lazy loading
export function createIntersectionObserver(
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {}
): IntersectionObserver {
  return new IntersectionObserver(callback, {
    rootMargin: '50px',
    threshold: 0.1,
    ...options,
  })
}

// Preload critical resources
export function preloadResource(href: string, as: string = 'fetch'): void {
  if (typeof window !== 'undefined') {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = href
    link.as = as
    document.head.appendChild(link)
  }
}

// Optimize images loading
export function optimizeImageLoading(): void {
  if (typeof window !== 'undefined') {
    // Add loading="lazy" to images that are not in viewport
    const images = document.querySelectorAll('img[data-src]')
    const imageObserver = createIntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement
          img.src = img.dataset.src!
          img.removeAttribute('data-src')
          imageObserver.unobserve(img)
        }
      })
    })

    images.forEach((img) => imageObserver.observe(img))
  }
}

// Prevent layout shift by reserving space
export function preventLayoutShift(element: HTMLElement): void {
  if (element) {
    const rect = element.getBoundingClientRect()
    element.style.minHeight = `${rect.height}px`
    element.style.minWidth = `${rect.width}px`
  }
}

// Batch DOM updates
export function batchDOMUpdates(updates: (() => void)[]): void {
  if (typeof window !== 'undefined') {
    // Use requestAnimationFrame for smooth updates
    requestAnimationFrame(() => {
      updates.forEach(update => update())
    })
  }
}
