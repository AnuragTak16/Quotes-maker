import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  // Prefer this app's lockfile over ~/package-lock.json
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;

// Local `next dev` only — skip during production / Workers CI builds.
if (
  process.env.NODE_ENV !== 'production' &&
  !process.env.CI &&
  !process.env.WORKERS_CI
) {
  void import('@opennextjs/cloudflare').then(({ initOpenNextCloudflareForDev }) => {
    initOpenNextCloudflareForDev();
  });
}
