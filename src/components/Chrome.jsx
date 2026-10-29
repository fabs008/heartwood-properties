import { useEffect, useRef, useState } from 'react'
import { lockScroll } from '../smooth.js'

export function Logo({ className = '' }) {
  return <img className={`logo ${className}`} src="/img/logo-linear-white.png" alt="Heartwood Properties" width="570" height="128" />
}

const links = [
  ['Developments', '#developments'],
  ['Location', '#location'],
  ['Ownership', '#model'],
  ['Track record', '#story'],
  ['Leadership', '#leadership'],
  ['Investors', '#investors'],
]

export function Nav() {
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)
  useEffect(() => {
    let last = window.scrollY
    const on = () => {
      const y = window.scrollY
      setHidden(y > last && y > 200)
      setSolid(y > 40)
      last = y
    }
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => {
    lockScroll(open)
    const esc = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [open])

  return (
    <header className={`nav ${hidden && !open ? 'is-hidden' : ''} ${solid ? 'is-solid' : ''} ${open ? 'is-open' : ''}`}>
      <a href="#top" className="nav__logo" aria-label="Heartwood Properties: back to top">
        <Logo />
      </a>
      <nav className="nav__links" aria-label="Primary">
        {links.map(([t, h]) => <a key={h} href={h}>{t}</a>)}
      </nav>
      <a href="#contact" className="btn btn--ghost btn--sm nav__cta">Enquire</a>
      <button className="nav__burger" aria-expanded={open} aria-controls="menu" onClick={() => setOpen((o) => !o)}>
        <span className="sr">Menu</span><i /><i />
      </button>
      <div className="menu" id="menu" hidden={!open}>
        {[...links, ['Contact', '#contact']].map(([t, h], i) => (
          <a key={h} href={h} onClick={() => setOpen(false)} style={{ '--i': i }}>
            <span className="mono">0{i + 1}</span>{t}
          </a>
        ))}
      </div>
    </header>
  )
}

export function Loader({ onDone, skip }) {
  const [out, setOut] = useState(false)
  const [gone, setGone] = useState(skip)
  const done = useRef(onDone)
  useEffect(() => {
    if (skip) {
      done.current()
      return
    }
    // wait for the first hero image (or 2.5s at most), then open
    let finished = false
    const finish = () => {
      if (finished) return
      finished = true
      setOut(true)
      done.current()
      setTimeout(() => setGone(true), 1200)
    }
    const img = new Image()
    img.src = '/img/reserve-02.webp'
    const min = new Promise((r) => setTimeout(r, 1300))
    const ready = new Promise((r) => { img.onload = r; img.onerror = r })
    Promise.all([min, ready]).then(finish)
    const cap = setTimeout(finish, 2500)
    return () => clearTimeout(cap)
  }, [skip])
  if (gone) return null
  return (
    <div className={`loader ${out ? 'is-out' : ''}`} aria-hidden="true">
      <Logo className="loader__logo" />
      <span className="loader__line"><i /></span>
    </div>
  )
}

