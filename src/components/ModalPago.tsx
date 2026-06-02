import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, AlertCircle, MessageSquare } from 'lucide-react'
import { useModal } from '../context/ModalContext'
import { useConfiguracion } from '../application/hooks/useConfiguracion'

// Images
const pagoBbva = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Crect width='100%25' height='100%25' fill='%23e2e8f0'/%3E%3Ctext x='50%25' y='50%25' fill='%2394a3b8' font-family='sans-serif' font-size='32' text-anchor='middle' dy='.3em'%3ECargando...%3C/text%3E%3C/svg%3E";
const pagoScotiabank = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Crect width='100%25' height='100%25' fill='%23e2e8f0'/%3E%3Ctext x='50%25' y='50%25' fill='%2394a3b8' font-family='sans-serif' font-size='32' text-anchor='middle' dy='.3em'%3ECargando...%3C/text%3E%3C/svg%3E";
const qrDonacion = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Crect width='100%25' height='100%25' fill='%23e2e8f0'/%3E%3Ctext x='50%25' y='50%25' fill='%2394a3b8' font-family='sans-serif' font-size='32' text-anchor='middle' dy='.3em'%3ECargando...%3C/text%3E%3C/svg%3E";

type TabType = 'DIRECTO' | 'TARJETA'

export default function ModalPago() {
  const { isOpen, amount, closeModal } = useModal()
  const [lang, setLang] = useState<'ESP' | 'ENG'>('ESP')
  const [activeTab, setActiveTab] = useState<TabType>('DIRECTO')

  // Form states for the deactivated card form
  const [cardNum, setCardNum] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [email, setEmail] = useState('')

  // --- Datos dinámicos desde BD ---
  const { valor: yapeNumero } = useConfiguracion('donacion_yape_numero')
  const { valor: waNumero } = useConfiguracion('donacion_wa_numero')
  const { valor: bbvaCta } = useConfiguracion('donacion_bbva_cta')
  const { valor: scotiaCta } = useConfiguracion('donacion_scotiabank_cta')
  const { valor: bcpCta } = useConfiguracion('donacion_bcp_cta')
  
  const { valor: yapeActivo } = useConfiguracion('donacion_yape_activo')
  const { valor: bbvaActivo } = useConfiguracion('donacion_bbva_activo')
  const { valor: scotiaActivo } = useConfiguracion('donacion_scotiabank_activo')
  const { valor: bcpActivo } = useConfiguracion('donacion_bcp_activo')
  const { valor: msjAmigable } = useConfiguracion('donacion_mensaje_amigable')

  const currentYape = yapeNumero || '941 157 372'
  const currentWa = waNumero || '51939412966'
  const currentBbva = bbvaCta || '001106140100016611'
  const currentScotia = scotiaCta || '194-8289720-0-43'
  const currentBcp = bcpCta || '193-12345678-0-12'

  const isYapeActive = yapeActivo !== 'false'
  const isBbvaActive = bbvaActivo !== 'false'
  const isScotiaActive = scotiaActivo !== 'false'
  const isBcpActive = bcpActivo !== 'false'

  const formatCard = (val: string) =>
    val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()

  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 4)
    if (digits.length >= 3) return digits.slice(0, 2) + '/' + digits.slice(2)
    return digits
  }

  const messageText = encodeURIComponent(`Hola AMA PERÚ, deseo registrar mi donación de S/.${amount}.00. Adjunto aquí la captura de pantalla de mi comprobante.`)
  const waUrl = `https://wa.me/${currentWa}?text=${messageText}`

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
            className="bg-gray-50 rounded-3xl p-6 sm:p-8 w-full max-w-lg mx-4 relative overflow-y-auto max-h-[90vh]"
          >
            {/* Close */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors z-30"
              aria-label="Cerrar"
            >
              <X size={16} />
            </button>

            {/* Lang toggle */}
            <div className="absolute top-5 left-5 flex items-center gap-1.5 text-xs font-opensans font-semibold text-gray-400 z-30">
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

            {/* Logo */}
            <div className="text-center mt-6 mb-5">
              <div className="font-opensans-condensed font-black text-5xl" style={{ color: 'var(--ama-green)' }}>
                AMA
              </div>
              <div className="font-opensans-condensed font-bold text-ama-green text-sm tracking-wider">
                {lang === 'ESP' ? '¡CONSTRUYENDO FUTUROS!' : 'BUILDING FUTURES!'}
              </div>
            </div>

            {/* Tabs Selector */}
            <div className="flex border-b border-gray-200 mb-6 font-opensans text-sm font-semibold">
              <button
                onClick={() => setActiveTab('DIRECTO')}
                className={`flex-1 pb-3 text-center transition-colors border-b-2 ${activeTab === 'DIRECTO' ? 'border-ama-green text-ama-green' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
              >
                {lang === 'ESP' ? 'Yape / Transferencia' : 'Yape / Transfer'}
              </button>
              <button
                onClick={() => setActiveTab('TARJETA')}
                className={`flex-1 pb-3 text-center transition-colors border-b-2 ${activeTab === 'TARJETA' ? 'border-ama-green text-ama-green' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
              >
                {lang === 'ESP' ? 'Tarjeta (Próximamente)' : 'Card (Coming Soon)'}
              </button>
            </div>

            {activeTab === 'DIRECTO' ? (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col items-center"
              >
                <div className="mb-4 text-center">
                  <p className="text-ama-black font-opensans font-black text-xl mb-1">
                    {lang === 'ESP' ? (msjAmigable || `Donar S/.${amount}.00`) : (msjAmigable || `Donate S/.${amount}.00`)}
                  </p>
                  <p className="text-xs text-ama-gray-mid font-opensans">
                    {lang === 'ESP' ? 'Por favor realiza tu donación y reporta el voucher por WhatsApp' : 'Please make your donation and report the voucher via WhatsApp'}
                  </p>
                </div>

                {/* Yape Quick Info */}
                {isYapeActive && (
                  <div className="w-full bg-[#f2fcfb] border border-[#00d3c5]/10 rounded-2xl p-4 mb-4 flex justify-between items-center">
                    <div>
                      <span className="text-[10px] font-bold text-ama-gray-mid uppercase tracking-wider">Yape</span>
                      <p className="font-opensans-condensed font-black text-lg text-ama-black">{currentYape}</p>
                    </div>
                    <div className="w-12 h-12 bg-white rounded-lg p-1 border border-gray-100 flex items-center justify-center">
                      <img src={qrDonacion} alt="QR Yape" className="w-full h-full object-contain" />
                    </div>
                  </div>
                )}

                {/* Banks Quick Info */}
                {(isBbvaActive || isScotiaActive || isBcpActive) && (
                  <div className="w-full space-y-2 mb-6">
                    {/* BBVA */}
                    {isBbvaActive && (
                      <div className="flex justify-between items-center p-3 bg-gray-50 border border-gray-100 rounded-xl text-xs">
                        <div className="flex items-center gap-2">
                          <img src={pagoBbva} alt="BBVA" className="h-5 w-auto object-contain" />
                          <span className="font-bold text-ama-black">BBVA:</span>
                        </div>
                        <span className="font-opensans-condensed font-semibold text-ama-black">{currentBbva}</span>
                      </div>
                    )}

                    {/* Scotiabank */}
                    {isScotiaActive && (
                      <div className="flex justify-between items-center p-3 bg-gray-50 border border-gray-100 rounded-xl text-xs">
                        <div className="flex items-center gap-2">
                          <img src={pagoScotiabank} alt="Scotiabank" className="h-5 w-auto object-contain" />
                          <span className="font-bold text-ama-black">Scotiabank:</span>
                        </div>
                        <span className="font-opensans-condensed font-semibold text-ama-black">{currentScotia}</span>
                      </div>
                    )}

                    {/* BCP */}
                    {isBcpActive && (
                      <div className="flex justify-between items-center p-3 bg-gray-50 border border-gray-100 rounded-xl text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 bg-[#F18800] rounded-sm flex items-center justify-center text-white font-black text-[8px]">BCP</div>
                          <span className="font-bold text-ama-black">BCP:</span>
                        </div>
                        <span className="font-opensans-condensed font-semibold text-ama-black">{currentBcp}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Warning / Voucher instructions */}
                <div className="flex items-start gap-3 p-3 bg-ama-green/5 border border-ama-green/20 rounded-xl mb-6 text-left">
                  <AlertCircle size={18} className="text-ama-green flex-shrink-0 mt-0.5" />
                  <p className="font-opensans text-[11px] font-medium text-ama-green leading-relaxed">
                    {lang === 'ESP'
                      ? 'Una vez realizado el depósito o Yape, haz clic en el botón de abajo para enviarnos la captura del comprobante por WhatsApp.'
                      : 'Once the deposit or Yape is completed, click the button below to send us the receipt screenshot via WhatsApp.'}
                  </p>
                </div>

                {/* WhatsApp Button */}
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-full font-opensans font-black text-sm text-white transition-all shadow-md flex items-center justify-center gap-2 hover:-translate-y-0.5"
                  style={{
                    background: '#25D366',
                    boxShadow: '0 4px 15px rgba(37,211,102,0.2)'
                  }}
                >
                  <MessageSquare size={16} fill="white" />
                  {lang === 'ESP' ? 'ENVIAR COMPROBANTE POR WHATSAPP' : 'SEND RECEIPT VIA WHATSAPP'}
                </a>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative"
              >
                {/* Coming Soon Alert */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 mb-6 flex items-start gap-3 text-yellow-800">
                  <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm">
                      {lang === 'ESP' ? 'Módulo en desarrollo' : 'Module under development'}
                    </h4>
                    <p className="text-xs mt-1 leading-relaxed">
                      {lang === 'ESP'
                        ? 'Estamos trabajando para integrar compras seguras por internet con tu banco. Próximamente habilitado.'
                        : 'We are working to integrate secure internet purchases with your bank. Available soon.'}
                    </p>
                  </div>
                </div>

                {/* Disabled Form View */}
                <div className="opacity-45 pointer-events-none select-none flex flex-col gap-3">
                  <input
                    className="ama-input"
                    placeholder="Número de la tarjeta"
                    value={cardNum}
                    onChange={e => setCardNum(formatCard(e.target.value))}
                    disabled
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      className="ama-input"
                      placeholder="MM/AA"
                      value={expiry}
                      onChange={e => setExpiry(formatExpiry(e.target.value))}
                      disabled
                    />
                    <input
                      className="ama-input"
                      placeholder="CVV"
                      maxLength={4}
                      value={cvv}
                      disabled
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      className="ama-input"
                      placeholder="Nombre"
                      value={nombre}
                      disabled
                    />
                    <input
                      className="ama-input"
                      placeholder="Apellido"
                      value={apellido}
                      disabled
                    />
                  </div>
                  <input
                    className="ama-input"
                    type="email"
                    placeholder="Email"
                    value={email}
                    disabled
                  />
                  <button
                    type="button"
                    className="w-full bg-gray-400 text-white font-opensans-condensed font-black text-xl py-4 rounded-full transition-colors tracking-wider mt-2"
                    disabled
                  >
                    PAGAR&nbsp;&nbsp;S/{amount}.00
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
