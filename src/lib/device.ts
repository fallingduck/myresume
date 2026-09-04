export function getDevice(): 'mobile' | 'pc' {
  if (typeof window === 'undefined') return 'pc';
  return /Android|webOS|iPhone|iPod|BlackBerry/i.test(window.navigator.userAgent)
    ? 'mobile'
    : 'pc';
}
