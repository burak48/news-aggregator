import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/nytimes": {
        target: "https://api.nytimes.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/nytimes/, ""),
      },
      "/newsapi": {
        target: "https://newsapi.org",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/newsapi/, ""),
      },
      "/opennews": {
        target: "https://newsdata.io",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/opennews/, ""),
      },
      "/theGuardian": {
        target: "https://content.guardianapis.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/theGuardian/, ""),
      },
    },
  },
});
