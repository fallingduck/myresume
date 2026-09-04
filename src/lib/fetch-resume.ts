export function githubResumeUrl(user: string, branch = 'master'): string {
  return `https://raw.githubusercontent.com/${user}/${user}/${branch}/resume.json`;
}

export async function fetchResumeJson(
  url: string,
  fetchFn: typeof fetch = fetch
): Promise<unknown> {
  const res = await fetchFn(url);
  if (!res.ok) {
    throw new Error('获取简历信息失败');
  }
  return res.json();
}
