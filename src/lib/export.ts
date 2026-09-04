export function exportDataToLocal(data: string, fileName: string) {
  const a = document.createElement('a');
  a.download = fileName;
  a.href = URL.createObjectURL(
    new Blob([data], { type: 'application/json' })
  );
  a.click();
  URL.revokeObjectURL(a.href);
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fall through
  }
  const dummy = document.createElement('textarea');
  dummy.value = text;
  document.body.appendChild(dummy);
  dummy.select();
  const ok = document.execCommand('copy');
  document.body.removeChild(dummy);
  return ok;
}
