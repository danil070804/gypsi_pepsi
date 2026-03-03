/** @type {import('next').NextConfig} */
const nextConfig = {
  // Railway/Nixpacks works best with a standalone build.
  // Start command: node .next/standalone/server.js
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" }
    ],
  },
};
export default nextConfig;
