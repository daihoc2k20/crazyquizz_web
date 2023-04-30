import { ViteDevServer, defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const LoginHtmlFallbackPlugin = {
  name: "login-html-fallback",
  configureServer(server: ViteDevServer) {
    server.middlewares.use((req, res, next) => {
      req.url = req.url.replace("/quizz_web", "/");
      next();
    });
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), LoginHtmlFallbackPlugin],
  server: {
    port: 2812,
  },
  preview: {
    port: 2812,
  },
});
