declare module 'json-url' {
  export default function jsonUrl(codec: string): {
    compress: (data: string) => Promise<string>;
    decompress: (data: string) => Promise<string>;
  };
}
