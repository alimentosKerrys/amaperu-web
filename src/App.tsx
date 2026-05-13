import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import WhatsAppFAB from './components/ui/WhatsAppFAB'
import ScrollToTop from './components/ui/ScrollToTop'
import { CartProvider } from './context/CartContext'
import { ModalProvider } from './context/ModalContext'
import ModalPago from './components/ModalPago'
import Home from './pages/Home'
import QuienesSomos from './pages/QuienesSomos'
import Programas from './pages/Programas'
import Unete from './pages/Unete'
import Noticias from './pages/Noticias'
import Contactanos from './pages/Contactanos'
import TiendaSolidaria from './pages/TiendaSolidaria'
import Donacion from './pages/Donacion'

// Admin imports — completamente separados del sitio público
import { AdminAuthProvider } from './admin/context/AdminAuthContext'
import AdminGuard from './admin/components/AdminGuard'
import AdminLayout from './admin/components/AdminLayout'
import AdminLogin from './admin/pages/AdminLogin'
import AdminDashboard from './admin/pages/AdminDashboard'
import AdminHeroSlider from './admin/pages/AdminHeroSlider'
import AdminEquipo from './admin/pages/AdminEquipo'
import AdminProyectos from './admin/pages/AdminProyectos'
import AdminNoticias from './admin/pages/AdminNoticias'
import AdminEstadisticas from './admin/pages/AdminEstadisticas'
import AdminAjustes from './admin/pages/AdminAjustes'

// ---- Sitio Público ----
function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/quienes-somos" element={<QuienesSomos />} />
          <Route path="/programas" element={<Programas />} />
          <Route path="/unete" element={<Unete />} />
          <Route path="/noticias" element={<Noticias />} />
          <Route path="/contactanos" element={<Contactanos />} />
          <Route path="/tienda" element={<TiendaSolidaria />} />
          <Route path="/donacion" element={<Donacion />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

function PublicLayout() {
  return (
    <>
      <Navbar />
      <AnimatedRoutes />
      <Footer />
      <WhatsAppFAB />
      <ScrollToTop />
      <ModalPago />
    </>
  )
}

// ---- Admin Panel — Layout y rutas completamente aislados ----
function AdminRoutes() {
  return (
    <Routes>
      {/* Login — sin guard, accesible sin sesión */}
      <Route path="login" element={<AdminLogin />} />

      {/* Todo lo demás requiere estar autenticado */}
      <Route element={<AdminGuard />}>
        <Route element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          {/* Módulos — se irán añadiendo aquí */}
          <Route path="noticias" element={<AdminNoticias />} />
          <Route path="proyectos" element={<AdminProyectos />} />
          <Route path="equipo" element={<AdminEquipo />} />
          <Route path="estadisticas" element={<AdminEstadisticas />} />
          <Route path="ajustes" element={<AdminAjustes />} />
          <Route path="productos" element={<div className="p-8 text-white/50">Módulo Productos — próximamente</div>} />
          <Route path="testimonios" element={<div className="p-8 text-white/50">Módulo Testimonios — próximamente</div>} />
          <Route path="alianzas" element={<div className="p-8 text-white/50">Módulo Alianzas — próximamente</div>} />
          <Route path="slider" element={<AdminHeroSlider />} />
        </Route>
      </Route>
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AdminAuthProvider>
        <Routes>
          {/* /admin/* → Admin Panel (sin Navbar público, sin Footer) */}
          <Route path="/admin/*" element={<AdminRoutes />} />

          {/* Todo lo demás → Sitio público */}
          <Route
            path="/*"
            element={
              <CartProvider>
                <ModalProvider>
                  <PublicLayout />
                </ModalProvider>
              </CartProvider>
            }
          />
        </Routes>
      </AdminAuthProvider>
    </BrowserRouter>
  )
}

export default App
