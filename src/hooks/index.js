import { useEffect, useRef, useState } from 'react'

export const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))
export const lerp = (a, b, t) => a + (b - a) * t
export const smooth = (t) => t * t * (3 - 2 * t)
export const easeOut = (t) => 1 - Math.pow(1 - t, 3)

export function useReducedMotion() {
  const [rm, setRm] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const on = () => setRm(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return rm
}

// Adds `is-in` once the element scrolls into view.
export function useReveal(opts = {}) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add('is-in')
          io.disconnect()
        }
      },
      { threshold: opts.threshold ?? 0.2, rootMargin: opts.rootMargin ?? '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [opts.threshold, opts.rootMargin])
  return ref
}

// 0..1 progress of a tall element scrolling past a viewport-height sticky window.
export function useStickyProgress(ref, onProgress) {
  const cb = useRef(onProgress)
  useEffect(() => { cb.current = onProgress })
  useEffect(() => {
    let raf
    const tick = () => {
      raf = requestAnimationFrame(tick)
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const span = r.height - window.innerHeight
      cb.current(span > 0 ? clamp(-r.top / span) : 0, r)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [ref])
}
