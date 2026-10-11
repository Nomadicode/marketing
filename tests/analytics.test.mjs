import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveAnalyticsConfig } from '../app/services/analytics.service.ts';

test('analytics config is null without a token', (t) => {
  t.mock.method(console, 'error', () => {});
  assert.equal(resolveAnalyticsConfig(undefined, undefined, false), null);
  assert.equal(resolveAnalyticsConfig('  ', undefined, false), null);
  assert.equal(console.error.mock.callCount(), 0);
});

test('missing token is reported in development', (t) => {
  t.mock.method(console, 'error', () => {});
  resolveAnalyticsConfig('', undefined, true);
  assert.equal(console.error.mock.callCount(), 1);
});

test('host defaults to US cloud', () => {
  assert.deepEqual(resolveAnalyticsConfig('phc_x', '', false), {
    token: 'phc_x',
    host: 'https://us.i.posthog.com',
  });
  assert.deepEqual(
    resolveAnalyticsConfig('phc_x', 'https://eu.i.posthog.com', false),
    { token: 'phc_x', host: 'https://eu.i.posthog.com' },
  );
});
