export type ResumeMode = 'edit' | 'read';

export type ResumeQuery = {
  mode: ResumeMode;
  data?: string;
};

export function parseQuery(search: string): ResumeQuery {
  const params = new URLSearchParams(
    search.startsWith('?') ? search.slice(1) : search
  );
  const mode = params.get('mode');
  const data = params.get('data') ?? undefined;
  return {
    mode:
      mode === 'read' ? 'read' : data && !mode ? 'read' : 'edit',
    data,
  };
}

export function getWindowQuery(): ResumeQuery {
  if (typeof window === 'undefined') {
    return { mode: 'edit' };
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
  window.history.replaceState({}, '', url.toString());
}
