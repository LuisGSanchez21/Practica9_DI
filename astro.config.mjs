import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind"; // ✅ Correct import

export default defineConfig({
  integrations: [
    react(),
    tailwind(), // ✅ No extra config needed unless you have specific needs
  ],
});
