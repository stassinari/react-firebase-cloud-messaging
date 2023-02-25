import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "prompt",
      devOptions: {
        enabled: true,
      },

      includeAssets: ["fire.svg", "assets/apple-icon-180.png"],
      manifest: {
        name: "react-firebase-cloud-messaging",
        short_name: "rfcm",
        description: "An example React PWA for Firebase Cloud Messaging",
        theme_color: "#BFDBFE",
        icons: [
          {
            src: "assets/manifest-icon-192.maskable.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "assets/manifest-icon-512.maskable.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
