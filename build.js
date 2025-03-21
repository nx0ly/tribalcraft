import { build } from "esbuild";
import JavaScriptObfuscator from "javascript-obfuscator";
import { promises as fs } from "fs";

const packages = await import("./package.json", { with: { type: "json" } });

/*
async function obfuscateFile(filePath) {
  try {
    let code = await fs.readFile(filePath, "utf8");

    const obfuscate = (inputCode) =>
      JavaScriptObfuscator.obfuscate(inputCode, {
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 0.2,
        deadCodeInjection: true,
        deadCodeInjectionThreshold: 0.5,
        disableConsoleOutput: true,
        identifierNamesGenerator: "mangled",
        numbersToExpressions: true,
        simplify: true,
        splitStrings: true,
        splitStringsChunkLength: 2,
        stringArray: true,
        stringArrayEncoding: ["rc4"],
        stringArrayThreshold: 0.4,
        stringArrayRotate: true,
        stringArrayShuffle: true,
        stringArrayWrappersCount: 2,
        transformObjectKeys: true,
        unicodeEscapeSequence: true,
        selfDefending: true,
        seed: 79797979791,
      }).getObfuscatedCode();

    code = obfuscate(code);
    code = obfuscate(code);

    await fs.writeFile(filePath, code);
    console.log(`Obfuscated ${filePath}`);
  } catch (error) {
    throw new Error(`Obfuscation failed for ${filePath}: ${error}`);
  }
}*/

console.log("Building server");
await build({
  entryPoints: ["server/index.ts"],
  outdir: "dist/server",
  platform: "node",
  format: "esm",
  target: ["node18"],
  bundle: true,
  //minify: true,
  loader: {
    ".ts": "ts",
    ".js": "js",
  },
  external: Object.keys(packages.default.dependencies || {}),
  sourcemap: false,
  banner: {
    js: "/* TribalCraft Server - Copyright (C) 2025 TribalCraft - GPLv3 */",
  },
})
  .then(async () => {
    //await obfuscateFile("dist/server/index.js");

    console.log("Building client");
    await build({
      entryPoints: ["client/index.ts"],
      outdir: "dist/client",
      platform: "browser",
      format: "esm",
      target: ["es2016"],
      bundle: true,
      //minify: true,
      loader: {
        ".ts": "ts",
        ".js": "js",
      },
      sourcemap: false,
      banner: {
        js: "/* TribalCraft Client - Copyright (C) 2025 TribalCraft - GPLv3 */",
      },
    }).then(async () => {
      //await obfuscateFile("dist/client/index.js");
      console.log("Successfully built and obfuscated TribalCraft!");
    });
  })
  .catch((err) => {
    console.error("Build or obfuscation failed:", err);
    process.exit(1);
  });