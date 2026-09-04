import type { ResumeConfig, ThemeConfig } from '@/types/resume';
import { fetchResumeJson, githubResumeUrl } from './fetch-resume';
import { normalizeLoadedData } from './normalize';
import type { ResumeQuery } from './query';
import { loadFromStorage } from './storage';

export type LoadSource = 'data' | 'url' | 'user' | 'local' | 'default';

export type LoadResumeResult = {
  config: ResumeConfig;
  theme?: ThemeConfig;
  source: LoadSource;
};

export type LoadResumeOptions = {
  defaultResume: ResumeConfig;
  fetchFn: typeof fetch;
  storage: Storage;
  decompress?: (data: string) => Promise<string>;
};

export async function loadResume(
  query: ResumeQuery,
  options: LoadResumeOptions
): Promise<LoadResumeResult> {
  const { defaultResume, fetchFn, storage, decompress } = options;

  if (query.data) {
    if (!decompress) {
      throw new Error('获取简历信息失败');
    }
    const json = await decompress(query.data);
    const { config, theme } = normalizeLoadedData(JSON.parse(json));
    return { config, theme, source: 'data' };
  }

  if (query.url) {
    const raw = await fetchResumeJson(query.url, fetchFn);
    const { config, theme } = normalizeLoadedData(raw);
    return { config, theme, source: 'url' };
  }

  if (query.mode === 'edit') {
    const local = loadFromStorage(query.user, storage);
    if (local) {
      const { config, theme } = normalizeLoadedData(local);
      return { config, theme, source: 'local' };
    }
    if (query.user) {
      try {
        const raw = await fetchResumeJson(
          githubResumeUrl(query.user, query.branch),
          fetchFn
        );
        const { config, theme } = normalizeLoadedData(raw);
        return { config, theme, source: 'user' };
      } catch {
        return { config: defaultResume, source: 'default' };
      }
    }
    return { config: defaultResume, source: 'default' };
  }

  if (query.user) {
    const raw = await fetchResumeJson(
      githubResumeUrl(query.user, query.branch),
      fetchFn
    );
    const { config, theme } = normalizeLoadedData(raw);
    return { config, theme, source: 'user' };
  }

  return { config: defaultResume, source: 'default' };
}
