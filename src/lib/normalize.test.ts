import { describe, expect, it } from 'vitest';
import { normalizeLoadedData } from './normalize';

describe('normalizeLoadedData', () => {
  it('extracts theme and drops locales', () => {
    const result = normalizeLoadedData({
      profile: { name: '张三' },
      theme: { color: '#111', tagColor: '#222' },
      locales: { 'en-US': { profile: { name: 'San' } } },
    });
    expect(result.theme).toEqual({ color: '#111', tagColor: '#222' });
    expect(result.config.profile).toEqual({ name: '张三' });
    expect(result.config.locales).toBeUndefined();
    expect('theme' in result.config).toBe(false);
  });

  it('fills missing tagColor', () => {
    const result = normalizeLoadedData({
      profile: { name: 'A' },
      theme: { color: '#abc' },
    });
    expect(result.theme?.tagColor).toBe('#8bc34a');
  });
});
