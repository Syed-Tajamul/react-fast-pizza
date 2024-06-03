import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/React-Fast-Pizza/", // Set this to your repository name
  plugins: [react()],
});
