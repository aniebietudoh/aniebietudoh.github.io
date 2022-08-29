// /**
//  * @type {import('next').NextConfig}
//  */
// const nextConfig = {
//   images: {
//     loader: "akamai",
//     path: "",
//   },
//   assetPrefix: "./src",
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // useFileSystemPublicRoutes: false,
};

module.exports = nextConfig;
