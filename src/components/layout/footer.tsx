import { Github } from 'lucide-react';

type Props = {
};

export function Footer(_: Props) {
  return (
    <footer className="no-print fixed right-0 bottom-0 left-0 pt-6">
      <div className="relative flex items-center justify-center bg-[rgb(39,63,117)] px-3 py-3 text-white/85">
        <span>
          隐私优先：简历内容只在你的浏览器中处理
        </span>
        <a
          href="https://github.com/fallingduck/myresume"
          target="_blank"
          rel="noreferrer"
          className="absolute right-2 flex items-center text-xs text-white/85 hover:text-white"
        >
          <Github className="mr-1 size-3.5" />
          项目代码
        </a>
      </div>
    </footer>
  );
}
