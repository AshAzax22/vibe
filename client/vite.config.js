import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Listen on all addresses, including LAN
    port: 5000, // Specify the port you want to use
  },
  build: {
    rollupOptions: {
      external: ["@react-oauth/google"],
    },
  },
});
