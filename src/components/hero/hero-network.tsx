import { useRef, useEffect } from "react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  pulse: number
  color: string
  connections: number[]
}

export function HeroNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || reduced) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animId: number
    let mouseX = -1000
    let mouseY = -1000
    const colors = ["#6d5ef9", "#00d4ff", "#8b5cf6"]

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const nodeCount = Math.min(70, Math.floor((window.innerWidth * window.innerHeight) / 18000))
    const nodes: Node[] = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: 0.5 + Math.random() * 2.5,
      pulse: Math.random() * Math.PI * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      connections: [],
    }))

    // Assign connections randomly per frame
    const getConnections = (idx: number) => {
      const conns: number[] = []
      const maxConn = 2 + Math.floor(Math.random() * 3)
      for (let j = 0; j < nodes.length && conns.length < maxConn; j++) {
        if (j !== idx && Math.random() < 0.02) {
          conns.push(j)
        }
      }
      return conns
    }

    const onMouse = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }
    window.addEventListener("mousemove", onMouse)

    let lastConnectionUpdate = 0
    let dataParticles: { from: number; to: number; progress: number; speed: number }[] = []

    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
      const time = Date.now() * 0.001

      // Update connections periodically
      if (time - lastConnectionUpdate > 0.5) {
        lastConnectionUpdate = time
        for (let i = 0; i < nodes.length; i++) {
          nodes[i].connections = getConnections(i)
        }
      }

      // Spawn data particles
      if (Math.random() < 0.08 && nodes.length > 1) {
        const from = Math.floor(Math.random() * nodes.length)
        if (nodes[from].connections.length > 0) {
          const to = nodes[from].connections[Math.floor(Math.random() * nodes[from].connections.length)]
          dataParticles.push({ from, to, progress: 0, speed: 0.008 + Math.random() * 0.012 })
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        n.x += n.vx
        n.y += n.vy
        n.pulse += 0.025

        if (n.x < 0 || n.x > canvas!.width) n.vx *= -1
        if (n.y < 0 || n.y > canvas!.height) n.vy *= -1

        const dx = mouseX - n.x
        const dy = mouseY - n.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 250) {
          const force = (1 - dist / 250) * 0.03
          n.x -= dx * force
          n.y -= dy * force
        }
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (const j of nodes[i].connections) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const maxDist = Math.min(250, canvas!.width * 0.18)

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.12
            ctx!.beginPath()
            ctx!.moveTo(nodes[i].x, nodes[i].y)
            ctx!.lineTo(nodes[j].x, nodes[j].y)
            ctx!.strokeStyle = `rgba(109, 94, 249, ${alpha})`
            ctx!.lineWidth = 0.5
            ctx!.stroke()
          }
        }
      }

      // Draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        const pulseRadius = n.radius + Math.sin(n.pulse) * 0.5
        const alpha = 0.35 + Math.sin(n.pulse) * 0.15

        // Outer glow
        ctx!.beginPath()
        ctx!.arc(n.x, n.y, pulseRadius * 4, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(109, 94, 249, ${alpha * 0.15})`
        ctx!.fill()

        // Core
        ctx!.beginPath()
        ctx!.arc(n.x, n.y, pulseRadius, 0, Math.PI * 2)
        ctx!.fillStyle = n.color
        ctx!.globalAlpha = alpha
        ctx!.fill()
        ctx!.globalAlpha = 1
      }

      // Draw data particles
      dataParticles = dataParticles.filter((p) => {
        p.progress += p.speed
        if (p.progress >= 1) return false
        const from = nodes[p.from]
        const to = nodes[p.to]
        if (!from || !to) return false
        const x = from.x + (to.x - from.x) * p.progress
        const y = from.y + (to.y - from.y) * p.progress

        ctx!.beginPath()
        ctx!.arc(x, y, 1.5, 0, Math.PI * 2)
        ctx!.fillStyle = "#00d4ff"
        ctx!.globalAlpha = 0.6 * (1 - p.progress)
        ctx!.fill()
        ctx!.globalAlpha = 1
        return true
      })

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", onMouse)
    }
  }, [reduced])

  if (reduced) return null

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    />
  )
}
