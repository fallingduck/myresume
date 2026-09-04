import { describe, expect, it } from 'vitest';
import { loadResume } from './load-resume';
import type { ResumeConfig } from '@/types/resume';

const fallback: ResumeConfig = { profile: { name: '默认' } };

describe('loadResume', () => {
  it('loads compressed share data before the default resume', async () => {
    const result = await loadResume(
      {
        data: 'compressed',
        mode: 'read',
      },
      {
        defaultResume: fallback,
        decompress: async () =>
          JSON.stringify({ profile: { name: '分享' } }),
      }
    );
    expect(result.config.profile?.name).toBe('分享');
    expect(result.source).toBe('data');
  });

  it('uses the default resume when no share data is present', async () => {
    const result = await loadResume(
      {
        mode: 'edit',
      },
      { defaultResume: fallback }
    );
    expect(result.config.profile?.name).toBe('默认');
    expect(result.source).toBe('default');
  });

  it('falls back to default resume', async () => {
    const result = await loadResume(
      { mode: 'edit' },
      { defaultResume: fallback }
    );
    expect(result.config.profile?.name).toBe('默认');
    expect(result.source).toBe('default');
  });
});
