/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ['172.20.10.6'],
}

export default nextConfig
