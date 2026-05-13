import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdminAuth } from '../context/AdminAuthContext'
import { Eye, EyeOff, Lock, Mail, Leaf, RefreshCw, CheckCircle2, AlertCircle, KeyRound } from 'lucide-react'
import { insforge } from '../../lib/insforge'

type Step = 'login' | 'verify' | 'reset_code' | 'reset_newpass'

export default function AdminLogin() {
  const { signIn, refreshUser } = useAdminAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState<Step>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [verifyCode, setVerifyCode] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false)
  const [resetToken, setResetToken] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // ── Intentar login (auto-registra si la cuenta no existe aún)
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setInfo('')
    setLoading(true)

    // Intento 1: login normal
    const { error: loginErr } = await signIn(email, password)

    if (!loginErr) {
      setLoading(false)
      navigate('/admin')
      return
    }

    // Intento 2: si falla por credenciales → intentar registrar la cuenta
    // (la cuenta auth.users puede no existir aún en el nuevo proyecto)
    const credentialError = loginErr.toLowerCase().includes('invalid') ||
      loginErr.toLowerCase().includes('incorrect') ||
      loginErr.toLowerCase().includes('credencial') ||
      loginErr.toLowerCase().includes('not found') ||
      loginErr.toLowerCase().includes('user')

    if (credentialError) {
      setInfo('Creando tu cuenta de acceso...')
      try {
        const { data: signUpData, error: signUpErr } = await insforge.auth.signUp({ email, password })

        if (!signUpErr && signUpData?.user) {
          // Registro exitoso — ahora hacer login
          const { error: loginErr2 } = await signIn(email, password)
          setLoading(false)
          if (!loginErr2) {
            navigate('/admin')
            return
          }
          // Puede necesitar verificación de email
          if (loginErr2.toLowerCase().includes('verif') || loginErr2.toLowerCase().includes('email')) {
            setStep('verify')
            setInfo('Cuenta creada. Revisa tu Gmail y escribe el código de 6 dígitos.')
            return
          }
          setError(loginErr2)
          return
        }

        // Si signUp falla por email ya existente → el problema es la contraseña
        const errMsg = String(signUpErr?.message ?? signUpErr ?? '')
        if (errMsg.toLowerCase().includes('exist') || errMsg.toLowerCase().includes('already')) {
          setLoading(false)
          setError('Contraseña incorrecta. La cuenta existe pero la contraseña no coincide.')
          return
        }
      } catch {
        // ignorar error de registro
      }
    }

    setLoading(false)

    // Si el error es por email no verificado, mostrar paso de verificación
    if (loginErr.toLowerCase().includes('verif') || loginErr.toLowerCase().includes('email')) {
      setStep('verify')
      setInfo('Tu cuenta necesita verificación. Revisa tu Gmail y escribe el código de 6 dígitos.')
    } else {
      setError(loginErr)
    }
  }


  // ── Verificar código OTP
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Paso 1: verificar el código con InsForge
    const { data, error } = await insforge.auth.verifyEmail({ email, otp: verifyCode })

    if (error || !data) {
      setLoading(false)
      setError('Código incorrecto o expirado. Haz clic en "Reenviar código" para obtener uno nuevo.')
      return
    }

    // Paso 2: InsForge ya creó la sesión — solo refrescamos el contexto y navegamos
    const u = await refreshUser()
    setLoading(false)

    if (u) {
      navigate('/admin')
    } else {
      // Sesión no detectada aún — ir al login normal con mensaje de éxito
      setStep('login')
      setInfo('✅ Email verificado. Ahora ingresa tu correo y contraseña.')
    }
  }

  // ── Reenviar código
  const handleResend = async () => {
    setResending(true)
    setError('')
    await insforge.auth.resendVerificationEmail({ email })
    setResending(false)
    setInfo('✓ Nuevo código enviado a tu Gmail. Puede tardar 1-2 minutos.')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(135deg, #0a0d0f 0%, #0f1117 50%, #0d1209 100%)' }}>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: 'radial-gradient(circle, #8DC63F 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
            style={{ background: 'rgba(141,198,63,0.15)', border: '1px solid rgba(141,198,63,0.3)' }}>
            <Leaf size={28} style={{ color: '#8DC63F' }} />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">Panel AMA PERÚ</h1>
          <p className="text-white/40 text-sm">
            {step === 'login' ? 'Acceso restringido al equipo administrativo' : 'Verificación de identidad'}
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl p-8"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)' }}>

          {/* ── PASO 1: LOGIN ── */}
          {step === 'login' && (
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-white/60 text-xs font-semibold uppercase tracking-widest mb-2">
                  Correo electrónico
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                  <input
                    id="admin-email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    placeholder="alimentoskerrys@gmail.com"
                    className="w-full pl-11 pr-4 py-3 rounded-xl text-white text-sm outline-none transition-all"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                    onFocus={e => e.target.style.borderColor = '#8DC63F'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/60 text-xs font-semibold uppercase tracking-widest mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                  <input
                    id="admin-password"
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full pl-11 pr-12 py-3 rounded-xl text-white text-sm outline-none transition-all"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                    onFocus={e => e.target.style.borderColor = '#8DC63F'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                  <button type="button" onClick={() => setShowPass(v => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="flex items-start gap-2 rounded-lg px-4 py-3 text-sm"
                  style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5' }}>
                  <AlertCircle size={15} className="flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {info && (
                <div className="flex items-start gap-2 rounded-lg px-4 py-3 text-sm"
                  style={{ background: 'rgba(141,198,63,0.1)', border: '1px solid rgba(141,198,63,0.3)', color: '#a3e635' }}>
                  <CheckCircle2 size={15} className="flex-shrink-0 mt-0.5" />
                  <span>{info}</span>
                </div>
              )}

              <button
                id="admin-login-btn"
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl font-bold text-sm text-white transition-all disabled:opacity-50"
                style={{ background: loading ? 'rgba(141,198,63,0.5)' : '#8DC63F' }}
              >
                {loading ? 'Verificando...' : 'Ingresar al Panel'}
              </button>

              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-white/10"></div>
                <span className="flex-shrink-0 mx-4 text-white/30 text-xs uppercase tracking-wider">o</span>
                <div className="flex-grow border-t border-white/10"></div>
              </div>

              <button
                type="button"
                onClick={async () => {
                  if (!email) { setError('Por favor, ingresa tu correo primero.'); return }
                  setError('')
                  setLoading(true)
                  const { data, error: err } = await insforge.auth.sendResetPasswordEmail({ email })
                  setLoading(false)
                  if (err || !data?.success) {
                    setError('No se pudo enviar el correo. Verifica que el email sea correcto.')
                  } else {
                    setStep('reset_code')
                    setInfo('Te enviamos un código de 6 dígitos a tu Gmail para restablecer tu contraseña.')
                  }
                }}
                disabled={loading}
                className="w-full py-3 rounded-xl font-bold text-sm text-white transition-all disabled:opacity-50 border border-white/10 hover:bg-white/5"
              >
                <KeyRound size={14} className="inline mr-2" />
                Olvidé mi contraseña
              </button>

              {/* Ayuda */}
              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => { setStep('verify'); setInfo('Escribe el código de 6 dígitos que recibiste en tu Gmail.') }}
                  className="text-white/30 text-xs hover:text-white/60 transition-colors underline underline-offset-2"
                >
                  ¿Necesitas verificar tu correo?
                </button>
              </div>
            </form>
          )}

          {/* ── PASO 2: VERIFICAR CÓDIGO ── */}
          {step === 'verify' && (
            <form onSubmit={handleVerify} className="space-y-5">
              <div className="text-center mb-2">
                <div className="text-white/50 text-sm">Ingresa el código enviado a</div>
                <div className="font-semibold text-white text-sm mt-0.5">{email || 'tu Gmail'}</div>
              </div>

              <div>
                <label className="block text-white/60 text-xs font-semibold uppercase tracking-widest mb-2">
                  Código de verificación (6 dígitos)
                </label>
                <input
                  id="admin-verify-code"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={verifyCode}
                  onChange={e => setVerifyCode(e.target.value.replace(/\D/g, ''))}
                  required
                  placeholder="123456"
                  className="w-full px-4 py-4 rounded-xl text-white text-2xl font-mono text-center outline-none tracking-[0.5em] transition-all"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                  onFocus={e => e.target.style.borderColor = '#8DC63F'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              </div>

              {error && (
                <div className="flex items-start gap-2 rounded-lg px-4 py-3 text-sm"
                  style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5' }}>
                  <AlertCircle size={15} className="flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {info && (
                <div className="flex items-start gap-2 rounded-lg px-4 py-3 text-sm"
                  style={{ background: 'rgba(141,198,63,0.1)', border: '1px solid rgba(141,198,63,0.3)', color: '#a3e635' }}>
                  <CheckCircle2 size={15} className="flex-shrink-0 mt-0.5" />
                  <span>{info}</span>
                </div>
              )}

              <button
                id="admin-verify-btn"
                type="submit"
                disabled={loading || verifyCode.length < 6}
                className="w-full py-3 rounded-xl font-bold text-sm text-white transition-all disabled:opacity-50"
                style={{ background: '#8DC63F' }}
              >
                {loading ? 'Verificando...' : 'Confirmar código'}
              </button>

              {/* Reenviar código */}
              <button
                id="admin-resend-btn"
                type="button"
                onClick={handleResend}
                disabled={resending}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm transition-all"
                style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)' }}
              >
                <RefreshCw size={14} className={resending ? 'animate-spin' : ''} />
                {resending ? 'Enviando...' : 'Reenviar código al Gmail'}
              </button>

              <div className="text-center">
                <button type="button" onClick={() => { setStep('login'); setError(''); setInfo('') }}
                  className="text-white/30 text-xs hover:text-white/60 transition-colors underline underline-offset-2">
                  ← Volver al login
                </button>
              </div>
            </form>
          )}

          {/* ── PASO 3: CÓDIGO DE RESET ── */}
          {step === 'reset_code' && (
            <form onSubmit={async (e) => {
              e.preventDefault()
              setError('')
              setLoading(true)
              const { data, error: err } = await insforge.auth.exchangeResetPasswordToken({ email, code: verifyCode })
              setLoading(false)
              if (err || !data?.token) {
                setError('Código incorrecto o expirado. Intenta reenviar.')
              } else {
                setResetToken(data.token)
                setStep('reset_newpass')
                setInfo('Código válido. Ahora escoge una nueva contraseña.')
              }
            }} className="space-y-5">
              <div className="text-center mb-2">
                <div className="text-white/50 text-sm">Ingresa el código enviado a</div>
                <div className="font-semibold text-white text-sm mt-0.5">{email}</div>
              </div>

              <div>
                <label className="block text-white/60 text-xs font-semibold uppercase tracking-widest mb-2">
                  Código de restablecimiento (6 dígitos)
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={verifyCode}
                  onChange={e => setVerifyCode(e.target.value.replace(/\D/g, ''))}
                  required
                  placeholder="123456"
                  className="w-full px-4 py-4 rounded-xl text-white text-2xl font-mono text-center outline-none tracking-[0.5em] transition-all"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                  onFocus={e => e.target.style.borderColor = '#8DC63F'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              </div>

              {error && (
                <div className="flex items-start gap-2 rounded-lg px-4 py-3 text-sm"
                  style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5' }}>
                  <AlertCircle size={15} className="flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {info && (
                <div className="flex items-start gap-2 rounded-lg px-4 py-3 text-sm"
                  style={{ background: 'rgba(141,198,63,0.1)', border: '1px solid rgba(141,198,63,0.3)', color: '#a3e635' }}>
                  <CheckCircle2 size={15} className="flex-shrink-0 mt-0.5" />
                  <span>{info}</span>
                </div>
              )}

              <button type="submit" disabled={loading || verifyCode.length < 6}
                className="w-full py-3 rounded-xl font-bold text-sm text-white transition-all disabled:opacity-50"
                style={{ background: '#8DC63F' }}>
                {loading ? 'Verificando...' : 'Confirmar código'}
              </button>

              <button type="button" onClick={async () => {
                setLoading(true)
                await insforge.auth.sendResetPasswordEmail({ email })
                setLoading(false)
                setInfo('✓ Nuevo código enviado.')
              }} disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm"
                style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)' }}>
                <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                Reenviar código
              </button>

              <div className="text-center">
                <button type="button" onClick={() => { setStep('login'); setError(''); setInfo('') }}
                  className="text-white/30 text-xs hover:text-white/60 transition-colors underline underline-offset-2">
                  ← Volver al login
                </button>
              </div>
            </form>
          )}

          {/* ── PASO 4: NUEVA CONTRASEÑA ── */}
          {step === 'reset_newpass' && (
            <form onSubmit={async (e) => {
              e.preventDefault()
              setError('')
              if (newPassword !== confirmPassword) { setError('Las contraseñas no coinciden.'); return }
              if (newPassword.length < 8) { setError('Mínimo 8 caracteres.'); return }
              setLoading(true)
              const { error: err } = await insforge.auth.resetPassword({ newPassword, otp: resetToken })
              setLoading(false)
              if (err) {
                setError('Error al cambiar la contraseña: ' + err.message)
              } else {
                setStep('login')
                setInfo('✅ Contraseña actualizada. Ya puedes iniciar sesión con tu nueva contraseña.')
                setNewPassword('')
                setConfirmPassword('')
              }
            }} className="space-y-5">
              <div className="text-center mb-2">
                <div className="text-white/50 text-sm">Elige una nueva contraseña para</div>
                <div className="font-semibold text-white text-sm mt-0.5">{email}</div>
              </div>

              <div>
                <label className="block text-white/60 text-xs font-semibold uppercase tracking-widest mb-2">Nueva Contraseña</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    required minLength={8}
                    placeholder="Mínimo 8 caracteres"
                    className="w-full pl-11 pr-12 py-3 rounded-xl text-white text-sm outline-none transition-all"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                    onFocus={e => e.target.style.borderColor = '#8DC63F'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                  <button type="button" onClick={() => setShowPass(v => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-white/60 text-xs font-semibold uppercase tracking-widest mb-2">Confirmar Contraseña</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                    placeholder="Repite la contraseña"
                    className="w-full pl-11 py-3 rounded-xl text-white text-sm outline-none transition-all"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                    onFocus={e => e.target.style.borderColor = '#8DC63F'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-start gap-2 rounded-lg px-4 py-3 text-sm"
                  style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5' }}>
                  <AlertCircle size={15} className="flex-shrink-0 mt-0.5" /><span>{error}</span>
                </div>
              )}
              {info && (
                <div className="flex items-start gap-2 rounded-lg px-4 py-3 text-sm"
                  style={{ background: 'rgba(141,198,63,0.1)', border: '1px solid rgba(141,198,63,0.3)', color: '#a3e635' }}>
                  <CheckCircle2 size={15} className="flex-shrink-0 mt-0.5" /><span>{info}</span>
                </div>
              )}

              <button type="submit" disabled={loading}
                className="w-full py-3 rounded-xl font-bold text-sm text-white transition-all disabled:opacity-50"
                style={{ background: '#8DC63F' }}>
                {loading ? 'Guardando...' : 'Establecer nueva contraseña'}
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-white/20 text-xs mt-6">
          AMA PERÚ · Panel Administrativo · Acceso solo para personal autorizado
        </p>
      </div>
    </div>
  )
}

