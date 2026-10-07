import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  // Prefer this app's lockfile over ~/package-lock.json
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
