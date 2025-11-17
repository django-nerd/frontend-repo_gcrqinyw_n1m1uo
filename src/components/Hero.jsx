import React, { useEffect, useRef } from 'react'
import Spline from '@splinetool/react-spline'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const containerRef = useRef(null)
  const headlineRef = useRef(null)
  const subRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    // Smooth scroll
    const lenis = new Lenis({
      smoothWheel: true,
      duration: 1.1,
      easing: (t) => Math.min(1, 1 - Math.pow(2, -10 * t)),
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // Intro animations
    const tl = gsap.timeline()
    tl.fromTo(headlineRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out' })
      .fromTo(subRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }, '-=0.6')
      .fromTo(ctaRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.5')

    // Parallax for headline block
    gsap.to([headlineRef.current, subRef.current, ctaRef.current], {
      yPercent: -10,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    })

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <section ref={containerRef} className="relative min-h-[90vh] md:min-h-screen overflow-hidden">
      {/* Gradient moving background */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_10%_20%,rgba(168,85,247,0.35),transparent),radial-gradient(900px_500px_at_90%_10%,rgba(59,130,246,0.35),transparent),radial-gradient(700px_400px_at_50%_90%,rgba(236,72,153,0.35),transparent)] blur-3xl opacity-60 pointer-events-none" />

      {/* Spline 3D object */}
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/wwTRdG1D9CkNs368/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-28 pb-24 md:pt-40 md:pb-40">
        <div className="max-w-3xl">
          <h1 ref={headlineRef} className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05] text-white">
            Build bold, beautiful blogs with a futuristic edge
          </h1>
          <p ref={subRef} className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl">
            Ultra-modern gradients, buttery-smooth scroll, and premium motion out of the box.
          </p>
          <div ref={ctaRef} className="mt-10 flex items-center gap-4">
            <a href="#latest" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-gradient-to-r from-fuchsia-500 via-pink-500 to-orange-500 text-white font-semibold shadow-[0_0_30px_rgba(236,72,153,0.5)] hover:scale-[1.03] hover:brightness-110 transition transform">
              Explore latest posts
            </a>
            <a href="/blog" className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/20 text-white/90 hover:text-white hover:bg-white/10 transition">
              Browse all posts
            </a>
          </div>
        </div>
      </div>

      {/* Floating blobs */}
      <div className="absolute -top-24 right-10 w-72 h-72 bg-gradient-to-br from-purple-500/40 to-blue-500/40 rounded-full blur-3xl animate-spin-slow" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-gradient-to-br from-pink-500/40 to-orange-500/40 rounded-full blur-3xl animate-spin-slow" />
    </section>
  )
}
