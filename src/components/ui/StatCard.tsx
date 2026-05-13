import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ReactNode } from 'react'

interface StatCardProps {
  icon: ReactNode
  number: number
  suffix?: string
  label: string
}

function AnimatedNumber({ target, duration = 2 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = target / (duration * 60)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 1000 / 60)
    return () => clearInterval(timer)
  }, [inView, target, duration])

  return <span ref={ref}>{count.toLocaleString()}</span>
}

export default function StatCard({ icon, number, suffix = '', label }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center text-center px-6 py-8 rounded-2xl"
      style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)' }}
    >
      <div className="text-white mb-3 opacity-90">{icon}</div>
      <div
        className="font-opensans-condensed font-black text-white mb-2"
        style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1 }}
      >
        <AnimatedNumber target={number} />{suffix}
      </div>
      <p className="text-white/80 font-opensans text-sm font-medium leading-snug">{label}</p>
    </motion.div>
  )
}
