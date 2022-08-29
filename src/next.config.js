/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // useFileSystemPublicRoutes: false,
};

module.exports = {
  nextConfig,
  assetPrefix: isProd
    ? "https://cdn.statically.io/gh/aniebietudoh/aniebietudoh.github.io/gh-pages/"
    : "",
};
