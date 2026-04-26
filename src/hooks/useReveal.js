import { useEffect } from 'react'

/**
 * useReveal — attach IntersectionObserver to add `.visible` class.
 * Pass a selector string like '.reveal, .reveal-left, .reveal-right, .stagger'
 */
export function useReveal(selector = '.reveal, .reveal-left, .reveal-right, .stagger') {
  useEffect(() => {
    const els = document.querySelectorAll(selector)
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          obs.unobserve(e.target)
        }
      }),
      { threshold: 0.12 }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [selector])
}
