import { build } from "esbuild";

const packages = await import('./package.json', { with: { type: 'json' } });

console.log("Building server");
build({
    entryPoints: ["server/index.ts"],
    outdir: "dist/server",
    platform: "node",
    format: "esm",
    target: ["node18"],
    bundle: true,
    minify: true,
    loader: {
        ".ts": "ts",
        ".js": "js"
    },
    external: Object.keys(packages.default.dependencies || {}),
    sourcemap: true,
    banner: {
        js: "/* TribalCraft Server - Copyright (C) 2025 TribalCraft - GPLv3 */"
    }
}).then(() => {
    console.log("Building client");

    return build({
        entryPoints: ["client/index.ts"],
        outdir: "dist/client",
        platform: "browser",
        format: "esm",
        target: ["es2020"],
        bundle: true,
        loader: {
            ".ts": "ts",
            ".js": "js"
        },
        sourcemap: true,
        banner: {
            js: "/* TribalCraft Client - Copyright (C) 2025 TribalCraft - GPLv3 */"
        }
    });
}).then(() => {
    console.log("Successfully built TribalCraft!");
}).catch((err) => {
    console.error("build failed:", err);
    process.exit(1);
});