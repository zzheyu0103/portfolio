import { defineConfig } from "vite";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const currentDir = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig(({ mode }) => ({
  base: mode === "github-pages" ? "./" : "/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(currentDir, "index.html"),
        project1Home: resolve(currentDir, "project1/index.html"),
        project1Lobby: resolve(currentDir, "project1/lobby.html"),
        project1Missions: resolve(currentDir, "project1/missions.html"),
        project1Battle: resolve(currentDir, "project1/battle-result.html"),
        project1Deck: resolve(currentDir, "project1/deck-builder.html"),
        project1Completion: resolve(currentDir, "project1/completion.html"),
        project2Home: resolve(currentDir, "project2/index.html"),
        project3Home: resolve(currentDir, "project3/index.html")
      }
    }
  }
}));
