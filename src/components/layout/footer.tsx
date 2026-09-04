import { Github } from 'lucide-react';

type Props = {
  user?: string;
};

export function Footer({ user }: Props) {
  return (
    <footer className="no-print fixed right-0 bottom-0 left-0 pt-6">
      <div className="relative flex items-center justify-center bg-[rgb(39,63,117)] px-3 py-3 text-white/85">
        <span>
          Made with ❤️
          {user && (
            <>
              {' '}
              by{' '}
              <button
                type="button"
                className="cursor-pointer"
                onClick={() => window.open(`https://github.com/${user}`)}
              >
                {user}
              </button>
            </>
          )}
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
