/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // 1. Allow private IPs (like 127.0.0.1) during development
    dangerouslyAllowLocalIP: true, 
    
    // 2. Keep your existing remotePatterns for the backend
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/media/**',
      },
    ],
  },
};

export default nextConfig;
import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
