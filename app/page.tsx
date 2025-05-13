"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import dynamic from "next/dynamic"
import { ArrowRight, ExternalLink, Github, Mail, Twitter, User } from "lucide-react"

import { cn } from "@/lib/utils"
import NavbarCollapsed from "@/components/navbar-collapsed"
import Image from 'next/image';

// Dynamically import the 3D components to avoid SSR issues
const HeroScene = dynamic(() => import("@/components/hero-scene"), { ssr: false })
const ProjectScene = dynamic(() => import("@/components/project-scene"), { ssr: false })

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [isLoading, setIsLoading] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      clearTimeout(timer)
    }
  }, [])

  const sections = ["home", "projects", "skills", "about"]

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black text-white">
      {/* Custom cursor */}
      <motion.div
        className="pointer-events-none fixed z-50 h-8 w-8 rounded-full border border-cyan-500 mix-blend-difference"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
        }}
        transition={{ type: "tween", duration: 0.1 }}
      />
      <motion.div
        className="pointer-events-none fixed z-50 h-2 w-2 rounded-full bg-cyan-500 mix-blend-difference"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
        }}
        transition={{ type: "tween", duration: 0.05 }}
      />

      {/* Loading screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="absolute inset-0 z-50 flex items-center justify-center bg-black"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="relative h-20 w-20"
              animate={{ rotate: 360 }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "linear" }}
            >
              <div className="absolute inset-0 rounded-full border-2 border-t-cyan-500 border-r-purple-500 border-b-pink-500 border-l-blue-500" />
            </motion.div>
            <motion.h1
              className="absolute mt-32 font-mono text-xl tracking-wider text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              INITIALIZING
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      {activeSection === "projects" || activeSection === "skills" ? (
        <NavbarCollapsed activeSection={activeSection} sections={sections} setActiveSection={setActiveSection} />
      ) : (
        <nav className="fixed left-10 top-1/2 z-40 -translate-y-1/2 transform rounded-lg bg-black/70 p-4 backdrop-blur-md">
          <ul className="flex flex-col gap-8">
            {sections.map((section) => (
              <li key={section}>
                <button
                  onClick={() => setActiveSection(section)}
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
        </nav>
      )}

      {/* Social links */}
      <div className="fixed bottom-10 right-10 z-40 flex gap-6 mr-8">
        <a href="https://github.com/ekagra444" target="_blank" rel="noopener noreferrer" className="group">
          <Github className="h-6 w-6 text-gray-300 transition-all group-hover:text-cyan-400" />
        </a>
        <a href="ekagra444@gmail.com" className="group">
          <Mail className="h-6 w-6 text-gray-300 transition-all group-hover:text-cyan-400" />
        </a>
        <a href="https://x.com/Ekagra0007" target="_blank" rel="noopener noreferrer" className="group">
        <Twitter className="h-6 w-6 text-gray-300 transition-all group-hover:text-cyan-400" />
        </a>
      </div>

      {/* Main content */}
      <main className="h-full">
        <AnimatePresence mode="wait">
          {activeSection === "home" && (
            <motion.section
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative h-full w-full"
            >
              <HeroScene />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="rounded-lg bg-black/30 p-8 backdrop-blur-md">
                  <motion.h1
                    className="text-center font-mono text-6xl font-bold tracking-tighter text-white md:text-8xl"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                  >
                    <span className="block">EKAGRA</span>
                    <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                      AGRAWAL
                    </span>
                  </motion.h1>
                  <motion.p
                    className="mt-6 max-w-md text-center font-mono text-lg text-gray-200"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                  >
                    FULL-STACK DEVELOPER
                  </motion.p>
                  <motion.button
                    className="group mt-12 flex items-center gap-2 rounded-full border border-cyan-500 px-6 py-3 font-mono text-sm uppercase tracking-wider text-cyan-400 transition-all hover:bg-cyan-500/10"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    onClick={() => setActiveSection("projects")}
                  >
                    Explore Projects
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </motion.button>
                </div>
              </div>
            </motion.section>
          )}

          {activeSection === "projects" && (
            <motion.section
              key="projects"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative h-full w-full"
            >
              <ProjectScene />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.h2
                  className="mb-16 font-mono text-5xl font-bold tracking-tighter text-white"
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    PROJECTS
                  </span>
                </motion.h2>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    { title: " Extended Brain", 
                      desc: "Personal Portfolio & Idea Hub Smart Search based on hashes", 
                      tech: "React, Express, Node.js, MongoDB ", 
                      githubLink: "https://github.com/Ekagra444/react-extended_brain", 
                      demoLink: "https://react-extended-brain-yz2m.vercel.app/" 
                    },
                    { title: "SoftSell", 
                      desc: "Marketing Website for a Software Resale Startup", 
                      tech: "Next.js, Tailwind CSS, Framer Motion", 
                      githubLink: "https://github.com/Ekagra444/SoftSell-LandingPage", 
                      demoLink: "https://soft-sell-landing-page-theta.vercel.app/" 
                    },
                    { title: "Banking App ",
                      desc: "Banking application enabling real-time money transfers and secure account management", 
                      tech: "React, Express, Node.js, SQL", 
                      githubLink: "https://github.com/Ekagra444/basicPayment_traumaManagement", 
                      demoLink: "https://basic-payment-trauma-management.vercel.app/" 
                    },
                    { title: "Crypto Spread Trading Bot",
                      desc: "A crypto trading bot leveraging price differentials on CoinDCX using spread strategies.",
                      tech: "TypeScript, Node.js, Axios, CoinDCX API",
                      githubLink: "https://github.com/Ekagra444/spread-trading-bot", 
                      demoLink: "" 
                    },
                  ].map((project, index) => (
                    <motion.div
                      key={project.title}
                      className="group relative h-64 w-80 overflow-hidden rounded-lg border border-gray-800 bg-black/50 p-6 backdrop-blur-sm transition-all hover:border-cyan-500/50"
                      initial={{ y: 100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 * index, duration: 0.5 }}
                    >
                      <div className="absolute -inset-0.5 -z-10 rounded-lg bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-blue-500/20 opacity-0 blur transition-all group-hover:opacity-100" />
                      <h3 className="font-mono text-2xl font-bold text-white">{project.title}</h3>
                      <p className="mt-2 text-gray-400">{project.desc}</p>
                      <div className="mt-4 rounded-full bg-gray-800/50 px-3 py-1 text-xs text-gray-300">
                        {project.tech}
                      </div>
                      <div className="absolute bottom-6 right-6 flex gap-3">
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                            <button className="rounded-full bg-gray-800 p-2 text-gray-400 transition-all hover:bg-cyan-500 hover:text-white">
                              <Github className="h-4 w-4" />
                            </button>
                         </a>
                         <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                        <button className="rounded-full bg-gray-800 p-2 text-gray-400 transition-all hover:bg-cyan-500 hover:text-white">
                          <ExternalLink className="h-4 w-4" />
                        </button>
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>
          )}

          {activeSection === "skills" && (
            <motion.section
              key="skills"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative h-full w-full"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.h2
                  className="mb-16 font-mono text-5xl font-bold tracking-tighter text-white"
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    SKILLS
                  </span>
                </motion.h2>
                <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
                  {[
                    { name: "React", level: 95 },
                    { name: "Next.js", level: 90 },
                    { name: "TypeScript", level: 85 },
                    { name: "Three.js", level: 80 },
                    { name: "Node.js", level: 85 },
                    { name: "GraphQL", level: 75 },
                    { name: "WebGL", level: 70 },
                    { name: "Solidity", level: 65 },
                  ].map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      className="w-48"
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 * index, duration: 0.5 }}
                    >
                      <div className="flex justify-between">
                        <span className="font-mono text-sm text-gray-400">{skill.name}</span>
                        <span className="font-mono text-sm text-cyan-400">{skill.level}%</span>
                      </div>
                      <div className="mt-2 h-1 w-full rounded-full bg-gray-800">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ delay: 0.5 + 0.1 * index, duration: 1, ease: "easeOut" }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>
          )}

          {activeSection === "about" && (
            <motion.section
              key="about"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative h-full w-full"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="max-w-3xl px-6">
                  <motion.h2
                    className="mb-8 font-mono text-5xl font-bold tracking-tighter text-white"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                      ABOUT ME
                    </span>
                  </motion.h2>
                  <motion.div
                    className="grid gap-8 md:grid-cols-2"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <div className="relative h-80 w-full overflow-hidden rounded-lg border border-gray-800">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-blue-500/20" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Image
                          src="/Pimage.jpg"     
                          alt="Profile Picture"
                          width={128}
                          height={128}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="mb-4 text-gray-300">
                        I'm a full-stack developer with a passion for creating immersive digital experiences that push
                        the boundaries of web technology.
                      </p>
                      <p className="mb-4 text-gray-300">
                        I specialize in building high-performance
                        applications with modern frameworks and 3D technologies.
                      </p>
                      <p className="text-gray-300">
                        When I'm not coding, you can find me exploring emerging technologies, contributing to
                        open-source projects, or listening to tech conferences around the world.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.section>
          )}

          
        </AnimatePresence>
      </main>
    </div>
  )
}
