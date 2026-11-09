import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { handleApiRequest } from './server/apiRouter';

function agentPayBackendPlugin(): Plugin {
  return {
    name: 'agentpay-backend-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        try {
          const handled = await handleApiRequest(req, res);
          if (!handled) {
            next();
          }
        } catch (err) {
          next(err);
        }
      });
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), agentPayBackendPlugin()],
  server: {
    port: 5173,
    host: true
  }
});
