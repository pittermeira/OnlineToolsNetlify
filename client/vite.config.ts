import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@shared": path.resolve(__dirname, "../shared"),
      "@assets": path.resolve(__dirname, "../attached_assets"),
    },
  },
  build: {
    outDir: "../dist/public",
    emptyOutDir: true,
    sourcemap: false,
    minify: false, // Desabilitar minificação para acelerar build
    rollupOptions: {
      output: {
        // Simplificar chunks para acelerar build
        manualChunks: undefined
      }
    }
  },
  define: {
    'process.env.NODE_ENV': '"production"'
  },
});