import { ViteDevServer, defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const LoginHtmlFallbackPlugin = {
  name: "login-html-fallback",
  configureServer(server: ViteDevServer) {
    server.middlewares.use("/quizz_web", (req, res, next) => {
      req.originalUrl += "/";
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
