import jsonUrl from 'json-url';

const codec = jsonUrl('lzma');

export async function compressShare(payload: string): Promise<string> {
  return codec.compress(payload);
}

export async function decompressShare(data: string): Promise<string> {
  return codec.decompress(data);
}

export async function buildShareUrl(payload: string): Promise<string> {
  const compressed = await compressShare(payload);
  const url = new URL(window.location.href);
  url.searchParams.set('data', compressed);
  url.searchParams.delete('lang');
  url.searchParams.delete('template');
  return url.toString();
}
