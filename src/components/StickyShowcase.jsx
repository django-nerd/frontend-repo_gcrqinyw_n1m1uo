import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function StickyShowcase() {
  const containerRef = useRef(null)
  const itemsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((el, idx) => {
        gsap.fromTo(el, { opacity: 0, y: 40 }, {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: el,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 1,
          }
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const features = [
    { title: 'GSAP + ScrollTrigger', desc: 'Powerful scroll-driven interactions', gradient: 'from-fuchsia-500 to-pink-500' },
    { title: 'Lenis Smooth Scroll', desc: 'Silky smooth feel across the site', gradient: 'from-purple-500 to-blue-500' },
    { title: 'Parallax Layers', desc: 'Tasteful depth for hero and media', gradient: 'from-orange-500 to-rose-500' },
  ]

  return (
    <section ref={containerRef} className="relative py-28 md:py-40">
      <div className="sticky top-0 z-0 h-32 -mt-32 bg-gradient-to-r from-fuchsia-500/20 via-pink-500/20 to-orange-500/20 blur-3xl" />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white">Motion-first building blocks</h2>
          <p className="mt-4 text-white/70">Carefully crafted sections that feel premium and effortless.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {features.map((f, i) => (
            <div
              key={f.title}
              ref={el => (itemsRef.current[i] = el)}
              className="relative p-6 md:p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden group"
            >
              <div className={`absolute -top-20 -right-10 w-52 h-52 bg-gradient-to-br ${f.gradient} rounded-full blur-3xl opacity-40 group-hover:opacity-60 transition`} />
              <h3 className="text-2xl font-bold text-white">{f.title}</h3>
              <p className="mt-3 text-white/70">{f.desc}</p>
              <div className="mt-8 inline-flex px-4 py-2 rounded-full bg-white/10 text-white/80 border border-white/10">Learn more</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
