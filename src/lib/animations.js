// Centralized GSAP + ScrollTrigger helpers (optional import site-wide)
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'

gsap.registerPlugin(ScrollTrigger)

export function initLenis() {
  const lenis = new Lenis({
    duration: 1.1,
    smoothWheel: true,
  })
  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)
  return lenis
}

export function revealOnScroll(selector, options = {}) {
  const els = document.querySelectorAll(selector)
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.remove('opacity-0', 'translate-y-6')
        e.target.classList.add('opacity-100', 'translate-y-0')
      }
    })
  }, { threshold: 0.2, ...options })
  els.forEach(el => io.observe(el))
  return () => io.disconnect()
}
