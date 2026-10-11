export type AnalyticsConfig = {
  token: string;
  host: string;
};

export const ANALYTICS_SUPER_PROPERTIES = {
  product: 'nomadicode',
  app: 'nomadicode-site',
} as const;

const DEFAULT_HOST = 'https://us.i.posthog.com';

/**
 * PostHog config from public env vars, or null when the token is unset so the
 * site keeps working without analytics. Missing config is reported in
 * development because it silently drops every event.
 */
export function resolveAnalyticsConfig(
  token: string | undefined,
  host: string | undefined,
  isDevelopment: boolean,
): AnalyticsConfig | null {
  const trimmedToken = token?.trim();
  if (!trimmedToken) {
    if (isDevelopment) {
      // RATIONALE: required by PostHog's integration rules so a missing token is never silent in dev.
      console.error(
        'NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN is configured',
      );
    }
    return null;
  }
  return { token: trimmedToken, host: host?.trim() || DEFAULT_HOST };
}
