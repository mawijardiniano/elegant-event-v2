import React from 'react'
import Hero from './component/hero'
import Contact from './component/contact'

export default function Home() {
  return (
    <div>
      <section>
        <Hero/>
      </section>
      <section>
        <Contact/>
      </section>
    </div>
  )
}
