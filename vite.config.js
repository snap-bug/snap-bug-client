import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const findEntryFile = (directory) => {
  const possibleFiles = ["Main.jsx", "main.jsx", "index.jsx", "App.jsx"];

  for (const file of possibleFiles) {
    const filePath = resolve(__dirname, directory, file);

    if (fs.existsSync(filePath)) {
      return filePath;
    }
  }

  throw new Error("src 폴더에 Main.jsx 또는 main.jsx가 있는지 확인해주세요.");
};

export default defineConfig({
  plugins: [react()],
});
