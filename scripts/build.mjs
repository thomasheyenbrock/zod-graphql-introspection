import { exec } from "child_process";
import esbuild from "esbuild";
import { rm } from "fs/promises";

async function build() {
  await Promise.all([
    rm("cjs", { force: true, recursive: true }),
    rm("esm", { force: true, recursive: true }),
    rm("types", { force: true, recursive: true }),
  ]);
  await Promise.all([
    esbuild.build({
      entryPoints: ["src/index.ts", "src/15.ts"],
      format: "cjs",
      outdir: "cjs",
    }),
    esbuild.build({
      entryPoints: ["src/index.ts", "src/15.ts"],
      format: "esm",
      outdir: "esm",
    }),
    exec("tsc --emitDeclarationOnly"),
  ]);
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
