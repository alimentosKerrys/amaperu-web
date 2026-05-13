import { useState, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

interface AccordionItemProps {
  title: string
  children: ReactNode
  defaultOpen?: boolean
}

export default function AccordionItem({ title, children, defaultOpen = false }: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden mb-3">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors"
        style={{ background: open ? 'var(--ama-green)' : 'white' }}
        aria-expanded={open}
      >
        <span
          className="font-opensans font-semibold text-base transition-colors"
          style={{ color: open ? 'white' : 'var(--ama-black)' }}
        >
          {title}
        </span>
        <span style={{ color: open ? 'white' : 'var(--ama-green)' }}>
          {open ? <Minus size={18} /> : <Plus size={18} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="accordion-content"
          >
            <div className="px-5 py-4 bg-gray-50 text-ama-gray-mid font-opensans text-sm leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
