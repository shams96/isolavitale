/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: false,

  // Static export configuration for Hostinger (Disabled for Node.js hosting)
  // output: 'export',

  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },

  // Optional: Add trailing slashes for better compatibility
  // trailingSlash: true,
};

export default nextConfig;
