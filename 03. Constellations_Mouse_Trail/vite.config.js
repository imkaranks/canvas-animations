import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  root: "src",
  build: {
    outDir: "../dist",
  },
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "src") },
      {
        find: "@images",
        replacement: path.resolve(__dirname, "src/assets/images"),
      },
      {
        find: "@core",
        replacement: path.resolve(__dirname, "src/js/core"),
      },
      {
        find: "@objects",
        replacement: path.resolve(__dirname, "src/js/objects"),
      },
    ],
  },
});
