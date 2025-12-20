import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Carga las variables de entorno desde el archivo .env ubicado en la raíz
  // El tercer parámetro '' permite cargar todas las variables, no solo las que empiezan con VITE_
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [react()],
    define: {
      // Define process.env.API_KEY globalmente para que el SDK de Google GenAI pueda usarlo
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  };
});