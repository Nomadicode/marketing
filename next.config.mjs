import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Cloudflare's Images binding isn't available on this account's billing
    // plan, so images are served as-is from the Worker's static assets.
    unoptimized: true,
  },
};

export default nextConfig;

// Exposes the Cloudflare bindings (R2, Images) to `next dev`.
initOpenNextCloudflareForDev();
