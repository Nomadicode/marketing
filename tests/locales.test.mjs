import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('published locale files retain matching top-level domains', () => {
  const en = JSON.parse(readFileSync('messages/en.json', 'utf8'));
  const es = JSON.parse(readFileSync('messages/es.json', 'utf8'));
  assert.deepEqual(Object.keys(es).sort(), Object.keys(en).sort());
  assert.equal(es.services.items.length, en.services.items.length);
  assert.equal(es.approach.steps.length, en.approach.steps.length);
});
