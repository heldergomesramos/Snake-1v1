/* This script is used to create a build ready for GitHub Pages deployment by running npm run build:gh */

import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { replaceInFile } from "replace-in-file";
import fs from "fs-extra";
import { execSync } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function build() {
  try {
    console.log("Building React project...");

    // Step 1: Run npm run build
    execSync("npm run build", { stdio: "inherit" });

    // Step 2: Define the paths
    const distFolder = join(__dirname, "dist");
    const docsFolder = join(__dirname, "..", "docs");
    const distIndex = join(distFolder, "index.html");
    const docsIndex = join(docsFolder, "index.html");

    // Check if the docs folder and index.html exist before proceeding
    if (!fs.existsSync(docsFolder)) {
      throw new Error(`Docs folder does not exist: ${docsFolder}`);
    }

    if (!fs.existsSync(docsIndex)) {
      throw new Error(`Index file does not exist in docs folder: ${docsIndex}`);
    }

    // Step 3: Copy assets from dist to docs
    console.log("Copying assets to docs folder...");
    await fs.copy(join(distFolder, "assets"), join(docsFolder, "assets"), {
      overwrite: true,
    });

    // Step 4: Copy index.html and modify it
    console.log("Modifying index.html for GitHub Pages...");
    await fs.copy(distIndex, docsIndex, { overwrite: true });

    // Step 5: Add <base href="/Snake-1v1/" /> and update asset paths
    const options = {
      files: docsIndex,
      from: [
        /<head>/, // Insert base href in <head>
        /\/assets\//g, // Change "/assets/" to "assets/"
      ],
      to: [
        `<head>\n  <base href="/Snake-1v1/" />`, // Inject base tag
        "assets/", // Correct asset paths
      ],
    };

    await replaceInFile(options);

    console.log("Build process completed successfully!");
  } catch (error) {
    console.error("Error during the build process:", error.message);
  }
}

build();
