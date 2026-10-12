import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },
};

export default nextConfig;

// Exposes the Cloudflare bindings (R2, Images) to `next dev`.
initOpenNextCloudflareForDev();
