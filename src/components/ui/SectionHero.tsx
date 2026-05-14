import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

interface SectionHeroProps {
  title: string
  breadcrumb: string[]
  backgroundImage: string
  overlay?: boolean
  isLoading?: boolean
}

export default function SectionHero({
  title,
  breadcrumb,
  backgroundImage,
  overlay = true,
  isLoading = false,
}: SectionHeroProps) {
  return (
    <section
      className="relative flex items-center justify-center"
      style={{ height: 'clamp(220px, 40vh, 380px)' }}
    >
      {/* Background */}
      <div
        className={`absolute inset-0 bg-cover bg-center grayscale brightness-50 ${isLoading ? 'bg-gray-300 animate-pulse' : ''}`}
        style={{ backgroundImage: isLoading ? 'none' : `url(${backgroundImage})` }}
      />
      {overlay && (
        <div className="absolute inset-0 bg-black/50" />
      )}

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="font-opensans-condensed font-black text-white uppercase tracking-widest"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}
        >
          {title}
        </h1>
        <nav className="flex items-center justify-center gap-2 mt-3 flex-wrap">
          {breadcrumb.map((item, i) => (
            <span key={i} className="flex items-center gap-2">
              {i < breadcrumb.length - 1 ? (
                <>
                  <Link
                    to={i === 0 ? '/' : '#'}
                    className="text-white/80 hover:text-ama-green transition-colors text-sm font-opensans font-medium"
                  >
                    {item}
                  </Link>
                  <ChevronRight size={14} className="text-white/60" />
                </>
              ) : (
                <span className="text-ama-green text-sm font-opensans font-semibold">{item}</span>
              )}
            </span>
          ))}
        </nav>
      </div>
    </section>
  )
}
