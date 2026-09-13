import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

function shape(value) {
  if (Array.isArray(value)) return { type: 'array', length: value.length };
  if (value && typeof value === 'object') {
    return {
      type: 'object',
      keys: Object.keys(value)
        .sort()
        .reduce((acc, key) => {
          acc[key] = shape(value[key]);
          return acc;
        }, {}),
    };
  }
  return { type: typeof value };
}

test('en and es message files carry the same keys and array lengths', () => {
  const en = JSON.parse(readFileSync('messages/en.json', 'utf8'));
  const es = JSON.parse(readFileSync('messages/es.json', 'utf8'));
  assert.deepEqual(shape(es), shape(en));
});

test('every nav path has a matching localized page directory', () => {
  const en = JSON.parse(readFileSync('messages/en.json', 'utf8'));
  const navPaths = [
    'services',
    'flowdek',
    'work',
    'pricing',
    'about',
    'careers',
  ];
  for (const path of navPaths) {
    assert.ok(en.nav[path], `messages.en.nav.${path} is missing`);
  }
});
