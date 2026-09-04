import type { ResumeConfig, ThemeConfig } from '@/types/resume';
import { normalizeLoadedData } from './normalize';
import type { ResumeQuery } from './query';

export type LoadSource = 'data' | 'default';

export type LoadResumeResult = {
  config: ResumeConfig;
  theme?: ThemeConfig;
  source: LoadSource;
};

export type LoadResumeOptions = {
  defaultResume: ResumeConfig;
  decompress?: (data: string) => Promise<string>;
};

export async function loadResume(
  query: ResumeQuery,
  options: LoadResumeOptions
): Promise<LoadResumeResult> {
  const { defaultResume, decompress } = options;

  if (query.data) {
    if (!decompress) {
      throw new Error('获取简历信息失败');
    }
    const json = await decompress(query.data);
    const { config, theme } = normalizeLoadedData(JSON.parse(json));
    return { config, theme, source: 'data' };
  }

  return { config: defaultResume, source: 'default' };
}
