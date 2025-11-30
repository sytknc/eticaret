import { useEffect, useRef } from 'react'

// Passive event listener hook for better performance
export function usePassiveEventListeners() {
  const listenersRef = useRef<Array<{
    element: EventTarget
    type: string
    listener: EventListener
    options?: AddEventListenerOptions
  }>>([])

  const addPassiveListener = (
    element: EventTarget,
    type: string,
    listener: EventListener,
    options: AddEventListenerOptions = { passive: true }
  ) => {
    element.addEventListener(type, listener, options)
    listenersRef.current.push({ element, type, listener, options })
  }

  const removePassiveListener = (
    element: EventTarget,
    type: string,
    listener: EventListener
  ) => {
    element.removeEventListener(type, listener)
    listenersRef.current = listenersRef.current.filter(
      l => !(l.element === element && l.type === type && l.listener === listener)
    )
  }

  // Cleanup all listeners on unmount
  useEffect(() => {
    return () => {
      listenersRef.current.forEach(({ element, type, listener }) => {
        element.removeEventListener(type, listener)
      })
      listenersRef.current = []
    }
  }, [])

  return { addPassiveListener, removePassiveListener }
}

// Optimized scroll handler hook
export function useOptimizedScroll(callback: (scrollY: number) => void, deps: any[] = []) {
  const tickingRef = useRef(false)
  const lastScrollYRef = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      
      if (!tickingRef.current) {
        requestAnimationFrame(() => {
          callback(scrollY)
          tickingRef.current = false
        })
        tickingRef.current = true
      }
      
      lastScrollYRef.current = scrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [callback, ...deps])

  return lastScrollYRef.current
}

// Optimized resize handler hook
export function useOptimizedResize(callback: (width: number, height: number) => void, deps: any[] = []) {
  const tickingRef = useRef(false)

  useEffect(() => {
    const handleResize = () => {
      if (!tickingRef.current) {
        requestAnimationFrame(() => {
          callback(window.innerWidth, window.innerHeight)
          tickingRef.current = false
        })
        tickingRef.current = true
      }
    }

    window.addEventListener('resize', handleResize, { passive: true })
    
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [callback, ...deps])
}
