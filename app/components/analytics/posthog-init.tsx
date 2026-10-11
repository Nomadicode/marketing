'use client';

import { useEffect } from 'react';
import posthog from 'posthog-js';
import {
  ANALYTICS_SUPER_PROPERTIES,
  resolveAnalyticsConfig,
} from '@/app/services/analytics.service';

export function PostHogInit() {
  useEffect(() => {
    const config = resolveAnalyticsConfig(
      process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN,
      process.env.NEXT_PUBLIC_POSTHOG_HOST,
      process.env.NODE_ENV === 'development',
    );
    if (!config || posthog.__loaded) return;
    posthog.init(config.token, {
      api_host: config.host,
      defaults: '2026-05-30',
      capture_exceptions: true,
    });
    posthog.register(ANALYTICS_SUPER_PROPERTIES);
  }, []);

  return null;
}
