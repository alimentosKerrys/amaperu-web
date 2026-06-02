import { ButtonHTMLAttributes, ReactNode } from 'react'
import { motion } from 'framer-motion'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'text'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  pill?: boolean
  fullWidth?: boolean
}

const variantClasses = {
  primary: 'bg-ama-green text-white hover:bg-ama-green-dark border-2 border-ama-green hover:border-ama-green-dark shadow-lg hover:shadow-ama-green/40 hover:-translate-y-0.5',
  outline: 'bg-transparent text-ama-green border-2 border-ama-green hover:bg-ama-green hover:text-white hover:-translate-y-0.5',
  ghost: 'bg-white/5 backdrop-blur-sm text-white border-2 border-white hover:bg-white hover:text-ama-black hover:-translate-y-0.5',
  text: 'bg-transparent text-ama-green border-2 border-transparent hover:text-ama-green-dark underline-offset-4 hover:underline',
}

const sizeClasses = {
  sm: 'px-4 py-2 text-sm font-semibold',
  md: 'px-6 py-3 text-base font-bold',
  lg: 'px-8 py-4 text-lg font-bold',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  pill = false,
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.02 }}
      className={[
        'inline-flex items-center justify-center gap-2 transition-all duration-300 font-quicksand tracking-widest cursor-pointer uppercase rounded-none',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? 'w-full' : '',
        className,
      ].join(' ')}
      {...(props as any)}
    >
      {children}
    </motion.button>
  )
}
