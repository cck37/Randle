import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/categories": "http://localhost:4000",
      "/guesses": "http://localhost:4000",
    },
  },
});
