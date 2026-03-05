import { spawn } from "node:child_process";

function runWithCapture(cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { ...opts });
    let output = "";

    p.stdout?.on("data", (chunk) => {
      const text = String(chunk);
      output += text;
      process.stdout.write(text);
    });
    p.stderr?.on("data", (chunk) => {
      const text = String(chunk);
      output += text;
      process.stderr.write(text);
    });

    p.on("close", (code) => {
      if (code === 0) resolve(output);
      else {
        const err = new Error(`${cmd} ${args.join(" ")} exited with ${code}`);
        err.output = output;
        reject(err);
      }
    });
  });
}

async function main() {
  if (!process.env.DATABASE_URL) {
    console.log("[prisma-setup] DATABASE_URL is not set. Skipping Prisma DB setup.");
    return;
  }

  let didPushInFallback = false;

  try {
    await runWithCapture("npx", ["prisma", "migrate", "deploy"], { env: process.env });
    console.log("[prisma-setup] prisma migrate deploy completed.");
  } catch (err) {
    const output = String(err?.output || err?.message || "");
    if (output.includes("P3005")) {
      console.warn("[prisma-setup] Detected P3005 (non-empty DB without baseline). Falling back to prisma db push.");
      await runWithCapture("npx", ["prisma", "db", "push"], { env: process.env });
      console.log("[prisma-setup] prisma db push completed.");
      didPushInFallback = true;
    } else {
      throw err;
    }
  }

  // Ensure schema is physically aligned even after baseline-only flows
  // (e.g. migration marked as applied on an existing DB).
  if (!didPushInFallback) {
    await runWithCapture("npx", ["prisma", "db", "push"], { env: process.env });
    console.log("[prisma-setup] prisma db push completed.");
  }

  await runWithCapture("npx", ["prisma", "generate"], { env: process.env });
  console.log("[prisma-setup] prisma generate completed.");
}

main().catch((err) => {
  console.error("[prisma-setup]", err);
  process.exit(1);
});
