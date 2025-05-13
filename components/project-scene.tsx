"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function ProjectScene() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)

    // Grid
    const size = 20
    const divisions = 20
    const gridHelper = new THREE.GridHelper(size, divisions, 0x0088ff, 0x001a33)
    gridHelper.position.y = -3
    scene.add(gridHelper)

    // Floating cubes
    const cubes: THREE.Mesh[] = []
    const cubeCount = 50

    for (let i = 0; i < cubeCount; i++) {
      const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2)
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0.2 + Math.random() * 0.5, 0.5 + Math.random() * 0.5, 0.8 + Math.random() * 0.2),
        wireframe: true,
        transparent: true,
        opacity: 0.6,
      })

      const cube = new THREE.Mesh(geometry, material)

      // Random position
      cube.position.x = (Math.random() - 0.5) * 10
      cube.position.y = (Math.random() - 0.5) * 10
      cube.position.z = (Math.random() - 0.5) * 10

      // Store initial position for animation
      cube.userData.initialY = cube.position.y
      cube.userData.speed = 0.01 + Math.random() * 0.02

      scene.add(cube)
      cubes.push(cube)
    }

    // Mouse movement
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0

    const windowHalfX = window.innerWidth / 2
    const windowHalfY = window.innerHeight / 2

    const onDocumentMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - windowHalfX) / 100
      mouseY = (event.clientY - windowHalfY) / 100
    }

    document.addEventListener("mousemove", onDocumentMouseMove)

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    // Animation
    const clock = new THREE.Clock()

    const animate = () => {
      const elapsedTime = clock.getElapsedTime()

      // Smooth camera movement
      targetX = mouseX * 0.5
      targetY = mouseY * 0.5

      camera.position.x += (targetX - camera.position.x) * 0.05
      camera.position.y += (-targetY - camera.position.y) * 0.05
      camera.lookAt(scene.position)

      // Animate cubes
      cubes.forEach((cube, i) => {
        cube.rotation.x += 0.01
        cube.rotation.y += 0.01

        // Floating animation
        cube.position.y = cube.userData.initialY + Math.sin(elapsedTime * cube.userData.speed) * 0.5
      })

      // Rotate grid
      gridHelper.rotation.y += 0.001

      // Render
      renderer.render(scene, camera)

      // Call animate again on the next frame
      requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }
      window.removeEventListener("resize", handleResize)
      document.removeEventListener("mousemove", onDocumentMouseMove)

      // Dispose resources
      cubes.forEach((cube) => {
        cube.geometry.dispose();
        (cube.material as THREE.Material).dispose()
      })
      renderer.dispose()
    }
  }, [])

  return <div ref={containerRef} className="absolute inset-0" />
}
