export type ResumeMode = 'edit' | 'read';

export type ResumeQuery = {
  user?: string;
  branch: string;
  mode: ResumeMode;
  data?: string;
  url?: string;
};

export function parseQuery(search: string): ResumeQuery {
  const params = new URLSearchParams(
    search.startsWith('?') ? search.slice(1) : search
  );
  const mode = params.get('mode');
  return {
    user: params.get('user') ?? undefined,
    branch: params.get('branch') ?? 'master',
    mode: mode === 'edit' ? 'edit' : 'read',
    data: params.get('data') ?? undefined,
    url: params.get('url') ?? undefined,
  };
}

export function getWindowQuery(): ResumeQuery {
  if (typeof window === 'undefined') {
    return { branch: 'master', mode: 'read' };
  }
  return parseQuery(window.location.search);
}

export function setQueryParam(key: string, value: string | undefined) {
  const url = new URL(window.location.href);
  if (value === undefined || value === '') {
    url.searchParams.delete(key);
  } else {
    url.searchParams.set(key, value);
  }
  url.searchParams.delete('lang');
  url.searchParams.delete('template');
  window.location.href = url.toString();
}
