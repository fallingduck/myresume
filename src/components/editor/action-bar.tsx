import { useRef } from 'react';
import { toast } from 'sonner';
import { EditorSheet } from '@/components/editor/editor-sheet';
import { Button } from '@/components/ui/button';
import { copyToClipboard, exportDataToLocal } from '@/lib/export';
import { getExportPayload } from '@/lib/normalize';
import { buildShareUrl } from '@/lib/share';
import type { ResumeConfig, ThemeConfig } from '@/types/resume';

type Props = {
  config: ResumeConfig;
  theme: ThemeConfig;
  user?: string;
  onConfigChange: (next: ResumeConfig) => void;
  onThemeChange: (next: ThemeConfig) => void;
  onImport: (raw: unknown) => void;
};

export function ActionBar({
  config,
  theme,
  user,
  onConfigChange,
  onThemeChange,
  onImport,
}: Props) {
  const fileRef = useRef<HTMLInputElement>(null);

  const payload = () => getExportPayload(config, theme);

  const onCopy = async () => {
    const ok = await copyToClipboard(payload());
    toast(ok ? '已复制配置' : '复制失败');
  };

  const onSave = () => {
    exportDataToLocal(payload(), `${user || 'resume'}'s resume info`);
    toast('已下载配置');
  };

  const onShare = async () => {
    const url = await buildShareUrl(payload());
    const ok = await copyToClipboard(url);
    toast(ok ? '分享链接已复制' : '复制失败');
  };

  return (
    <div className="no-print ml-3 flex w-[106px] shrink-0 flex-col gap-2 max-md:ml-0 max-md:w-full max-md:flex-row max-md:flex-wrap">
      <EditorSheet
        config={config}
        theme={theme}
        onConfigChange={onConfigChange}
        onThemeChange={onThemeChange}
      />
      <Button className="w-[106px]" onClick={onCopy}>
        复制配置
      </Button>
      <Button className="w-[106px]" onClick={onSave}>
        保存简历
      </Button>
      <Button
        variant="outline"
        className="w-[106px]"
        onClick={() => fileRef.current?.click()}
      >
        导入配置
      </Button>
      <input
        ref={fileRef}
        type="file"
        accept=".json"
        className="hidden"
        onChange={e => {
          const file = e.target.files?.[0];
          e.target.value = '';
          if (!file) return;
          const reader = new FileReader();
          reader.onload = () => {
            try {
              onImport(JSON.parse(String(reader.result)));
              toast('上传配置已应用');
            } catch {
              toast.error('上传文件有误，请重新上传');
            }
          };
          reader.readAsText(file);
        }}
      />
      <Button className="w-[106px]" onClick={() => window.print()}>
        下载 PDF
      </Button>
      <Button className="w-[106px]" onClick={onShare}>
        分享
      </Button>
    </div>
  );
}
