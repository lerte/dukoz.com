/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: false,
  reactStrictMode: false,
  publicRuntimeConfig: {
    ENV_URL: process.env.ENV_URL,
    CLIENT_KEY: process.env.CLIENT_KEY
  }
}

module.exports = nextConfig
