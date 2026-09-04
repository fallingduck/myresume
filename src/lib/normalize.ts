import {
  DEFAULT_THEME,
  type ResumeConfig,
  type ThemeConfig,
} from '@/types/resume';

export function normalizeLoadedData(raw: unknown): {
  config: ResumeConfig;
  theme?: ThemeConfig;
} {
  if (!raw || typeof raw !== 'object') {
    return { config: {} };
  }
  const obj = raw as Record<string, unknown>;
  const themeRaw = obj.theme;
  let theme: ThemeConfig | undefined;
  if (themeRaw && typeof themeRaw === 'object') {
    const t = themeRaw as { color?: string; tagColor?: string };
    if (t.color) {
      theme = {
        color: t.color,
        tagColor: t.tagColor ?? DEFAULT_THEME.tagColor,
      };
    }
  }
  const rest = { ...obj };
  delete rest.theme;
  delete rest.locales;
  return { config: rest as ResumeConfig, theme };
}

export function getExportPayload(
  config: ResumeConfig,
  theme: ThemeConfig
): string {
  const rest = { ...config };
  delete rest.locales;
  return JSON.stringify({ ...rest, theme }, null, 2);
}
