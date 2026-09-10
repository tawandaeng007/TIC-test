import { spawn } from "node:child_process";
import { cp, rm, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const projectRoot = new URL("../", import.meta.url);
const nextBin = fileURLToPath(
  new URL("../node_modules/next/dist/bin/next", import.meta.url),
);

await new Promise((resolve, reject) => {
  const child = spawn(process.execPath, [nextBin, "build"], {
    cwd: fileURLToPath(projectRoot),
    env: {
      ...process.env,
      GITHUB_PAGES: "true",
    },
    stdio: "inherit",
  });

  child.on("error", reject);
  child.on("exit", (code) => {
    if (code === 0) {
      resolve();
    } else {
      reject(new Error(`GitHub Pages build exited with code ${code}`));
    }
  });
});

const outputDir = new URL("../out/", import.meta.url);
const docsDir = new URL("../docs/", import.meta.url);

await rm(docsDir, { recursive: true, force: true });
await cp(outputDir, docsDir, { recursive: true });
await writeFile(new URL(".nojekyll", docsDir), "");
