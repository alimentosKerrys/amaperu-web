import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useModal } from '../context/ModalContext'

export default function ModalPago() {
  const { isOpen, amount, closeModal } = useModal()
  const [lang, setLang] = useState<'ESP' | 'ENG'>('ESP')
  const [cardNum, setCardNum] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [email, setEmail] = useState('')
  const [paid, setPaid] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setPaid(true)
    setTimeout(() => { setPaid(false); closeModal() }, 2500)
  }

  const formatCard = (val: string) =>
    val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()

  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 4)
    if (digits.length >= 3) return digits.slice(0, 2) + '/' + digits.slice(2)
    return digits
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="modal-overlay"
          onClick={(e) => { if (e.target === e.currentTarget) closeModal() }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="bg-gray-50 rounded-3xl p-8 w-full max-w-md mx-4 relative"
          >
            {/* Close */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
              aria-label="Cerrar"
            >
              <X size={16} />
            </button>

            {/* Lang toggle */}
            <div className="absolute top-5 left-5 flex items-center gap-1.5 text-xs font-opensans font-semibold text-gray-400">
              <button
                onClick={() => setLang('ENG')}
                className={lang === 'ENG' ? 'text-ama-green' : 'hover:text-gray-600 transition-colors'}
              >ENG</button>
              <span>|</span>
              <button
                onClick={() => setLang('ESP')}
                className={lang === 'ESP' ? 'text-ama-green font-bold' : 'hover:text-gray-600 transition-colors'}
              >ESP</button>
            </div>

            {paid ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center py-8 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-ama-green flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="font-opensans-condensed font-black text-2xl text-ama-green mb-2">¡GRACIAS!</h2>
                <p className="font-opensans text-gray-600 text-sm">Tu donación ha sido procesada exitosamente. ¡Juntos construimos futuros!</p>
              </motion.div>
            ) : (
              <>
                {/* Logo */}
                <div className="text-center mt-6 mb-5">
                  <div className="font-opensans-condensed font-black text-5xl" style={{ color: 'var(--ama-green)' }}>
                    AMA
                  </div>
                  <div className="font-opensans-condensed font-bold text-ama-green text-sm tracking-wider">
                    ¡CONSTRUYENDO FUTUROS!
                  </div>
                </div>

                <p className="text-center text-gray-500 text-xs font-opensans mb-6">
                  <span className="font-bold text-gray-700">Recuerda</span> activar{' '}
                  <span className="font-bold text-gray-700">compras por internet</span> con tu banco
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <input
                    className="ama-input"
                    placeholder="Número de la tarjeta"
                    value={cardNum}
                    onChange={e => setCardNum(formatCard(e.target.value))}
                    required
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      className="ama-input"
                      placeholder="MM/AA"
                      value={expiry}
                      onChange={e => setExpiry(formatExpiry(e.target.value))}
                      required
                    />
                    <input
                      className="ama-input"
                      placeholder="CVV"
                      maxLength={4}
                      value={cvv}
                      onChange={e => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      className="ama-input"
                      placeholder="Nombre"
                      value={nombre}
                      onChange={e => setNombre(e.target.value)}
                      required
                    />
                    <input
                      className="ama-input"
                      placeholder="Apellido"
                      value={apellido}
                      onChange={e => setApellido(e.target.value)}
                      required
                    />
                  </div>
                  <input
                    className="ama-input"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-ama-green text-white font-opensans-condensed font-black text-xl py-4 rounded-full hover:bg-ama-green-dark transition-colors tracking-wider mt-2"
                  >
                    PAGAR&nbsp;&nbsp;S/{amount}.00
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
