import { getDevice } from '@/lib/device';
import type { ResumeMode } from '@/lib/query';

type Props = {
  mode: ResumeMode;
  onModeChange: (mode: ResumeMode) => void;
};

export function Header({ mode, onModeChange }: Props) {
  const isMobile = getDevice() === 'mobile';

  return (
    <header className="no-print flex items-center justify-between bg-[rgb(39,63,117)] px-3 py-2 text-xs text-white/85">
      <span>在线简历生成器</span>
      <span className="flex items-center gap-3">
        {!isMobile && mode !== 'edit' && (
          <button type="button" onClick={() => onModeChange('edit')}>
            编辑
          </button>
        )}
        {mode === 'edit' && (
          <button type="button" onClick={() => onModeChange('read')}>
            预览
          </button>
        )}
        {mode === 'read' && (
          <button type="button" onClick={() => window.print()}>
            下载 PDF
          </button>
        )}
      </span>
    </header>
  );
}
