import { motion } from 'framer-motion'

interface TeamCardProps {
  image: string
  name: string
  role: string
}

export default function TeamCard({ image, name, role }: TeamCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: '0 12px 40px rgba(141,198,63,0.25)' }}
      transition={{ duration: 0.2 }}
      className="flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-gray-100 group"
    >
      <div
        className="w-28 h-28 rounded-full overflow-hidden border-4 mb-4 transition-all duration-300"
        style={{ borderColor: 'var(--ama-green)' }}
      >
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <h3
        className="font-barlow-condensed font-bold text-lg mb-1"
        style={{ color: 'var(--ama-green)' }}
      >
        {name}
      </h3>
      <p className="font-barlow text-sm text-ama-gray-mid leading-snug">{role}</p>
    </motion.div>
  )
}
