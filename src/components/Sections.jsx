import { useEffect, useRef, useState } from 'react'
import { objectives, board, investorLinks, contact, places } from '../data.js'
import { useReveal } from '../hooks/index.js'

export function Marquee() {
  const row = [...places, ...places]
  return (
    <div className="marquee" aria-label={`Where we build: ${places.join(', ')}`}>
      <div className="marquee__track" aria-hidden="true">
        {row.map((p, i) => <span key={i}>{p}<i className="marquee__dot" /></span>)}
      </div>
    </div>
  )
}

function Counter({ to, run }) {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!run) return
    const t0 = performance.now()
    let raf
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / 1400)
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [run, to])
  return <>{v}</>
}

// Small line drawings for the objectives, drawn in when the section appears.
function Glyph({ k }) {
  const d = {
    // a leaf with veins: green, usable buildings
    Quality: ['M10 70C10 30 40 10 76 10c0 36-20 66-60 60Z', 'M14 66L60 24', 'M30 50h16', 'M40 40V26'],
    // stacked volumes: a growing portfolio
    Portfolio: ['M8 72h68', 'M12 72V50h18v22', 'M34 72V34h18v38', 'M56 72V14h18v58'],
    // a rising line: wealth that compounds
    Wealth: ['M8 76h70', 'M10 66L30 50L46 56L74 20', 'M60 20h14v14'],
  }[k]
  return (
    <svg className="obj__glyph" viewBox="0 0 84 84" aria-hidden="true">
      {d.map((p, i) => <path key={i} d={p} pathLength="1" style={{ '--d': `${0.3 + i * 0.15}s` }} />)}
    </svg>
  )
}

export function Objectives() {
  const ref = useRef(null)
  const [run, setRun] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setRun(true); ref.current.classList.add('is-in'); io.disconnect() }
    }, { threshold: 0.25 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  return (
    <section className="objs" data-bg="#141414" ref={ref} aria-labelledby="objs-h">
      <div className="objs__head">
        <p className="kicker reveal"><span className="kicker__n">05</span>Objectives</p>
        <h2 id="objs-h" className="display reveal">Four objectives.<br />One long horizon.</h2>
      </div>
      <div className="objs__grid">
        {objectives.map((o, i) => (
          <article key={o.k} className={`obj ${o.stat ? 'obj--stat' : ''}`} style={{ '--i': i }}>
            <span className="mono">0{i + 1}</span>
            {o.stat ? (
              <p className="obj__stat"><span>&gt;</span><Counter to={o.stat} run={run} /><small>%</small></p>
            ) : <Glyph k={o.k} />}
            <h3 className="obj__k">{o.k}</h3>
            <p className="obj__t">{o.t}</p>
            {o.stat ? <p className="fineprint">Target. Per annum, compounded, pre-tax.</p> : null}
          </article>
        ))}
      </div>
      <dl className="facts">
        <div><dt className="mono">Founded</dt><dd>2011</dd></div>
        <div><dt className="mono">Completed</dt><dd>11</dd></div>
        <div><dt className="mono">Provinces</dt><dd>2</dd></div>
        <div><dt className="mono">Listed</dt><dd>2018</dd></div>
      </dl>
    </section>
  )
}

export function Board() {
  const ref = useReveal({ threshold: 0.1 })
  const [open, setOpen] = useState(1)
  return (
    <section className="board" id="leadership" data-bg="#0a0a0a" ref={ref} aria-labelledby="board-h">
      <div className="board__head">
        <p className="kicker reveal"><span className="kicker__n">06</span>Leadership</p>
        <h2 id="board-h" className="display reveal">Our leadership.</h2>
        <p className="lede reveal">Founded by entrepreneurs with backgrounds in business engineering and commercial property, and governed by a board that puts transparency and compliance first.</p>
      </div>
      <ul className="board__list">
        {board.map((p, i) => (
          <li key={p.name} className={open === i ? 'is-open' : ''} style={{ '--i': i }}>
            <button type="button" aria-expanded={p.bio ? open === i : undefined} onClick={() => setOpen(open === i ? -1 : i)} onMouseEnter={() => setOpen(i)}>
              <span className="mono">{String(i + 1).padStart(2, '0')}</span>
              <span className="board__name">{p.name}</span>
              <span className="board__role">{p.role}</span>
            </button>
            {p.bio ? <div className="board__bio"><p>{p.bio}</p></div> : null}
          </li>
        ))}
      </ul>
    </section>
  )
}

export function Investors() {
  const ref = useReveal()
  return (
    <section className="inv" id="investors" data-bg="#0a0a0a" ref={ref} aria-labelledby="inv-h">
      <img className="inv__bg" src="/img/reserve-04.webp" alt="" loading="lazy" decoding="async" />
      <div className="inv__inner">
        <p className="kicker reveal"><span className="kicker__n">07</span>Investors</p>
        <h2 id="inv-h" className="display reveal">Invest alongside us.</h2>
        <p className="lede reveal">
          Heartwood Properties Limited has been listed on the{' '}
          <a className="link" href={contact.ctse} target="_blank" rel="noreferrer">Cape Town Stock Exchange</a> since March 2018.
          Investors can also partner with us directly on individual developments.
        </p>
        <ul className="inv__links">
          {investorLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href} target="_blank" rel="noreferrer">
                <span>{l.label}</span><span className="inv__arrow" aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

const interests = ['Leasing space', 'Building to spec', 'Buying a unit', 'Investing']

export function Contact() {
  const ref = useReveal({ threshold: 0.1 })
  const [interest, setInterest] = useState(interests[0])
  const submit = (e) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const subject = `Website enquiry: ${interest}`
    const body = `Name: ${f.get('name')}\nCompany: ${f.get('company') || '-'}\nInterest: ${interest}\n\n${f.get('message')}`
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }
  return (
    <section className="contact" id="contact" data-bg="#141414" ref={ref} aria-labelledby="contact-h">
      <p className="kicker reveal contact__kicker"><span className="kicker__n">08</span>Contact</p>
      <h2 id="contact-h" className="contact__title reveal">
        Find your<br /><em>next address.</em>
      </h2>
      <div className="contact__grid">
        <form className="form reveal" onSubmit={submit}>
          <fieldset className="chips">
            <legend className="mono">I’m interested in</legend>
            {interests.map((t) => (
              <label key={t} className={interest === t ? 'is-on' : ''}>
                <input type="radio" name="interest" value={t} checked={interest === t} onChange={() => setInterest(t)} />
                {t}
              </label>
            ))}
          </fieldset>
          <div className="form__row">
            <label className="field"><span className="mono">Name</span><input name="name" required autoComplete="name" /></label>
            <label className="field"><span className="mono">Company</span><input name="company" autoComplete="organization" /></label>
          </div>
          <label className="field"><span className="mono">Tell us what you need</span><textarea name="message" rows="3" required /></label>
          <button className="btn btn--solid btn--lg" type="submit">Send enquiry</button>
          <p className="fineprint">Opens your email app with the message ready to send.</p>
        </form>
        <div className="contact__details reveal">
          <div>
            <p className="mono">Leasing &amp; sales · {contact.leasing.name}</p>
            <a className="contact__big" href={contact.leasing.phoneHref}>{contact.leasing.phone}</a>
            <a className="contact__small" href={`mailto:${contact.leasing.email}`}>{contact.leasing.email}</a>
          </div>
          <div>
            <p className="mono">Head office</p>
            <a className="contact__big" href={contact.phoneHref}>{contact.phone}</a>
          </div>
          <div>
            <p className="mono">General enquiries</p>
            <a className="contact__big" href={`mailto:${contact.email}`}>{contact.email}</a>
          </div>
          <div>
            <p className="mono">Visit</p>
            <address>{contact.address.map((l) => <span key={l}>{l}<br /></span>)}</address>
          </div>
          <a className="link" href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  )
}

const YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="foot" data-bg="#0a0a0a">
      <div className="foot__top">
        <img src="/img/logo-stacked.png" alt="Heartwood Properties" width="400" height="251" className="foot__logo" />
        <p className="foot__tag">What’s ours, is yours.</p>
      </div>
      <div className="foot__row">
        <span>© {YEAR} Heartwood Properties Limited</span>
        <span className="foot__links">
          <a href={contact.paia} target="_blank" rel="noreferrer">PAIA manual</a>
          <a href={contact.privacy} target="_blank" rel="noreferrer">Privacy policy</a>
          <a href="#top">Back to top ↑</a>
        </span>
      </div>
    </footer>
  )
}
