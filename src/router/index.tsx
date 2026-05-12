import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import QuienesSomos from '../pages/QuienesSomos'
import Programas from '../pages/Programas'
import Unete from '../pages/Unete'
import Noticias from '../pages/Noticias'
import Contactanos from '../pages/Contactanos'
import TiendaSolidaria from '../pages/TiendaSolidaria'
import Donacion from '../pages/Donacion'

interface AppRouterProps {
  location: ReturnType<typeof import('react-router-dom').useLocation>
}

export default function AppRouter({ location }: AppRouterProps) {
  return (
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
  )
}

export function RouterWrapper({ children }: { children: React.ReactNode }) {
  return <BrowserRouter>{children}</BrowserRouter>
}
