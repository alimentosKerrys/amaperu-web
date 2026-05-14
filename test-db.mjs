import { createClient } from '@insforge/sdk'
import dotenv from 'dotenv'

dotenv.config()

const INSFORGE_URL = process.env.VITE_INSFORGE_URL
const INSFORGE_ANON_KEY = process.env.VITE_INSFORGE_ANON_KEY

console.log('URL:', INSFORGE_URL)

const insforge = createClient({
  baseUrl: INSFORGE_URL,
  anonKey: INSFORGE_ANON_KEY,
})

async function run() {
  const { data, error } = await insforge.database.from('proyectos').select('*')
  if (error) {
    console.error('Error:', error)
  } else {
    console.log('Data count:', data.length)
    console.log('First item:', data[0]?.nombre, data[0]?.programa)
    console.log('All names:', data.map(d => d.nombre).join(', '))
  }
}

run()
