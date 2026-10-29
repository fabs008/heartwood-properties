import { useEffect, useRef, useState } from 'react'
import { nearby, timeline } from '../data.js'
import { useReveal, useStickyProgress } from '../hooks/index.js'
import Img from './Img.jsx'

export function Location() {
  const ref = useReveal({ threshold: 0.2 })
  return (
    <section className="loc" id="location" data-bg="#141414" ref={ref} aria-labelledby="loc-h">
      <figure className="loc__media reveal">
        <Img src="/img/heartwood-04.webp" alt="Aerial view of the Paardevlei site on Beach Road, with Strand and the coastline beyond" />
        <figcaption className="mono">Paardevlei Precinct · Beach Road · Somerset West</figcaption>
      </figure>
      <div className="loc__body">
        <p className="kicker reveal"><span className="kicker__n">02</span>Location</p>
        <h2 id="loc-h" className="display reveal">Between the mountains<br />and the sea.</h2>
        <p className="lede reveal">
          The Summit, The Heartwood and The Reserve share a highly visible corner at the entrance to Paardevlei,
          next to Busamed Private Hospital and opposite Strand Golf Club.
        </p>
        <ul className="loc__list">
          {nearby.map(([p, t], i) => (
            <li key={p} style={{ '--i': i }}>
              <span>{p}</span>
              <span className="mono">{t}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function TrackRecord() {
  const section = useRef(null)
  const track = useRef(null)
  const year = useRef(null)
  const [dist, setDist] = useState(0)
  const [pinned, setPinned] = useState(false)
  const head = useReveal()

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 900px)')
    const measure = () => {
      setPinned(mq.matches)
      if (track.current) setDist(Math.max(0, track.current.scrollWidth - window.innerWidth))
    }
    measure()
    window.addEventListener('resize', measure)
    mq.addEventListener('change', measure)
    return () => { window.removeEventListener('resize', measure); mq.removeEventListener('change', measure) }
  }, [])

  useStickyProgress(section, (p) => {
    if (!track.current) return
    track.current.style.transform = pinned ? `translate3d(${-p * dist}px,0,0)` : ''
    if (year.current) year.current.textContent = String(Math.round(2011 + p * 15))
  })

  return (
    <section className="track" id="story" data-bg="#0a0a0a" aria-labelledby="track-h">
      <div className="track__pin" ref={section} style={pinned ? { height: `calc(100vh + ${dist}px)` } : undefined}>
        <div className="track__sticky">
          <header className="track__head" ref={head}>
            <div>
              <p className="kicker reveal"><span className="kicker__n">04</span>Track record · Since 2011</p>
              <h2 id="track-h" className="display reveal">Fifteen years<br />of buildings.</h2>
            </div>
            <p className="track__year" aria-hidden="true" ref={year}>2011</p>
          </header>
          <ol className="track__rail" ref={track}>
            {timeline.map((t, i) => (
              <li key={i} className="tcard">
                <div className="tcard__img"><Img src={t.src} alt={t.title} /></div>
                <p className="mono tcard__when">{t.month} {t.year}</p>
                <h3 className="tcard__title">{t.title}</h3>
                <p className="tcard__place">{t.place}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
