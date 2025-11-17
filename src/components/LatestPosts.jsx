import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const demoPosts = [
  {
    id: 'introducing-ultra-motion',
    title: 'Introducing Ultra Motion: Designing with Flow',
    excerpt: 'A deep dive into modern motion design patterns that make interfaces feel alive.',
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1545987796-200677ee1011?q=80&w=1600&auto=format&fit=crop',
    date: '2025-09-12'
  },
  {
    id: 'building-parallax-systems',
    title: 'Building Parallax Systems that Feel Natural',
    excerpt: 'From subtle depth to cinematic layers—how to craft tasteful parallax.',
    category: 'Frontend',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1600&auto=format&fit=crop',
    date: '2025-10-01'
  },
  {
    id: 'gsap-scrolltrigger-recipes',
    title: 'GSAP + ScrollTrigger Recipes for 2025',
    excerpt: 'Practical patterns you can drop into any project for instant polish.',
    category: 'Animation',
    image: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1600&auto=format&fit=crop',
    date: '2025-11-04'
  },
]

export default function LatestPosts() {
  const cardsRef = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0', 'translate-y-8')
          entry.target.classList.add('opacity-100', 'translate-y-0')
        }
      })
    }, { threshold: 0.2 })

    cardsRef.current.forEach(el => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="latest" className="relative py-24 md:py-32">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(800px_400px_at_10%_30%,rgba(147,51,234,0.25),transparent),radial-gradient(700px_400px_at_90%_70%,rgba(59,130,246,0.2),transparent)]" />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between mb-10 md:mb-14">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">Latest posts</h2>
          <Link to="/blog" className="text-white/80 hover:text-white transition">View all</Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {demoPosts.map((post, i) => (
            <Link
              to={`/blog/${post.id}`}
              key={post.id}
              ref={el => (cardsRef.current[i] = el)}
              className="group relative rounded-3xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 p-4 md:p-5 transform transition will-change-transform opacity-0 translate-y-8"
              style={{ transitionDuration: `${400 + i * 120}ms` }}
            >
              <div className="relative h-48 md:h-56 rounded-2xl overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70" />
                <span className="absolute top-3 left-3 text-xs uppercase tracking-wide px-2 py-1 rounded-full bg-white/10 text-white/90 backdrop-blur">
                  {post.category}
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-white">{post.title}</h3>
                <p className="mt-2 text-white/70 text-sm md:text-base">{post.excerpt}</p>
                <div className="mt-4 flex items-center justify-between text-white/60 text-xs">
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                  <span className="group-hover:translate-x-1 transition-transform">Read →</span>
                </div>
              </div>
              <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-fuchsia-500/0 via-pink-500/0 to-orange-500/0 group-hover:from-fuchsia-500/20 group-hover:via-pink-500/20 group-hover:to-orange-500/20 blur-xl transition" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
