-- PEGA ESTE SQL COMPLETO EN EL SQL EDITOR DE INSFORGE Y PRESIONA RUN

CREATE TABLE IF NOT EXISTS hero_slides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  orden INTEGER NOT NULL DEFAULT 1,
  imagen_url TEXT NOT NULL,
  titulo TEXT,
  subtitulo TEXT,
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS estadisticas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clave TEXT NOT NULL UNIQUE,
  valor INTEGER NOT NULL DEFAULT 0,
  etiqueta TEXT NOT NULL,
  icono TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS proyectos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  programa TEXT NOT NULL,
  nombre TEXT NOT NULL,
  descripcion TEXT,
  imagen_url TEXT,
  meta_financiera NUMERIC DEFAULT 0,
  recaudado NUMERIC DEFAULT 0,
  ubicacion TEXT,
  estado TEXT DEFAULT 'activo',
  activo BOOLEAN DEFAULT true,
  orden INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS testimonios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  cargo TEXT,
  testimonio TEXT NOT NULL,
  foto_url TEXT,
  activo BOOLEAN DEFAULT true,
  orden INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS alianzas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  logo_url TEXT,
  url_web TEXT,
  tipo TEXT DEFAULT 'alianza',
  activo BOOLEAN DEFAULT true,
  orden INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS equipo (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  cargo TEXT NOT NULL,
  area TEXT,
  foto_url TEXT,
  linkedin_url TEXT,
  orden INTEGER DEFAULT 0,
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS noticias (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo TEXT NOT NULL,
  resumen TEXT,
  contenido TEXT,
  imagen_url TEXT,
  fuente TEXT,
  url_externa TEXT,
  publicado BOOLEAN DEFAULT false,
  fecha_publicacion TIMESTAMPTZ,
  orden INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS productos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  descripcion TEXT,
  precio NUMERIC NOT NULL,
  categoria TEXT NOT NULL,
  imagen_url TEXT,
  stock INTEGER DEFAULT 0,
  activo BOOLEAN DEFAULT true,
  destacado BOOLEAN DEFAULT false,
  orden INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS admin_usuarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  nombre TEXT NOT NULL,
  rol TEXT NOT NULL DEFAULT 'editor',
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS auditoria_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_email TEXT NOT NULL,
  accion TEXT NOT NULL,
  tabla TEXT NOT NULL,
  registro_id TEXT,
  detalle JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Datos iniciales
INSERT INTO estadisticas (clave, valor, etiqueta, icono) VALUES
  ('familias_beneficiadas', 5000, 'Familias Beneficiadas', 'users'),
  ('anos_de_experiencia', 12, 'Años de Experiencia', 'calendar'),
  ('proyectos_activos', 15, 'Proyectos Activos', 'briefcase'),
  ('voluntarios', 300, 'Voluntarios', 'heart')
ON CONFLICT (clave) DO NOTHING;

INSERT INTO hero_slides (orden, imagen_url, titulo, subtitulo, activo) VALUES
  (1, '/assets/hero/portada1.webp', 'FORMA PARTE DE AMA PERÚ', 'TRANSFORMANDO EL PERÚ DESDE ADENTRO', true),
  (2, '/assets/hero/portada2.webp', 'CONSTRUYENDO FUTUROS', 'JUNTOS POR UN PERÚ MEJOR', true),
  (3, '/assets/hero/portada3.webp', 'IMPACTO REAL', 'MILES DE FAMILIAS BENEFICIADAS', true)
ON CONFLICT DO NOTHING;

INSERT INTO proyectos (programa, nombre, descripcion, estado, activo, orden) VALUES
  ('Parques Funcionales', 'Parques Funcionales Lima Norte', 'Construccion y rehabilitacion de espacios publicos', 'activo', true, 1),
  ('ASISTE', 'Programa ASISTE', 'Asistencia integral para familias vulnerables', 'activo', true, 2),
  ('Tienda Solidaria', 'Tienda Solidaria AMA PERU', 'Productos artesanales de comunidades rurales', 'activo', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO admin_usuarios (email, nombre, rol, activo) VALUES
  ('alimentoskerrys@gmail.com', 'Administrador AMA PERU', 'superadmin', true)
ON CONFLICT (email) DO NOTHING;
