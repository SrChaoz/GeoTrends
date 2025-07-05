// frontend/src/components/Navbar.jsx
"use client"

import { useState, useEffect } from "react"
import logo from "./images/geotrendslogo.png"

export default function Navbar() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"))
  }, [])

  const toggle = () => {
    document.documentElement.classList.toggle("dark")
    setIsDark(!isDark)
  }

  return (
    <nav className="bg-gray-100 dark:bg-gray-800 shadow-sm">
      <div className="max-w-full mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo (56×56 px) */}
          <div className="w-14 h-14 overflow-hidden rounded-lg">
            <img
              src={logo}
              alt="GeoTrends Logo"
              width={56}
              height={56}
              className="object-contain"
            />
          </div>

          {/* Toggle tema */}
          <button
            onClick={toggle}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <svg className="w-6 h-6 text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364 6.364l-1.414-1.414M6.343 6.343l-1.414-1.414m12.728 0l-1.414 1.414M6.343 17.657l-1.414 1.414M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  )
}
