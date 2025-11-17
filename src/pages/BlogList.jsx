import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const categories = ['All', 'Design', 'Frontend', 'Animation']

const posts = [
  { id: 'introducing-ultra-motion', title: 'Introducing Ultra Motion: Designing with Flow', category: 'Design', image: 'https://images.unsplash.com/photo-1545987796-200677ee1011?q=80&w=1600&auto=format&fit=crop', excerpt: 'Modern motion patterns that feel effortless.' },
  { id: 'building-parallax-systems', title: 'Building Parallax Systems that Feel Natural', category: 'Frontend', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1600&auto=format&fit=crop', excerpt: 'Tasteful depth, step by step.' },
  { id: 'gsap-scrolltrigger-recipes', title: 'GSAP + ScrollTrigger Recipes for 2025', category: 'Animation', image: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1600&auto=format&fit=crop', excerpt: 'Ready-to-use patterns for wow.' },
  { id: 'smooth-scroll-lenis', title: 'Smooth Scroll with Lenis', category: 'Frontend', image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=1600&auto=format&fit=crop', excerpt: 'Make scrolling feel premium.' },
  { id: 'neon-gradient-systems', title: 'Neon Gradient Systems', category: 'Design', image: 'https://images.unsplash.com/photo-1618004652321-13a63e576b80?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxJbnRyb2R1Y2luZyUyMFVsdHJhJTIwTW90aW9uJTNBJTIwRGVzaWduaW5nfGVufDB8MHx8fDE3NjM0MjExNzl8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80', excerpt: 'Blend purple → pink → orange → blue.' },
]

export default function BlogList() {
  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? posts : posts.filter(p => p.category === active)

  useEffect(() => {
    const cards = document.querySelectorAll('.blog-card')
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.remove('opacity-0', 'translate-y-6')
          e.target.classList.add('opacity-100', 'translate-y-0')
        }
      })
    }, { threshold: 0.2 })
    cards.forEach(c => io.observe(c))
    return () => io.disconnect()
  }, [active])

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="relative pt-28 pb-12">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_10%_20%,rgba(168,85,247,0.35),transparent),radial-gradient(900px_500px_at_90%_10%,rgba(59,130,246,0.35),transparent)] blur-3xl opacity-60" />
        <div className="relative max-w-6xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold">All posts</h1>
          <p className="mt-3 text-white/70 max-w-2xl">Browse articles on motion, design, and frontend craft.</p>

          <div className="mt-8 flex flex-wrap gap-3">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-2 rounded-full border transition ${active === cat ? 'bg-white/15 text-white border-white/20' : 'text-white/70 border-white/10 hover:bg-white/10'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="mt-10 columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]"></div>

          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filtered.map((p, i) => (
              <Link key={p.id} to={`/blog/${p.id}`} className="blog-card opacity-0 translate-y-6 transition duration-700">
                <div className="rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md">
                  <div className="h-52 overflow-hidden">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-5">
                    <div className="text-xs uppercase tracking-wide text-white/70">{p.category}</div>
                    <h3 className="mt-2 text-xl font-bold">{p.title}</h3>
                    <p className="mt-2 text-white/70">{p.excerpt}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
