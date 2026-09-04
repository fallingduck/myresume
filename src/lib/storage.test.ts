import { describe, expect, it } from 'vitest';
import { storageKey } from './storage';

describe('storageKey', () => {
  it('prefixes user when present', () => {
    expect(storageKey('alice')).toBe('aliceresume-config');
  });

  it('works without user', () => {
    expect(storageKey()).toBe('resume-config');
    expect(storageKey(undefined)).toBe('resume-config');
  });
});
