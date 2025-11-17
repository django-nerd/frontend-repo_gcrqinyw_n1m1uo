import React from 'react'
import Hero from '../components/Hero'
import LatestPosts from '../components/LatestPosts'
import StickyShowcase from '../components/StickyShowcase'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Hero />
      <LatestPosts />
      <StickyShowcase />
      <Footer />
    </div>
  )
}
