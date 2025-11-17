import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-white font-extrabold text-xl">Ultra <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-pink-400 to-orange-400">Blog</span></Link>
        <nav className="flex items-center gap-6 text-white/80">
          <NavLink to="/" className={({isActive}) => isActive ? 'text-white' : 'hover:text-white'}>Home</NavLink>
          <NavLink to="/blog" className={({isActive}) => isActive ? 'text-white' : 'hover:text-white'}>Blog</NavLink>
          <NavLink to="/test" className={({isActive}) => isActive ? 'text-white' : 'hover:text-white'}>Test</NavLink>
        </nav>
      </div>
      <div className="pointer-events-none h-px w-full bg-gradient-to-r from-fuchsia-500/0 via-pink-500/40 to-orange-500/0" />
    </div>
  )
}
