import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

// One shared smooth-scroll instance (null when reduced motion is on).
export let lenis = null

const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4)

export function startSmoothScroll() {
  lenis = new Lenis({
    autoRaf: true,
    lerp: 0.085, // weight: lower = heavier, silkier glide
    anchors: { duration: 1.6, easing: easeOutQuart },
    stopInertiaOnNavigate: true,
  })
  return () => {
    lenis?.destroy()
    lenis = null
  }
}

// Freeze page scroll while an overlay (menu, gallery) is open.
export function lockScroll(locked) {
  if (locked) lenis?.stop()
  else lenis?.start()
  document.body.style.overflow = locked ? 'hidden' : ''
}

const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16))
const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t))
const clamp01 = (v) => Math.min(1, Math.max(0, v))

// Glide the page background between the dark section tones as you scroll.
// Driven purely by scroll position, so it behaves the same in every browser.
// A section starts taking over when its top crosses 75% of the way down the
// viewport, and the blend runs over the next 35% of a screen.
export function startColourFlow() {
  const sections = [...document.querySelectorAll('[data-bg]')].map((el) => ({ el, bg: hex(el.dataset.bg) }))
  if (!sections.length) return () => {}
  const body = document.body.style
  let raf = 0

  const paint = () => {
    raf = 0
    const vh = window.innerHeight
    const line = vh * 0.75
    let k = 0
    for (let i = 0; i < sections.length; i++) {
      if (sections[i].el.getBoundingClientRect().top <= line) k = i
    }
    const cur = sections[k]
    const prev = sections[Math.max(0, k - 1)]
    const t = k === 0 ? 1 : clamp01((line - cur.el.getBoundingClientRect().top) / (vh * 0.35))
    body.backgroundColor = `rgb(${mix(prev.bg, cur.bg, t).join(', ')})`
  }
  const schedule = () => { if (!raf) raf = requestAnimationFrame(paint) }

  paint()
  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', schedule)
  const ro = new ResizeObserver(schedule) // section heights change as images load
  ro.observe(document.body)
  return () => {
    cancelAnimationFrame(raf)
    window.removeEventListener('scroll', schedule)
    window.removeEventListener('resize', schedule)
    ro.disconnect()
    body.removeProperty('background-color')
  }
}
