import { useEffect, useRef, useState } from 'react'
import { showcase } from '../data.js'

const SLIDE_MS = 7000
const SLATS = 9

export default function Hero({ started, reducedMotion }) {
  const [i, setI] = useState(0)
  const [cycle, setCycle] = useState(0) // restarts the progress bar animation
  const media = useRef(null)
  const hero = useRef(null)

  // autoplay
  useEffect(() => {
    if (!started || reducedMotion) return
    const t = setTimeout(() => { setI((n) => (n + 1) % showcase.length); setCycle((c) => c + 1) }, SLIDE_MS)
    return () => clearTimeout(t)
  }, [i, started, reducedMotion, cycle])

  // gentle parallax toward the pointer
  useEffect(() => {
    if (reducedMotion) return
    const el = media.current
    let raf
    const p = { x: 0, y: 0, tx: 0, ty: 0 }
    const move = (e) => { p.tx = e.clientX / window.innerWidth - 0.5; p.ty = e.clientY / window.innerHeight - 0.5 }
    const tick = () => {
      p.x += (p.tx - p.x) * 0.06
      p.y += (p.ty - p.y) * 0.06
      const y = Math.min(window.scrollY, window.innerHeight)
      el.style.transform = `translate3d(${p.x * -18}px, ${p.y * -12 + y * 0.3}px, 0)`
      // hero copy eases up and away as you scroll into the page
      hero.current?.style.setProperty('--hy', (y / window.innerHeight).toFixed(4))
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    window.addEventListener('pointermove', move, { passive: true })
    return () => { cancelAnimationFrame(raf); window.removeEventListener('pointermove', move) }
  }, [reducedMotion])

  const go = (n) => { setI(n); setCycle((c) => c + 1) }
  const cur = showcase[i]

  return (
    <section className={`hero ${started ? 'is-started' : ''}`} id="top" data-bg="#0a0a0a" aria-label="Featured developments" ref={hero}>
      <div className="hero__media" ref={media}>
        {showcase.map((s, n) => (
          <img
            key={n}
            src={s.src}
            alt={n === i ? `${s.name}, ${s.where} (architectural render)` : ''}
            className={n === i ? 'is-active' : ''}
            fetchPriority={n === 0 ? 'high' : 'low'}
            loading={n === 0 ? 'eager' : 'lazy'}
            decoding="async"
          />
        ))}
      </div>
      <div className="hero__shade" />
      <div className="hero__slats" aria-hidden="true">
        {Array.from({ length: SLATS }, (_, n) => <span key={n} style={{ '--n': n }} />)}
      </div>

      <div className="hero__content">
        <p className="kicker hero__kicker">Commercial &amp; industrial property · Western Cape &amp; Gauteng</p>
        <h1 className="hero__title">
          <span className="line"><span>Space to grow.</span></span>
          <span className="line"><span><em>A stake in it.</em></span></span>
        </h1>
        <div className="hero__foot">
          <p className="hero__lede">
            Offices, warehouses and showrooms built around your business, with a path to owning a share of the
            building you work in. <strong>What’s ours, is yours.</strong>
          </p>
          <div className="hero__ctas">
            <a className="btn btn--solid" href="#developments">View developments</a>
            <a className="btn btn--ghost" href="#contact">Enquire</a>
          </div>
        </div>
      </div>

      <aside className="hero__now" key={i} aria-live="polite">
        <span className="tag tag--gold">{cur.status}</span>
        <a href={`#${cur.id}`} className="hero__nowname">{cur.name} <span aria-hidden="true">→</span></a>
        <span className="mono">{cur.where}</span>
      </aside>

      <nav className="hero__index" aria-label="Showcase slides">
        {showcase.map((s, n) => (
          <button key={n} type="button" className={n === i ? 'is-active' : ''} onClick={() => go(n)} aria-label={`Show ${s.name}`} aria-current={n === i}>
            <span className="mono">0{n + 1}</span>
            <span className="hero__bar"><i key={n === i ? cycle : 'x'} style={{ animationDuration: `${SLIDE_MS}ms`, animationPlayState: started && !reducedMotion ? 'running' : 'paused' }} /></span>
          </button>
        ))}
      </nav>
    </section>
  )
}
