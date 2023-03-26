/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'build',
  experimental: {
    appDir: true,
  },
  env: {
    NEXTAUTH_SECRET: "gotothetop"
  }
}

module.exports = nextConfig
