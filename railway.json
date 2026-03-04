import { spawn } from "node:child_process";

// Railway provides DATABASE_URL; we also ship a sane default for absolute URLs.
const DEFAULT_SITE_URL = "https://gypseyemployment.com";

function run(cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { stdio: "inherit", ...opts });
    p.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${cmd} ${args.join(" ")} exited with ${code}`));
    });
  });
}

async function main() {
  // Ensure the app has a public base URL for sitemap/robots.
  if (!process.env.NEXT_PUBLIC_SITE_URL) {
    process.env.NEXT_PUBLIC_SITE_URL = process.env.AUTH_URL || DEFAULT_SITE_URL;
  }

  // Create/update schema in Railway Postgres (no migrations in repo).
  if (process.env.DATABASE_URL) {
    await run("npx", ["prisma", "db", "push"], { env: process.env });
    // Seed is idempotent (upserts + count checks).
    await run("node", ["prisma/seed.mjs"], { env: process.env });
  } else {
    console.warn("[railway-start] DATABASE_URL is not set. Skipping prisma db push/seed.");
  }

  // Start Next standalone server
  const serverEnv = { 
    ...process.env, 
    PORT: process.env.PORT || "8080",
    HOSTNAME: "0.0.0.0"
  };
  await run("node", [".next/standalone/server.js"], { env: serverEnv });
}

main().catch((err) => {
  console.error("[railway-start]", err);
  process.exit(1);
});
