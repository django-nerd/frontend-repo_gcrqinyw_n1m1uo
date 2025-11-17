import React from 'react'

export default function Footer() {
  return (
    <footer className="relative py-16">
      <div className="absolute inset-0 bg-[radial-gradient(600px_300px_at_50%_0%,rgba(236,72,153,0.25),transparent)]" />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-white text-2xl font-bold">Ultra Blog</h4>
            <p className="text-white/60 mt-1">Crafted with gradients, motion, and taste.</p>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-white/70 hover:text-white transition">Twitter</a>
            <a href="#" className="text-white/70 hover:text-white transition">Github</a>
            <a href="#" className="text-white/70 hover:text-white transition">Dribbble</a>
          </div>
        </div>
        <div className="mt-8 text-center text-white/50 text-sm">© {new Date().getFullYear()} Ultra Blog. All rights reserved.</div>
      </div>
    </footer>
  )
}
