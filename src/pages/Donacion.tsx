import { useState } from 'react'
import { motion } from 'framer-motion'
import { QrCode, AlertCircle, Copy, Check, MessageSquare } from 'lucide-react'
import SectionHero from '../components/ui/SectionHero'
import { useConfiguracion } from '../application/hooks/useConfiguracion'

// Images
import bannerDonacion from '../assets/images/IMAGENES_LISTAS/banner-donacion.png'
import pagoBbva from '../assets/images/IMAGENES_LISTAS/pago-bbva.png'
import pagoScotiabank from '../assets/images/IMAGENES_LISTAS/pago-scotiabank.png'
import qrDonacion from '../assets/images/IMAGENES_LISTAS/qr-donacion.png'

export default function Donacion() {
  const [copiedText, setCopiedText] = useState<string | null>(null)

  // Dynamic values
  const { valor: yapeNumero } = useConfiguracion('donacion_yape_numero')
  const { valor: waNumero } = useConfiguracion('donacion_wa_numero')
  const { valor: scCta } = useConfiguracion('donacion_scotiabank_cta')
  const { valor: scCci } = useConfiguracion('donacion_scotiabank_cci')
  const { valor: bbCta } = useConfiguracion('donacion_bbva_cta')
  const { valor: bbCci } = useConfiguracion('donacion_bbva_cci')

  const currentYape = yapeNumero || '941 157 372'
  const currentWa = waNumero || '51939412966'
  const currentScCta = scCta || '194-8289720-0-43'
  const currentScCci = scCci || '00219400828972004390'
  const currentBbCta = bbCta || '001106140100016611'
  const currentBbCci = bbCci || '001161400010001661154'

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText(label)
    setTimeout(() => setCopiedText(null), 2000)
  }

  const messageText = encodeURIComponent('Hola AMA PERÚ, acabo de realizar una donación. Adjunto el comprobante de mi transferencia/Yape para su verificación.')
  const waUrl = `https://wa.me/${currentWa}?text=${messageText}`

  return (
    <main className="pt-[88px]">
      <SectionHero
        title="DONACIÓN"
        breadcrumb={['Inicio', 'DONACIÓN']}
        backgroundImage={bannerDonacion}
      />

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="font-opensans-condensed font-black text-ama-black uppercase"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
            >
              APOYA NUESTRA <span style={{ color: 'var(--ama-green)' }}>MISIÓN</span>
            </h2>
            <p className="font-opensans text-ama-gray-mid mt-3 max-w-2xl mx-auto text-base">
              Actualmente nos encontramos en proceso de apertura de nuestra cuenta corporativa. Por el momento, puedes apoyarnos de manera segura y directa a través de depósitos en nuestra cuenta corriente o por Yape.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* ===== CARD IZQUIERDA — YAPE ===== */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100/80 flex flex-col items-center text-center"
            >
              <span className="bg-[#00D3C5]/10 text-[#008980] border border-[#00D3C5]/20 font-opensans font-bold text-xs px-3 py-1.5 rounded-full tracking-wider mb-6">
                PAGO RÁPIDO
              </span>

              <h3 className="font-opensans font-black text-3xl text-ama-black uppercase mb-2">
                Donar con <span className="text-[#00D3C5]">Yape</span>
              </h3>
              <p className="font-opensans text-sm text-ama-gray-mid mb-8 max-w-sm">
                Escanea el código QR desde tu aplicación de Yape o digita directamente el número de teléfono.
              </p>

              {/* QR Code Frame */}
              <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100 flex flex-col items-center mb-8 relative group">
                <div className="bg-white p-4 rounded-2xl shadow-md transition-transform duration-300 group-hover:scale-105">
                  <img src={qrDonacion} alt="QR Yape AMA PERÚ" className="w-48 h-48 object-contain" />
                </div>
                <div className="flex items-center gap-2 mt-4 text-[#00D3C5] font-semibold text-sm">
                  <QrCode size={18} />
                  <span>QR de Donación AMA</span>
                </div>
              </div>

              {/* Yape Number Section */}
              <div className="w-full bg-[#f2fcfb] border border-[#00d3c5]/10 rounded-2xl p-4 mb-8 flex justify-between items-center max-w-md">
                <div className="text-left">
                  <span className="text-[11px] font-bold text-ama-gray-mid uppercase tracking-wider">Número Yape</span>
                  <p className="font-opensans-condensed font-black text-2xl text-ama-black tracking-tight">{currentYape}</p>
                </div>
                <button
                  onClick={() => handleCopy(currentYape.replace(/\s/g, ''), 'yape')}
                  className="bg-white border border-[#00d3c5]/20 hover:border-[#00d3c5]/50 p-3 rounded-xl transition-all shadow-sm flex items-center justify-center text-ama-gray-dark hover:text-[#00c0b3]"
                  title="Copiar número"
                >
                  {copiedText === 'yape' ? <Check size={18} className="text-green-600 animate-pulse" /> : <Copy size={18} />}
                </button>
              </div>

              {/* Instructions */}
              <div className="text-left w-full max-w-md mb-8">
                <h4 className="font-opensans font-bold text-ama-black text-sm mb-3">Instrucciones sencillas:</h4>
                <ol className="flex flex-col gap-3 font-opensans text-xs text-ama-gray-mid">
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#00D3C5]/10 text-[#008980] flex items-center justify-center font-bold flex-shrink-0 text-[10px]">1</span>
                    <p className="mt-0.5">Ingresa a tu aplicación de Yape en tu teléfono celular.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#00D3C5]/10 text-[#008980] flex items-center justify-center font-bold flex-shrink-0 text-[10px]">2</span>
                    <p className="mt-0.5">Escanea el código QR superior o escribe el número <strong className="text-ama-black">{currentYape}</strong>.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#00D3C5]/10 text-[#008980] flex items-center justify-center font-bold flex-shrink-0 text-[10px]">3</span>
                    <p className="mt-0.5">Ingresa el monto de tu donación voluntaria y confirma.</p>
                  </li>
                </ol>
              </div>

              {/* WhatsApp CTA */}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full max-w-md py-4 rounded-full font-opensans font-black text-base text-white transition-all shadow-lg flex items-center justify-center gap-2 hover:-translate-y-0.5"
                style={{
                  background: '#25D366',
                  boxShadow: '0 8px 20px rgba(37,211,102,0.2)'
                }}
              >
                <MessageSquare size={20} fill="white" />
                ENVIAR VOUCHER POR WHATSAPP
              </a>
            </motion.div>

            {/* ===== CARD DERECHA — TRANSFERENCIAS ===== */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100/80"
            >
              <div className="flex justify-center mb-6">
                <span className="bg-ama-green/10 text-ama-green border border-ama-green/20 font-opensans font-bold text-xs px-3 py-1.5 rounded-full tracking-wider">
                  DEPOSITOS LOCALES
                </span>
              </div>

              <h3 className="font-opensans font-black text-3xl text-ama-black uppercase mb-2 text-center">
                Cuentas <span className="text-ama-green">Bancarias</span>
              </h3>
              <p className="font-opensans text-sm text-ama-gray-mid mb-8 text-center max-w-sm mx-auto">
                Realiza una transferencia interbancaria o depósito en ventanilla utilizando las siguientes cuentas.
              </p>

              {/* Bank Details */}
              <div className="space-y-6 mb-8">
                {/* Scotiabank */}
                <div className="flex flex-col gap-3 p-5 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="flex items-center gap-3">
                    <img src={pagoScotiabank} alt="Scotiabank" className="h-8 w-auto object-contain" />
                    <span className="font-opensans font-bold text-sm text-ama-black">Scotiabank</span>
                  </div>
                  
                  <div className="border-t border-gray-200/50 pt-3 space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-opensans text-ama-gray-mid">Cuenta en Soles:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-opensans-condensed font-bold text-sm text-ama-black">{currentScCta}</span>
                        <button
                          onClick={() => handleCopy(currentScCta, 'scotia_cta')}
                          className="text-gray-400 hover:text-ama-green transition-colors"
                        >
                          {copiedText === 'scotia_cta' ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-opensans text-ama-gray-mid">CCI (Interbancaria):</span>
                      <div className="flex items-center gap-2">
                        <span className="font-opensans-condensed font-bold text-sm text-ama-black">{currentScCci}</span>
                        <button
                          onClick={() => handleCopy(currentScCci, 'scotia_cci')}
                          className="text-gray-400 hover:text-ama-green transition-colors"
                        >
                          {copiedText === 'scotia_cci' ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* BBVA */}
                <div className="flex flex-col gap-3 p-5 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="flex items-center gap-3">
                    <img src={pagoBbva} alt="BBVA" className="h-8 w-auto object-contain" />
                    <span className="font-opensans font-bold text-sm text-ama-black">BBVA</span>
                  </div>
                  
                  <div className="border-t border-gray-200/50 pt-3 space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-opensans text-ama-gray-mid">Cuenta en Soles:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-opensans-condensed font-bold text-sm text-ama-black">{currentBbCta}</span>
                        <button
                          onClick={() => handleCopy(currentBbCta, 'bbva_cta')}
                          className="text-gray-400 hover:text-ama-green transition-colors"
                        >
                          {copiedText === 'bbva_cta' ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-opensans text-ama-gray-mid">CCI (Interbancaria):</span>
                      <div className="flex items-center gap-2">
                        <span className="font-opensans-condensed font-bold text-sm text-ama-black">{currentBbCci}</span>
                        <button
                          onClick={() => handleCopy(currentBbCci, 'bbva_cci')}
                          className="text-gray-400 hover:text-ama-green transition-colors"
                        >
                          {copiedText === 'bbva_cci' ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Warning/Voucher Notice */}
              <div className="flex items-start gap-3 p-4 rounded-2xl mb-8" style={{ background: 'rgba(141,198,63,0.08)', border: '1.5px solid var(--ama-green)' }}>
                <AlertCircle size={20} style={{ color: 'var(--ama-green)', flexShrink: 0 }} />
                <p className="font-opensans text-xs font-semibold leading-relaxed" style={{ color: 'var(--ama-green)' }}>
                  Es muy importante enviar una foto del voucher o captura de la pantalla de transferencia para registrar su donación de forma correcta.
                </p>
              </div>

              {/* WhatsApp CTA */}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-full font-opensans font-black text-base text-white transition-all shadow-lg flex items-center justify-center gap-2 hover:-translate-y-0.5"
                style={{
                  background: '#25D366',
                  boxShadow: '0 8px 20px rgba(37,211,102,0.2)'
                }}
              >
                <MessageSquare size={20} fill="white" />
                ENVIAR VOUCHER POR WHATSAPP
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}

