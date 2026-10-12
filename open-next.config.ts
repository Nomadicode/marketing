import { defineCloudflareConfig } from '@opennextjs/cloudflare';
import r2IncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache';

// ISR pages (home, work: revalidate = 300) keep their cache in R2.
export default defineCloudflareConfig({
  incrementalCache: r2IncrementalCache,
});
