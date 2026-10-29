import { useEffect, useRef, useState } from 'react'
import { useReveal } from '../hooks/index.js'

const stages = [
  { from: 0, title: 'Sign a 10-year lease', text: 'You’re involved from the very start of the project, shaping and customising the building around how your business actually works.' },
  { from: 1, title: 'Receive a shareholding', text: 'Your 10-year lease comes with a percentage shareholding. From day one, you hold a stake in the property you occupy.' },
  { from: 4, title: 'Become a part-owner', text: 'No longer just a tenant. Landlord and occupant want the same thing: a building that grows in value.' },
  { from: 10, title: 'Grow toward full ownership', text: 'The aim is simple and rare: full ownership of the building your business calls home.' },
]

// A ten-storey elevation; floors light up from the ground as the lease matures.
function Tower({ year }) {
  const floors = 10
  const fh = 26
  const w = 200
  const x0 = 60
  const base = 330
  return (
    <svg viewBox="0 0 320 380" className="tower" aria-hidden="true">
      <line x1="10" y1={base} x2="310" y2={base} className="tower__ground" />
      {Array.from({ length: floors }, (_, f) => {
        const y = base - (f + 1) * fh
        const on = f < year
        return (
          <g key={f} className={`tower__floor ${on ? 'is-on' : ''}`} style={{ '--f': f }}>
            <rect x={x0} y={y} width={w} height={fh} />
            {Array.from({ length: 8 }, (_, c) => (
              <rect key={c} x={x0 + 8 + c * 24} y={y + 6} width="16" height={fh - 12} className="tower__win" />
            ))}
          </g>
        )
      })}
      <rect x={x0 - 10} y={base - floors * fh - 8} width={w + 20} height="8" className="tower__roof" />
      <text x={x0 + w + 14} y={base - Math.max(year, 0.4) * fh + 4} className="tower__label">your stake</text>
      <line x1={x0 + w + 4} y1={base - year * fh} x2={x0 + w + 10} y2={base - year * fh} className="tower__tick" />
    </svg>
  )
}

export default function Model({ reducedMotion }) {
  const [year, setYear] = useState(0)
  const touched = useRef(false)
  const ref = useReveal({ threshold: 0.3 })
  const box = useRef(null)

  useEffect(() => {
    if (reducedMotion) return
    let timer
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || touched.current) return
      io.disconnect()
      let y = 0
      timer = setInterval(() => {
        if (touched.current || y >= 10) return clearInterval(timer)
        y += 1
        setYear(y)
      }, 600)
    }, { threshold: 0.5 })
    io.observe(box.current)
    return () => { io.disconnect(); clearInterval(timer) }
  }, [reducedMotion])

  const stage = [...stages].reverse().find((s) => year >= s.from)

  return (
    <section className="model" id="model" data-bg="#0a0a0a" ref={ref} aria-labelledby="model-h">
      <div className="model__intro">
        <p className="kicker reveal"><span className="kicker__n">03</span>Ownership · The tenant-shareholder model</p>
        <h2 id="model-h" className="display reveal">
          Most landlords keep the building.<br /><em>We share it.</em>
        </h2>
        <p className="lede reveal">
          Heartwood was founded for owner-managed businesses that need room to grow. Instead of paying rent into
          someone else’s asset forever, our tenants become shareholders and, over time, owners.
        </p>
      </div>

      <div className="model__body" ref={box}>
        <div className="model__viz">
          <Tower year={year} />
          <div className="model__readout" aria-hidden="true">
            <span className="mono">Year</span>
            <strong>{year}</strong>
            <span className="mono">of 10</span>
          </div>
        </div>

        <div className="model__text">
          <ol className="model__steps">
            {stages.map((s) => (
              <li key={s.title} className={s === stage ? 'is-active' : year >= s.from ? 'is-past' : ''}>
                <button type="button" onClick={() => { touched.current = true; setYear(s.from) }}>
                  <span className="mono">Year {s.from}</span>
                  <span className="model__steptitle">{s.title}</span>
                </button>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
          <label className="scrub">
            <span className="sr">Lease year</span>
            <input
              type="range" min="0" max="10" step="1" value={year}
              onChange={(e) => { touched.current = true; setYear(+e.target.value) }}
              style={{ '--p': `${year * 10}%` }}
            />
            <span className="scrub__ticks mono" aria-hidden="true"><span>Lease</span><span>Share</span><span>Own</span></span>
          </label>
          <p className="fineprint">Illustrative. Shareholding and ownership terms are agreed per development.</p>
        </div>
      </div>
    </section>
  )
}
