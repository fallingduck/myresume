import type { ResumeConfig } from '@/types/resume';

export function storageKey(user?: string): string {
  return `${user ?? ''}resume-config`;
}

export function loadFromStorage(
  user: string | undefined,
  storage: Storage
): ResumeConfig | null {
  const raw = storage.getItem(storageKey(user));
  if (!raw) return null;
  try {
    return JSON.parse(raw) as ResumeConfig;
  } catch {
    return null;
  }
}

export function saveToStorage(
  user: string | undefined,
  config: ResumeConfig,
  storage: Storage
): void {
  storage.setItem(storageKey(user), JSON.stringify(config));
}
