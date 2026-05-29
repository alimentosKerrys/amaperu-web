import { useState, useEffect } from 'react'
import { Save, AlertCircle, CheckCircle, ShieldAlert, CreditCard, KeyRound } from 'lucide-react'
import { configuracionService } from '../../application/contentService'
import { insforge } from '../../lib/insforge'

export default function AdminDonaciones() {
  const [yapeNumero, setYapeNumero] = useState('941 157 372')
  const [scotiaCta, setScotiaCta] = useState('194-8289720-0-43')
  const [scotiaCci, setScotiaCci] = useState('00219400828972004390')
  const [bbvaCta, setBbvaCta] = useState('001106140100016611')
  const [bbvaCci, setBbvaCci] = useState('001161400010001661154')
  const [bcpCta, setBcpCta] = useState('193-12345678-0-12')
  const [bcpCci, setBcpCci] = useState('00219312345678012314')
  const [waNumero, setWaNumero] = useState('51939412966')
  const [emailVerif, setEmailVerif] = useState('fabricioburning22@gmail.com')
  const [mensajeAmigable, setMensajeAmigable] = useState('')

  // Active Toggles
  const [yapeActivo, setYapeActivo] = useState(true)
  const [scotiaActivo, setScotiaActivo] = useState(true)
  const [bbvaActivo, setBbvaActivo] = useState(true)
  const [bcpActivo, setBcpActivo] = useState(true)

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  // OTP State
  const [showOtpModal, setShowOtpModal] = useState(false)
  const [otpCode, setOtpCode] = useState('')
  const [otpLoading, setOtpLoading] = useState(false)

  useEffect(() => {
    fetchConfig()
  }, [])

  const fetchConfig = async () => {
    setLoading(true)
    const yape = await configuracionService.getValor('donacion_yape_numero')
    const scCta = await configuracionService.getValor('donacion_scotiabank_cta')
    const scCci = await configuracionService.getValor('donacion_scotiabank_cci')
    const bbCta = await configuracionService.getValor('donacion_bbva_cta')
    const bbCci = await configuracionService.getValor('donacion_bbva_cci')
    const bcCta = await configuracionService.getValor('donacion_bcp_cta')
    const bcCci = await configuracionService.getValor('donacion_bcp_cci')
    const wa = await configuracionService.getValor('donacion_wa_numero')
    const emailV = await configuracionService.getValor('donacion_email_verificacion')
    const msjAmigable = await configuracionService.getValor('donacion_mensaje_amigable')

    const yapeAct = await configuracionService.getValor('donacion_yape_activo')
    const scAct = await configuracionService.getValor('donacion_scotiabank_activo')
    const bbAct = await configuracionService.getValor('donacion_bbva_activo')
    const bcpAct = await configuracionService.getValor('donacion_bcp_activo')

    if (yape) setYapeNumero(yape)
    if (scCta) setScotiaCta(scCta)
    if (scCci) setScotiaCci(scCci)
    if (bbCta) setBbvaCta(bbCta)
    if (bbCci) setBbvaCci(bbCci)
    if (bcCta) setBcpCta(bcCta)
    if (bcCci) setBcpCci(bcCci)
    if (wa) setWaNumero(wa)
    if (emailV) setEmailVerif(emailV)
    if (msjAmigable) setMensajeAmigable(msjAmigable)

    if (yapeAct) setYapeActivo(yapeAct === 'true')
    if (scAct) setScotiaActivo(scAct === 'true')
    if (bbAct) setBbvaActivo(bbAct === 'true')
    if (bcpAct) setBcpActivo(bcpAct === 'true')

    setLoading(false)
  }

  const handleRequestSave = async () => {
    setError(null)
    setSaving(true)
    
    // Request OTP to the verification email
    const { data, error: err } = await insforge.auth.sendResetPasswordEmail({ email: emailVerif })
    
    setSaving(false)
    if (err || !data?.success) {
      setError('No se pudo enviar el correo de verificación de seguridad a: ' + emailVerif)
    } else {
      setOtpCode('')
      setShowOtpModal(true)
    }
  }

  const handleVerifyAndSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (otpCode.length < 6) return
    
    setOtpLoading(true)
    setError(null)

    // Verify OTP
    const { data, error: err } = await insforge.auth.exchangeResetPasswordToken({ email: emailVerif, code: otpCode })
    
    if (err || !data?.token) {
      setOtpLoading(false)
      setError('Código incorrecto o expirado.')
      return
    }

    // OTP Verified, proceed to save all fields
    await saveAllFields()
    setOtpLoading(false)
    setShowOtpModal(false)
  }

  const saveAllFields = async () => {
    try {
      await Promise.all([
        configuracionService.actualizar('donacion_yape_numero', yapeNumero),
        configuracionService.actualizar('donacion_scotiabank_cta', scotiaCta),
        configuracionService.actualizar('donacion_scotiabank_cci', scotiaCci),
        configuracionService.actualizar('donacion_bbva_cta', bbvaCta),
        configuracionService.actualizar('donacion_bbva_cci', bbvaCci),
        configuracionService.actualizar('donacion_bcp_cta', bcpCta),
        configuracionService.actualizar('donacion_bcp_cci', bcpCci),
        configuracionService.actualizar('donacion_wa_numero', waNumero),
        configuracionService.actualizar('donacion_email_verificacion', emailVerif),
        configuracionService.actualizar('donacion_mensaje_amigable', mensajeAmigable),

        configuracionService.actualizar('donacion_yape_activo', yapeActivo.toString()),
        configuracionService.actualizar('donacion_scotiabank_activo', scotiaActivo.toString()),
        configuracionService.actualizar('donacion_bbva_activo', bbvaActivo.toString()),
        configuracionService.actualizar('donacion_bcp_activo', bcpActivo.toString())
      ])
      
      setSuccessMessage('¡Datos bancarios guardados de forma segura!')
      setTimeout(() => setSuccessMessage(null), 3000)
    } catch (e: any) {
      setError('Error guardando los datos: ' + e.message)
    }
  }

  if (loading) return <div className="p-8 text-gray-500">Cargando datos...</div>

  return (
    <div className="max-w-4xl mx-auto p-6 relative">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ajustes de Donaciones</h1>
          <p className="text-gray-500 text-sm mt-1">Configura las cuentas bancarias y números mostrados en la página de donaciones.</p>
        </div>
        <button
          onClick={handleRequestSave}
          disabled={saving}
          className="flex items-center gap-2 bg-green-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
        >
          <Save size={18} />
          {saving ? 'Procesando...' : 'Guardar Cambios'}
        </button>
      </div>

      {/* Security Notice */}
      <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3 text-yellow-800">
        <ShieldAlert size={20} className="mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="font-bold text-sm">Doble Control Financiero Activado</h3>
          <p className="text-xs mt-1">
            Para proteger los fondos de la fundación, cualquier cambio en las cuentas bancarias o de Yape requerirá
            un código de seguridad (OTP) enviado al correo: <strong>{emailVerif}</strong>
          </p>
        </div>
      </div>

      {error && !showOtpModal && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700">
          <AlertCircle size={20} />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 text-green-700">
          <CheckCircle size={20} />
          <p className="text-sm">{successMessage}</p>
        </div>
      )}

      {/* Configuration Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Yape & WA */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-base font-bold text-gray-900 flex items-center justify-between gap-2 mb-4">
            <span className="flex items-center gap-2"><CreditCard size={18} className="text-green-600" /> Pagos Rápidos (Yape)</span>
            <label className="flex items-center gap-2 text-sm font-normal cursor-pointer">
              <input type="checkbox" checked={yapeActivo} onChange={e => setYapeActivo(e.target.checked)} className="rounded text-green-600 focus:ring-green-500 w-4 h-4 cursor-pointer" />
              Activo
            </label>
          </h2>
          
          <div className={`space-y-4 ${!yapeActivo ? 'opacity-50' : ''}`}>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Número Yape</label>
              <input
                type="text"
                value={yapeNumero}
                onChange={e => setYapeNumero(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">WhatsApp de Contacto (Donaciones)</label>
              <input
                type="text"
                value={waNumero}
                onChange={e => setWaNumero(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="Ej: 51939412966"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Mensaje de Agradecimiento (Modal)</label>
              <textarea
                value={mensajeAmigable}
                onChange={e => setMensajeAmigable(e.target.value)}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none resize-none"
                placeholder="Ej: ¡Gracias por tu apoyo! Envía tu voucher:"
              />
              <p className="text-xs text-gray-500 mt-1">Este texto reemplaza al título "Donar S/.50.00" en el popup.</p>
            </div>
          </div>
        </div>

        {/* Security / Email Verification */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 border-l-4 border-l-yellow-400">
          <h2 className="text-base font-bold text-gray-900 flex items-center gap-2 mb-4">
            <KeyRound size={18} className="text-yellow-600" />
            Seguridad y Verificación
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email Autorizado (Doble Factor)</label>
              <input
                type="email"
                value={emailVerif}
                onChange={e => setEmailVerif(e.target.value)}
                className="w-full px-4 py-2 border border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none bg-yellow-50"
              />
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                Este correo recibirá los códigos OTP cada vez que se modifique cualquier número de cuenta.
              </p>
            </div>
          </div>
        </div>

        {/* Scotiabank */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-base font-bold text-gray-900 flex items-center justify-between gap-2 mb-4">
            <span className="flex items-center gap-2"><CreditCard size={18} className="text-red-500" /> Scotiabank</span>
            <label className="flex items-center gap-2 text-sm font-normal cursor-pointer">
              <input type="checkbox" checked={scotiaActivo} onChange={e => setScotiaActivo(e.target.checked)} className="rounded text-green-600 focus:ring-green-500 w-4 h-4 cursor-pointer" />
              Activo
            </label>
          </h2>
          
          <div className={`space-y-4 ${!scotiaActivo ? 'opacity-50' : ''}`}>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Cuenta en Soles</label>
              <input
                type="text"
                value={scotiaCta}
                onChange={e => setScotiaCta(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">CCI (Interbancaria)</label>
              <input
                type="text"
                value={scotiaCci}
                onChange={e => setScotiaCci(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* BBVA */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-base font-bold text-gray-900 flex items-center justify-between gap-2 mb-4">
            <span className="flex items-center gap-2"><CreditCard size={18} className="text-blue-600" /> BBVA</span>
            <label className="flex items-center gap-2 text-sm font-normal cursor-pointer">
              <input type="checkbox" checked={bbvaActivo} onChange={e => setBbvaActivo(e.target.checked)} className="rounded text-green-600 focus:ring-green-500 w-4 h-4 cursor-pointer" />
              Activo
            </label>
          </h2>
          
          <div className={`space-y-4 ${!bbvaActivo ? 'opacity-50' : ''}`}>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Cuenta en Soles</label>
              <input
                type="text"
                value={bbvaCta}
                onChange={e => setBbvaCta(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">CCI (Interbancaria)</label>
              <input
                type="text"
                value={bbvaCci}
                onChange={e => setBbvaCci(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* BCP */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-base font-bold text-gray-900 flex items-center justify-between gap-2 mb-4">
            <span className="flex items-center gap-2"><CreditCard size={18} className="text-[#F18800]" /> BCP</span>
            <label className="flex items-center gap-2 text-sm font-normal cursor-pointer">
              <input type="checkbox" checked={bcpActivo} onChange={e => setBcpActivo(e.target.checked)} className="rounded text-green-600 focus:ring-green-500 w-4 h-4 cursor-pointer" />
              Activo
            </label>
          </h2>
          
          <div className={`space-y-4 ${!bcpActivo ? 'opacity-50' : ''}`}>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Cuenta en Soles</label>
              <input
                type="text"
                value={bcpCta}
                onChange={e => setBcpCta(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">CCI (Interbancaria)</label>
              <input
                type="text"
                value={bcpCci}
                onChange={e => setBcpCci(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl">
            <div className="p-6">
              <div className="mx-auto w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mb-4">
                <ShieldAlert size={24} />
              </div>
              <h3 className="text-xl font-bold text-center text-gray-900 mb-2">Verificación de Seguridad</h3>
              <p className="text-center text-gray-500 text-sm mb-6">
                Ingresa el código de 6 dígitos que enviamos a<br/>
                <strong>{emailVerif}</strong>
              </p>

              <form onSubmit={handleVerifyAndSave}>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={otpCode}
                  onChange={e => setOtpCode(e.target.value.replace(/\D/g, ''))}
                  required
                  placeholder="123456"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-center text-2xl font-mono tracking-[0.5em] focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all mb-4"
                />

                {error && (
                  <div className="mb-4 text-center text-sm text-red-600 font-medium">
                    {error}
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => { setShowOtpModal(false); setError(null) }}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={otpLoading || otpCode.length < 6}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 transition-colors disabled:opacity-50"
                  >
                    {otpLoading ? 'Verificando...' : 'Confirmar'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
