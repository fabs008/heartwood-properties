import { useEffect, useState } from 'react'
import Hero from './components/Hero.jsx'
import Developments from './components/Developments.jsx'
import Model from './components/Model.jsx'
import { Location, TrackRecord } from './components/Place.jsx'
import { Nav, Loader } from './components/Chrome.jsx'
import { Marquee, Objectives, Board, Investors, Contact, Footer } from './components/Sections.jsx'
import { useReducedMotion } from './hooks/index.js'
import { startSmoothScroll, startColourFlow } from './smooth.js'

export default function App() {
  const reducedMotion = useReducedMotion()
  const [started, setStarted] = useState(false)
  useEffect(() => (reducedMotion ? undefined : startSmoothScroll()), [reducedMotion])
  useEffect(() => startColourFlow(), [])
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Loader skip={reducedMotion} onDone={() => setStarted(true)} />
      <Nav />
      <main id="main">
        <Hero started={started} reducedMotion={reducedMotion} />
        <Marquee />
        <Developments />
        <Location />
        <Model reducedMotion={reducedMotion} />
        <TrackRecord />
        <Objectives />
        <Board />
        <Investors />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
