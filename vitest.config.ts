import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import ViteTsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), ViteTsconfigPaths()],
  test: {
    globals: true,
    environment: "jsdom",
  },
});