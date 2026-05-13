import { useState } from 'react'
import { motion } from 'framer-motion'
import { CreditCard, Banknote, QrCode, AlertCircle } from 'lucide-react'
import SectionHero from '../components/ui/SectionHero'
import Button from '../components/ui/Button'
import { useModal } from '../context/ModalContext'

// Images
import bannerDonacion from '../assets/images/IMAGENES_LISTAS/banner-donacion.png'
import pagoBbva from '../assets/images/IMAGENES_LISTAS/pago-bbva.png'
import pagoAgora from '../assets/images/IMAGENES_LISTAS/pago-agora.png'
import pagoBim from '../assets/images/IMAGENES_LISTAS/pago-bim.png'
import pagoK from '../assets/images/IMAGENES_LISTAS/pago-k.png'
import pagoScotiabank from '../assets/images/IMAGENES_LISTAS/pago-scotiabank.png'
import pagoTunki from '../assets/images/IMAGENES_LISTAS/pago-tunki.png'
import qrDonacion from '../assets/images/IMAGENES_LISTAS/qr-donacion.png'

const amounts = [10, 50, 100]

export default function Donacion() {
  const [payType, setPayType] = useState<'credito' | 'debito'>('credito')
  const [selectedAmount, setSelectedAmount] = useState(50)
  const [customAmount, setCustomAmount] = useState(false)
  const [customVal, setCustomVal] = useState('')
  const [nombre, setNombre] = useState('')
  const [apellidos, setApellidos] = useState('')
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const { openModal } = useModal()

  const finalAmount = customAmount ? Number(customVal) || 0 : selectedAmount

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    openModal(finalAmount)
  }

  return (
    <main className="pt-[88px]">
      <SectionHero
        title="DONACIÓN"
        breadcrumb={['Inicio', 'DONACIÓN']}
        backgroundImage={bannerDonacion}
      />

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="font-opensans-condensed font-black text-ama-black uppercase"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
            >
              APOYA NUESTRA <span style={{ color: 'var(--ama-green)' }}>MISIÓN</span>
            </h2>
            <p className="font-opensans text-ama-gray-mid mt-3 max-w-lg mx-auto">
              Con tu donación podremos seguir construyendo espacios recreativos y llevando ayuda en beneficio de las poblaciones más vulnerables.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* ===== CARD IZQUIERDA — Formulario ===== */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100"
            >
              <h3
                className="font-opensans-condensed font-black text-2xl uppercase mb-6"
                style={{ color: 'var(--ama-green)' }}
              >
                Método de Pago
              </h3>

              {/* Payment type toggle */}
              <div className="flex gap-4 mb-6">
                {(['credito', 'debito'] as const).map(type => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer">
                    <div
                      className="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors"
                      style={{ borderColor: payType === type ? 'var(--ama-green)' : '#d1d5db' }}
                    >
                      {payType === type && (
                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--ama-green)' }} />
                      )}
                    </div>
                    <input type="radio" className="sr-only" checked={payType === type} onChange={() => setPayType(type)} />
                    <span className="font-opensans text-sm font-medium capitalize text-ama-gray-dark">
                      Tarjeta de {type === 'credito' ? 'Crédito' : 'Débito'}
                    </span>
                  </label>
                ))}
              </div>

              {/* Amount selector */}
              <div className="mb-6">
                <p className="font-opensans font-semibold text-ama-black text-sm mb-3">Deseo donar:</p>
                <div className="relative mb-4">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-opensans font-bold text-ama-gray-mid">S/.</span>
                  <input
                    type="number"
                    value={customAmount ? customVal : selectedAmount}
                    onChange={e => { setCustomAmount(true); setCustomVal(e.target.value) }}
                    className="ama-input pl-10 text-2xl font-opensans-condensed font-black"
                    min={1}
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  {amounts.map(a => (
                    <button
                      key={a}
                      onClick={() => { setSelectedAmount(a); setCustomAmount(false) }}
                      className="flex-1 py-2 px-3 rounded-full font-opensans-condensed font-bold text-sm transition-all"
                      style={{
                        background: !customAmount && selectedAmount === a ? 'var(--ama-green)' : 'white',
                        color: !customAmount && selectedAmount === a ? 'white' : 'var(--ama-gray-dark)',
                        border: `2px solid ${!customAmount && selectedAmount === a ? 'var(--ama-green)' : '#e5e7eb'}`,
                      }}
                    >
                      S/.{a}
                    </button>
                  ))}
                  <button
                    onClick={() => { setCustomAmount(true); setCustomVal('') }}
                    className="flex-1 py-2 px-3 rounded-full font-opensans-condensed font-bold text-sm transition-all"
                    style={{
                      background: customAmount ? 'var(--ama-green)' : 'white',
                      color: customAmount ? 'white' : 'var(--ama-gray-dark)',
                      border: `2px solid ${customAmount ? 'var(--ama-green)' : '#e5e7eb'}`,
                    }}
                  >
                    Otra cantidad
                  </button>
                </div>
              </div>

              {/* Personal info */}
              <div className="mb-6">
                <p className="font-opensans font-semibold text-ama-black text-sm mb-3">Información Personal:</p>
                <div className="flex flex-col gap-3">
                  <input className="ama-input" placeholder="Nombres *" value={nombre} onChange={e => setNombre(e.target.value)} required />
                  <input className="ama-input" placeholder="Apellidos *" value={apellidos} onChange={e => setApellidos(e.target.value)} required />
                  <input className="ama-input" type="email" placeholder="Correo Electrónico *" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
              </div>

              <button
                onClick={() => openModal(finalAmount)}
                className="w-full py-4 rounded-full font-opensans-condensed font-black text-xl text-white transition-colors"
                style={{ background: 'var(--ama-green)' }}
              >
                DONA AHORA — S/{finalAmount}.00
              </button>

              <p className="font-opensans text-ama-gray-mid text-xs text-center mt-4 leading-relaxed">
                Con tu donación podremos seguir construyendo espacios recreativos y llevando ayuda en beneficio de las poblaciones más vulnerable.
              </p>
            </motion.div>

            {/* ===== CARD DERECHA — Transferencias ===== */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100"
            >
              <h3
                className="font-opensans-condensed font-black text-2xl uppercase mb-6"
                style={{ color: 'var(--ama-green)' }}
              >
                Depósitos y transferencias
              </h3>

              {/* Bank info */}
              {[
                {
                  logo: pagoScotiabank,
                  name: 'Scotiabank',
                  details: [
                    { label: 'Cuenta en Soles', value: '194-8289720-0-43' },
                    { label: 'CCI', value: '00219400828972004390' },
                  ],
                },
                {
                  logo: pagoBbva,
                  name: 'BBVA',
                  details: [
                    { label: 'Cuenta en Soles', value: '001106140100016611' },
                    { label: 'CCI', value: '001161400010001661154' },
                  ],
                },
              ].map(bank => (
                <div key={bank.name} className="flex flex-col gap-2 mb-5 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-3">
                    <img src={bank.logo} alt={bank.name} className="h-8 w-auto object-contain" />
                    <span className="font-opensans font-bold text-sm text-ama-black">{bank.name}</span>
                  </div>
                  {bank.details.map(d => (
                    <div key={d.label} className="flex justify-between items-center">
                      <span className="font-opensans text-xs text-ama-gray-mid">{d.label}:</span>
                      <span className="font-opensans-condensed font-bold text-sm text-ama-black">{d.value}</span>
                    </div>
                  ))}
                </div>
              ))}

              {/* Yape */}
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 mb-5">
                <p className="font-opensans font-bold text-sm text-ama-black mb-1">Yape</p>
                <p className="font-opensans-condensed font-bold text-lg" style={{ color: 'var(--ama-green)' }}>941 157 372</p>
              </div>

              {/* QR Izipay */}
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 mb-5">
                <div className="flex items-center gap-2 mb-3">
                  <QrCode size={18} style={{ color: 'var(--ama-green)' }} />
                  <p className="font-opensans font-bold text-sm text-ama-black">Izipay — QR Universal</p>
                </div>
                <div className="flex justify-center mb-4">
                  <img src={qrDonacion} alt="QR código donación" className="w-32 h-32 object-contain" />
                </div>
                <ol className="flex flex-col gap-1.5 mb-4">
                  {[
                    'Ingresa a tu billetera electrónica.',
                    'Escanea el código Universal QR.',
                    'Ingresar el monto de tu donación y acepta.',
                  ].map((s, i) => (
                    <li key={i} className="flex items-start gap-2 font-opensans text-xs text-ama-gray-mid">
                      <span className="font-opensans-condensed font-bold text-ama-green flex-shrink-0">{i + 1}.</span>
                      {s}
                    </li>
                  ))}
                </ol>
                {/* Wallet logos */}
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  {[pagoAgora, pagoBim, pagoK, pagoTunki].map((logo, i) => (
                    <img key={i} src={logo} alt="Wallet" className="h-8 w-auto object-contain" />
                  ))}
                </div>
              </div>

              {/* Warning */}
              <div className="flex items-start gap-3 p-4 rounded-xl" style={{ background: 'rgba(141,198,63,0.1)', border: '1.5px solid var(--ama-green)' }}>
                <AlertCircle size={18} style={{ color: 'var(--ama-green)', flexShrink: 0 }} />
                <p className="font-opensans text-xs font-medium" style={{ color: 'var(--ama-green)' }}>
                  * No olvides enviar la foto de tu comprobante a nuestro WhatsApp.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}
