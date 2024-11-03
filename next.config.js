/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Helps catch common React issues
  swcMinify: true,       // SWC minifier for faster builds
  experimental: {
    appDir: true,        // Useful for more advanced routing capabilities in Next.js
  },
};

module.exports = nextConfig;
