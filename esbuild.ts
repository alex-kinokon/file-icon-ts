#!/usr/bin/env bun
import esbuild from "esbuild";

const args = process.argv.slice(2);
const ENV = process.env.NODE_ENV || "development";
const PROD = ENV === "production";

async function main() {
  const context = await esbuild.context({
    entryPoints: ["./src/index.ts"],
    outdir: "dist",
    bundle: true,
    minify: PROD,
    platform: "browser",
    format: "esm",
    plugins: [],
    define: {
      "process.env.NODE_ENV": JSON.stringify(ENV),
    },
  });

  await context.rebuild();

  if (args.includes("-w") || args.includes("--watch")) {
    await context.watch();
  } else {
    await context.dispose();
  }
}

main();
