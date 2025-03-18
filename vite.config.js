import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const findEntryFile = async (directory) => {
  const possibleFiles = [
    "Main.jsx",
    "main.jsx",
    "Main.tsx",
    "main.tsx",
    "index.jsx",
    "App.jsx",
    "index.tsx",
    "App.tsx",
    "main.js",
    "index.js",
    "App.js",
  ];

  for (const file of possibleFiles) {
    const filePath = resolve(__dirname, directory, file);

    if (await fs.access(filePath)) {
      return filePath;
    }
  }

  throw new Error(
    "src 폴더에 엔트리 파일이 없습니다. 엔트리 파일명: Main, main, App, index 확장자: jsx, js, tsx",
  );
};

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: findEntryFile("src"),
      },
    },
    outDir: "dist",
  },
  server: {
    port: 3000,
  },
});
