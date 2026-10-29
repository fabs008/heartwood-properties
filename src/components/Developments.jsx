import { useCallback, useEffect, useRef, useState } from 'react'
import { developments, contact } from '../data.js'
import { useReveal, clamp } from '../hooks/index.js'
import { lockScroll } from '../smooth.js'
import Img from './Img.jsx'

function Chapter({ d, n, last, onOpen }) {
  const ref = useRef(null)

  // --p: 0 → 1 as the framed image expands to full-bleed
  useEffect(() => {
    const el = ref.current
    let raf
    const tick = () => {
      raf = requestAnimationFrame(tick)
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      if (r.bottom < -vh || r.top > vh * 1.5) return
      el.style.setProperty('--p', clamp((vh - r.top) / (vh * 1.15)).toFixed(4))
      // --x: 0 → 1 while the next chapter rises over this one
      if (!last) el.style.setProperty('--x', clamp((2 * vh - r.bottom) / vh).toFixed(4))
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [last])

  const subject = encodeURIComponent(`Enquiry: ${d.name}`)

  return (
    <article className="chapter" id={d.id} ref={ref} aria-labelledby={`${d.id}-h`}>
      <div className="chapter__sticky">
        <figure className="chapter__media">
          <Img src={d.images[0]} alt={`${d.name}: architectural render`} />
        </figure>
        <div className="chapter__shade" />
        <div className="chapter__body">
          <p className="chapter__index mono"><span>{String(n + 1).padStart(2, '0')}</span> {d.type}</p>
          <h3 id={`${d.id}-h`} className="chapter__name">{d.name}</h3>
          <p className="chapter__where"><span className="tag tag--gold">{d.status}</span> {d.where}</p>
          <p className="chapter__lede">{d.lede}</p>
          <dl className="chapter__stats">
            {d.stats.map(([v, l]) => (
              <div key={l}><dt>{l}</dt><dd>{v}</dd></div>
            ))}
          </dl>
          <ul className="chapter__features">
            {d.features.map((f) => <li key={f}>{f}</li>)}
          </ul>
          <p className="chapter__note">{d.note}</p>
          <div className="chapter__foot">
            <div className="chapter__thumbs">
              {d.images.map((src, k) => (
                <button key={src} type="button" onClick={() => onOpen(d, k)} aria-label={`Open ${d.name} gallery, image ${k + 1} of ${d.images.length}`}>
                  <Img src={src} alt="" />
                </button>
              ))}
            </div>
            <div className="chapter__ctas">
              <a className="btn btn--solid" href={`mailto:${contact.leasing.email}?subject=${subject}`}>Enquire with {contact.leasing.name}</a>
              <a className="link" href={d.href} target="_blank" rel="noreferrer">Full details ↗</a>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

function Lightbox({ open, onClose }) {
  const [k, setK] = useState(open?.k ?? 0)
  const closeBtn = useRef(null)
  const imgs = open?.d.images ?? []
  const step = useCallback((s) => setK((v) => (v + s + imgs.length) % imgs.length), [imgs.length])
  useEffect(() => {
    if (!open) return
    closeBtn.current?.focus()
    lockScroll(true)
    const key = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', key)
    return () => { window.removeEventListener('keydown', key); lockScroll(false) }
  }, [open, onClose, step])
  if (!open) return null
  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${open.d.name} gallery`} onClick={onClose}>
      <img key={k} src={imgs[k]} alt={`${open.d.name}, image ${k + 1} of ${imgs.length}`} onClick={(e) => e.stopPropagation()} />
      <div className="lightbox__bar" onClick={(e) => e.stopPropagation()}>
        <span className="mono">{open.d.name} · {k + 1} / {imgs.length}</span>
        <span className="lightbox__btns">
          <button type="button" onClick={() => step(-1)} aria-label="Previous image">←</button>
          <button type="button" onClick={() => step(1)} aria-label="Next image">→</button>
          <button type="button" ref={closeBtn} onClick={onClose} aria-label="Close gallery">✕</button>
        </span>
      </div>
    </div>
  )
}

export default function Developments() {
  const head = useReveal()
  const [open, setOpen] = useState(null)
  const onOpen = useCallback((d, k) => setOpen({ d, k }), [])
  const onClose = useCallback(() => setOpen(null), [])
  return (
    <section className="devs" id="developments" data-bg="#0a0a0a" aria-labelledby="devs-h">
      <header className="devs__head" ref={head}>
        <p className="kicker reveal"><span className="kicker__n">01</span>Developments · Now leasing &amp; selling</p>
        <h2 id="devs-h" className="display reveal">Five addresses<br />in the making.</h2>
        <ol className="devs__index reveal">
          {developments.map((d, n) => (
            <li key={d.id}>
              <a href={`#${d.id}`}>
                <span className="mono">{String(n + 1).padStart(2, '0')}</span>
                <span className="devs__iname">{d.name}</span>
                <span className="mono devs__itype">{d.type}</span>
                <span className="devs__istatus">{d.status}</span>
              </a>
            </li>
          ))}
        </ol>
      </header>
      {developments.map((d, n) => <Chapter key={d.id} d={d} n={n} last={n === developments.length - 1} onOpen={onOpen} />)}
      <p className="devs__more">
        Also developing <strong>Quartz Hill Business Park</strong> in Northriding, Gauteng, and <strong>Sunvlei</strong>.{' '}
        For the current vacancy schedule, email <a className="link" href={`mailto:${contact.vacancies}?subject=Vacancy%20schedule`}>{contact.vacancies}</a>.
      </p>
      <Lightbox key={open ? `${open.d.id}-${open.k}` : 'closed'} open={open} onClose={onClose} />
    </section>
  )
}
