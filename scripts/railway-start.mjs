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

  // Ensure NextAuth resolves absolute URLs to production domain, not localhost.
  if (!process.env.NEXTAUTH_URL) {
    process.env.NEXTAUTH_URL = process.env.AUTH_URL || process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL;
  }

  const shouldSetupDbOnStart = process.env.RUN_DB_SETUP_ON_START === "true";

  // Optional DB setup. Keep disabled by default to avoid slow startup and SIGTERM on Railway.
  if (shouldSetupDbOnStart && process.env.DATABASE_URL) {
    await run("npx", ["prisma", "db", "push"], { env: process.env });
    await run("node", ["prisma/seed.mjs"], { env: process.env });
  } else if (shouldSetupDbOnStart && !process.env.DATABASE_URL) {
    console.warn("[railway-start] RUN_DB_SETUP_ON_START=true but DATABASE_URL is not set. Skipping prisma db push/seed.");
  } else {
    console.log("[railway-start] Skipping prisma db push/seed on startup (RUN_DB_SETUP_ON_START is not true).");
  }

  // Start Next production server
  const serverEnv = { 
    ...process.env, 
    PORT: process.env.PORT || "8080",
    HOSTNAME: "0.0.0.0"
  };
  await run("node", ["node_modules/next/dist/bin/next", "start", "-H", serverEnv.HOSTNAME, "-p", serverEnv.PORT], { env: serverEnv });
}

main().catch((err) => {
  console.error("[railway-start]", err);
  process.exit(1);
});
