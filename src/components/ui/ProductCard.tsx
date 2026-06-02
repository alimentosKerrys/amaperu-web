import { useState } from 'react'
import { motion } from 'framer-motion'
import { Minus, Plus, ShoppingBag } from 'lucide-react'
import { useCart } from '../../context/CartContext'

interface ProductCardProps {
  image: string
  name: string
  price: number
}

export default function ProductCard({ image, name, price }: ProductCardProps) {
  const [qty, setQty] = useState(1)
  const [hovered, setHovered] = useState(false)
  const { addItem } = useCart()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Image */}
      <div
        className="relative overflow-hidden cursor-pointer"
        style={{ aspectRatio: '1/1' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img src={image} alt={name} className="w-full h-full object-cover" loading="lazy" decoding="async" />
        <motion.div
          initial={false}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-black/40 flex items-center justify-center"
        >
          <button
            onClick={() => addItem()}
            className="flex items-center gap-2 bg-ama-green text-white px-5 py-2.5 rounded-full font-opensans-condensed font-bold text-sm hover:bg-ama-green-dark transition-colors"
          >
            <ShoppingBag size={16} />
            Agregar
          </button>
        </motion.div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-opensans font-semibold text-ama-black text-sm mb-1 leading-snug">{name}</h3>
        <p className="font-opensans-condensed font-bold text-ama-green text-lg mb-3">
          s/{price.toFixed(2)}
        </p>
        {/* Qty selector */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setQty(q => Math.max(1, q - 1))}
            className="w-8 h-8 rounded-full border-2 border-ama-green text-ama-green flex items-center justify-center hover:bg-ama-green hover:text-white transition-colors"
          >
            <Minus size={14} />
          </button>
          <span className="font-opensans font-semibold text-ama-black w-6 text-center">{qty}</span>
          <button
            onClick={() => setQty(q => q + 1)}
            className="w-8 h-8 rounded-full border-2 border-ama-green text-ama-green flex items-center justify-center hover:bg-ama-green hover:text-white transition-colors"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
