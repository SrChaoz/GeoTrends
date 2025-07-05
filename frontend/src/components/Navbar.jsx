"use client"

import { useState } from "react"

export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(true) // Default to dark mode

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <nav className="bg-gray-800 shadow-sm">
      <div className="max-w-full mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Flame Logo */}
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 via-red-500 to-red-600 rounded-lg flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-8 h-8 text-white" fill="currentColor">
                <path d="M12.5 2c1.5 2.5 3 5.5 3 8.5 0 3.5-2.5 6.5-6 6.5s-6-3-6-6.5c0-3 1.5-6 3-8.5 1-1.5 2-2.5 3-2.5s2 1 3 2.5z" />
                <path
                  d="M12 8c.5 1.5 1 3 1 4.5 0 2-1.5 3.5-3.5 3.5s-3.5-1.5-3.5-3.5c0-1.5.5-3 1-4.5.5-1 1-1.5 1.5-1.5s1 .5 1.5 1.5z"
                  className="opacity-80"
                />
              </svg>
            </div>
          </div>

          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-all duration-200"
            aria-label="Toggle theme"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
}
