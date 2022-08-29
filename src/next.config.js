/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // useFileSystemPublicRoutes: false,
};

const isProd = process.env.NODE_ENV === "production";

module.exports = {
  nextConfig,
  assetPrefix: isProd
    ? "https://cdn.statically.io/gh/aniebietudoh/aniebietudoh.github.io"
    : "",
};
