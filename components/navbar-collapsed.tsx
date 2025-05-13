"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavbarCollapsedProps {
  activeSection: string
  sections: string[]
  setActiveSection: (section: string) => void
}

export default function NavbarCollapsed({ activeSection, sections, setActiveSection }: NavbarCollapsedProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleSectionClick = (section: string) => {
    setActiveSection(section)
    setIsOpen(false)
  }

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={toggleMenu}
        className="fixed left-10 top-10 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-black/70 backdrop-blur-md transition-all hover:bg-cyan-500/20"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-6 w-6 text-cyan-400" /> : <Menu className="h-6 w-6 text-cyan-400" />}
      </button>

      {/* Menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Navigation menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed left-0 top-0 z-40 h-full w-64 bg-black/90 p-8 pt-24 backdrop-blur-md"
          >
            <ul className="flex flex-col gap-8">
              {sections.map((section) => (
                <li key={section}>
                  <button
                    onClick={() => handleSectionClick(section)}
                    className={cn(
                      "group relative flex items-center gap-4 font-mono text-sm uppercase tracking-widest transition-all",
                      activeSection === section ? "text-cyan-400" : "text-gray-300 hover:text-white",
                    )}
                  >
                    <span
                      className={cn(
                        "h-[1px] w-8 transition-all",
                        activeSection === section ? "w-12 bg-cyan-400" : "bg-gray-500 group-hover:bg-white",
                      )}
                    />
                    <span>{section}</span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Current section indicator (when menu is closed) */}
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed left-10 top-24 z-30 rounded-full bg-black/70 px-4 py-2 font-mono text-xs uppercase tracking-wider text-cyan-400 backdrop-blur-md"
        >
          {activeSection}
        </motion.div>
      )}
    </>
  )
}
