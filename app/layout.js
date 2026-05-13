import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>一段话日记 </title>
      </head>
      <body className="bg-gray-50 min-h-screen">
        {children}
        <footer className="mb-2 px-5 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
          Build By 浚涵 · 凌一 · 佳棋
        </footer>
      </body>
    </html>
  );
}
