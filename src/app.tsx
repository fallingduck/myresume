import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { ActionBar } from '@/components/editor/action-bar';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { Template3 } from '@/components/Resume/Template3';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/sonner';
import { DEFAULT_RESUME } from '@/data/default-resume';
import { getDevice } from '@/lib/device';
import { getWindowQuery, setQueryParam } from '@/lib/query';
import { loadResume } from '@/lib/load-resume';
import { normalizeLoadedData } from '@/lib/normalize';
import { decompressShare } from '@/lib/share';
import {
  DEFAULT_THEME,
  type ResumeConfig,
  type ThemeConfig,
} from '@/types/resume';

export function App() {
  const query = useMemo(() => getWindowQuery(), []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [config, setConfig] = useState<ResumeConfig>();
  const [theme, setTheme] = useState<ThemeConfig>(DEFAULT_THEME);
  const [mode, setMode] = useState(query.mode);

  useEffect(() => {
    let cancelled = false;
    loadResume(query, {
      defaultResume: DEFAULT_RESUME,
      decompress: decompressShare,
    })
      .then(result => {
        if (cancelled) return;
        setConfig(result.config);
        if (result.theme) setTheme(result.theme);
      })
      .catch(() => {
        if (cancelled) return;
        setError('获取简历信息失败');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [query]);

  useEffect(() => {
    if (getDevice() === 'mobile') {
      toast('移动端只提供查看，在线制作请前往 PC 端');
    }
  }, []);

  const onConfigChange = useCallback((next: ResumeConfig) => {
    setConfig(next);
  }, []);

  const onImport = useCallback((raw: unknown) => {
    const { config: nextConfig, theme: nextTheme } = normalizeLoadedData(raw);
    setConfig(nextConfig);
    if (nextTheme) setTheme(nextTheme);
  }, []);

  const onModeChange = useCallback((nextMode: typeof query.mode) => {
    setMode(nextMode);
    setQueryParam('mode', nextMode);
  }, []);

  const isEdit = mode === 'edit' && getDevice() !== 'mobile';

  return (
    <div className="min-h-screen bg-[#f5f5f5] pb-20">
      <Toaster />
      <Header mode={mode} onModeChange={onModeChange} />
      {isEdit && (
        <div className="no-print bg-amber-50 px-4 py-2 text-xs text-amber-900">
          内容只在当前页面中处理，不会上传到服务器。刷新页面前请导出 JSON。
        </div>
      )}
      <main className="page flex justify-center p-3 max-md:flex-col-reverse max-md:p-0 print:p-0">
        {loading && (
          <div className="py-20 text-sm text-muted-foreground">加载中…</div>
        )}
        {error && (
          <div className="flex max-w-md flex-col items-start gap-3 p-6">
            <p>{error}。请重新导入 JSON 文件或检查分享链接。</p>
            <Button onClick={() => onModeChange('edit')}>
              进入在线编辑
            </Button>
          </div>
        )}
        {config && !loading && !error && (
          <>
            <Template3 value={config} theme={theme} />
            {isEdit && (
              <ActionBar
                config={config}
                theme={theme}
                onConfigChange={onConfigChange}
                onThemeChange={setTheme}
                onImport={onImport}
              />
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
