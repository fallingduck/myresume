import { getDevice } from '@/lib/device';
import { setQueryParam, type ResumeMode } from '@/lib/query';

type Props = {
  mode: ResumeMode;
  user?: string;
};

export function Header({ mode, user }: Props) {
  const isMobile = getDevice() === 'mobile';

  return (
    <header className="no-print flex items-center justify-between bg-[rgb(39,63,117)] px-3 py-2 text-xs text-white/85">
      <span>在线简历生成器</span>
      <span className="flex items-center gap-3">
        {!isMobile && mode !== 'edit' && (
          <button type="button" onClick={() => setQueryParam('mode', 'edit')}>
            编辑
          </button>
        )}
        {mode === 'edit' && user && (
          <button type="button" onClick={() => setQueryParam('mode', 'read')}>
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
