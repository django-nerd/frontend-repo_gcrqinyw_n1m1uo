import React, { useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const posts = {
  'introducing-ultra-motion': {
    title: 'Introducing Ultra Motion: Designing with Flow',
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1545987796-200677ee1011?q=80&w=1600&auto=format&fit=crop',
    content: `# Ultra Motion\n\nWelcome to the future of motion on the web.\n\n## Why motion matters\nMotion communicates cause and effect, reveals hierarchy, and guides focus.\n\n### Core principles\n- Purposeful\n- Subtle\n- Consistent\n\n## Patterns to use\n- Staggered reveals\n- Parallax layers\n- Scroll-linked microinteractions\n\n### Code example\n\n\`\`\`js\nimport { gsap } from 'gsap'\ngsap.from('.item', { y: 20, opacity: 0, stagger: 0.1 })\n\`\`\`\n\n## Closing thoughts\nDesign for feeling, not just function.`
  },
  'building-parallax-systems': {
    title: 'Building Parallax Systems that Feel Natural',
    category: 'Frontend',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1600&auto=format&fit=crop',
    content: `# Parallax\n\nParallax adds depth when used tastefully. Keep motion within 10-20% range.\n\n## Layers\n- Background (slow)\n- Midground (medium)\n- Foreground (fast)`
  },
  'gsap-scrolltrigger-recipes': {
    title: 'GSAP + ScrollTrigger Recipes for 2025',
    category: 'Animation',
    image: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1600&auto=format&fit=crop',
    content: `# ScrollTrigger Recipes\n\nUse pinning, scrub, and snapping to create premium scroll journeys.`
  },
}

function Markdown({ content }) {
  // ultra lightweight markdown rendering for demo
  const lines = content.split('\n')
  return (
    <div className="prose prose-invert max-w-none">
      {lines.map((line, i) => {
        if (line.startsWith('### ')) return <h3 key={i} className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-pink-400 to-orange-400">{line.replace('### ', '')}</h3>
        if (line.startsWith('## ')) return <h2 key={i} className="text-3xl font-extrabold mt-8">{line.replace('## ', '')}</h2>
        if (line.startsWith('# ')) return <h1 key={i} className="text-4xl md:text-5xl font-extrabold">{line.replace('# ', '')}</h1>
        if (line.startsWith('- ')) return <li key={i} className="ml-6 list-disc text-white/80">{line.replace('- ', '')}</li>
        if (line.startsWith('```')) return <pre key={i} className="my-4 p-4 rounded-xl bg-white/10 border border-white/10 overflow-auto"><code>/* code */</code></pre>
        if (line.trim() === '') return <br key={i} />
        return <p key={i} className="text-white/80">{line}</p>
      })}
    </div>
  )
}

export default function BlogPost() {
  const { id } = useParams()
  const post = posts[id]

  const progressRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    const updateProgress = () => {
      const doc = document.documentElement
      const total = doc.scrollHeight - doc.clientHeight
      const current = doc.scrollTop
      const width = (current / total) * 100
      if (progressRef.current) progressRef.current.style.width = width + '%'
    }
    window.addEventListener('scroll', updateProgress)
    updateProgress()

    // Parallax image
    gsap.to(imageRef.current, {
      yPercent: -20,
      ease: 'none',
      scrollTrigger: {
        trigger: imageRef.current,
        start: 'top 80%',
        end: 'bottom top',
        scrub: true,
      }
    })

    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  if (!post) return (
    <div className="min-h-screen bg-slate-950 text-white grid place-items-center">
      <div className="text-center px-6">
        <h1 className="text-4xl font-extrabold">Post not found</h1>
        <Link to="/blog" className="mt-4 inline-block text-white/80 underline">Back to blog</Link>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-fuchsia-500 via-pink-500 to-orange-500" ref={progressRef} style={{ width: 0 }} />

      <article className="relative">
        <header className="relative h-[46vh] md:h-[60vh] overflow-hidden">
          <img ref={imageRef} src={post.image} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full px-6">
            <div className="max-w-5xl mx-auto">
              <span className="text-xs uppercase tracking-wide text-white/80">{post.category}</span>
              <h1 className="mt-2 text-3xl md:text-6xl font-extrabold leading-tight">{post.title}</h1>
            </div>
          </div>
        </header>

        <div className="max-w-3xl mx-auto px-6 pb-24">
          <div className="grid md:grid-cols-[1fr_260px] gap-10">
            <div>
              <Markdown content={post.content} />
            </div>
            <aside className="sticky hidden md:block top-24 h-max">
              <div className="p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
                <h4 className="font-semibold">On this page</h4>
                <ul className="mt-3 space-y-2 text-white/70 text-sm">
                  <li>Intro</li>
                  <li>Why motion matters</li>
                  <li>Patterns</li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </article>
    </div>
  )
}
