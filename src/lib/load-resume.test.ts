import { describe, expect, it, vi } from 'vitest';
import { loadResume } from './load-resume';
import type { ResumeConfig } from '@/types/resume';

const fallback: ResumeConfig = { profile: { name: '默认' } };

function memoryStorage(init: Record<string, string> = {}): Storage {
  const map = new Map(Object.entries(init));
  return {
    getItem: (k: string) => map.get(k) ?? null,
    setItem: (k: string, v: string) => {
      map.set(k, v);
    },
    removeItem: (k: string) => {
      map.delete(k);
    },
    clear: () => map.clear(),
    key: (i: number) => [...map.keys()][i] ?? null,
    get length() {
      return map.size;
    },
  };
}

describe('loadResume', () => {
  it('prefers compressed data over url and user', async () => {
    const fetchFn = vi.fn();
    const result = await loadResume(
      {
        data: 'compressed',
        url: 'https://example.com/r.json',
        user: 'alice',
        mode: 'read',
        branch: 'master',
      },
      {
        defaultResume: fallback,
        fetchFn,
        storage: memoryStorage(),
        decompress: async () =>
          JSON.stringify({ profile: { name: '分享' } }),
      }
    );
    expect(result.config.profile?.name).toBe('分享');
    expect(result.source).toBe('data');
    expect(fetchFn).not.toHaveBeenCalled();
  });

  it('uses url before GitHub user', async () => {
    const fetchFn = vi.fn(async (input: RequestInfo | URL) => {
      const href = String(input);
      if (href.includes('example.com')) {
        return new Response(JSON.stringify({ profile: { name: '远程URL' } }));
      }
      return new Response('no', { status: 404 });
    });
    const result = await loadResume(
      {
        url: 'https://example.com/r.json',
        user: 'alice',
        mode: 'read',
        branch: 'master',
      },
      { defaultResume: fallback, fetchFn, storage: memoryStorage() }
    );
    expect(result.config.profile?.name).toBe('远程URL');
    expect(result.source).toBe('url');
  });

  it('in edit mode uses localStorage before GitHub', async () => {
    const fetchFn = vi.fn();
    const storage = memoryStorage({
      'aliceresume-config': JSON.stringify({ profile: { name: '本地' } }),
    });
    const result = await loadResume(
      { user: 'alice', mode: 'edit', branch: 'master' },
      { defaultResume: fallback, fetchFn, storage }
    );
    expect(result.config.profile?.name).toBe('本地');
    expect(result.source).toBe('local');
    expect(fetchFn).not.toHaveBeenCalled();
  });

  it('in read mode fetches GitHub and skips localStorage', async () => {
    const fetchFn = vi.fn(async () => {
      return new Response(JSON.stringify({ profile: { name: '仓库' } }));
    });
    const storage = memoryStorage({
      'aliceresume-config': JSON.stringify({ profile: { name: '本地' } }),
    });
    const result = await loadResume(
      { user: 'alice', mode: 'read', branch: 'master' },
      { defaultResume: fallback, fetchFn, storage }
    );
    expect(result.config.profile?.name).toBe('仓库');
    expect(result.source).toBe('user');
    expect(fetchFn).toHaveBeenCalled();
  });

  it('falls back to default resume', async () => {
    const result = await loadResume(
      { mode: 'edit', branch: 'master' },
      {
        defaultResume: fallback,
        fetchFn: vi.fn(),
        storage: memoryStorage(),
      }
    );
    expect(result.config.profile?.name).toBe('默认');
    expect(result.source).toBe('default');
  });

  it('throws on read-mode GitHub failure so UI can offer edit', async () => {
    await expect(
      loadResume(
        { user: 'ghost', mode: 'read', branch: 'master' },
        {
          defaultResume: fallback,
          fetchFn: async () => new Response('no', { status: 404 }),
          storage: memoryStorage(),
        }
      )
    ).rejects.toThrow(/获取简历信息失败/);
  });
});
