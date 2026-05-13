'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/journey/api/entries')
      .then((r) => r.json())
      .then(setEntries)
      .finally(() => setLoading(false));
  }, []);

  const deleteEntry = async (id) => {
    await fetch(`/journey/api/entries/${id}`, { method: 'DELETE' });
    setEntries(entries.filter((e) => e.id !== id));
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[var(--paper)] px-5 py-6 text-[var(--ink)] sm:px-8">
        <section className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-5xl flex-col justify-center">
          <div className="mb-10 h-24 w-full max-w-xl animate-pulse rounded-[2px] bg-[var(--paper-muted)]" />
          <div className="grid gap-4 md:grid-cols-[0.95fr_1.05fr]">
            <div className="h-40 animate-pulse rounded-[2px] border border-[var(--line)] bg-white/60" />
            <div className="space-y-3">
              {[0, 1, 2].map((item) => (
                <div
                  key={item}
                  className="h-28 animate-pulse rounded-[2px] border border-[var(--line)] bg-white/70"
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (entries.length === 0) {
    return (
      <main className="min-h-screen bg-[var(--paper)] px-5 py-6 text-[var(--ink)] sm:px-8">
        <section className="mx-auto grid min-h-[calc(100vh-3rem)] w-full max-w-5xl content-center gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
              Private notes
            </p>
            <h1 className="max-w-md font-serif text-5xl font-semibold leading-[1.03] text-[var(--ink)] sm:text-6xl">
              一段话日记 · 合契
            </h1>
            <p className="mt-6 max-w-sm text-base leading-8 text-[var(--muted)]">
              不用整理成文章，也不用把一天讲完整。留下一段就好。
            </p>
          </div>

          <div className="border-y border-[var(--ink)] py-7">
            <div className="mb-10 flex items-start justify-between gap-6">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                  Today
                </p>
                <p className="mt-2 text-2xl font-semibold text-[var(--ink)]">
                  还没有记录
                </p>
              </div>
              <span className="rounded-full border border-[var(--line-strong)] px-3 py-1 font-mono text-xs text-[var(--muted)]">
                0 notes
              </span>
            </div>
            <p className="max-w-md text-sm leading-7 text-[var(--muted)]">
              第一条记录会出现在这里。页面会按时间保留每段话，适合存放那些还没准备好成为长文的念头。
            </p>
            <Link
              href="/write"
              className="mt-8 inline-flex h-11 items-center justify-center rounded-[2px] bg-[var(--ink)] px-5 text-sm font-medium text-[var(--paper)] transition-colors hover:bg-[var(--accent)]"
            >
              开始写
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--paper)] px-5 py-6 text-[var(--ink)] sm:px-8">
      <div className="mx-auto w-full max-w-5xl">
        <header className="sticky top-0 z-10 -mx-5 border-b border-[var(--line)] bg-[var(--paper)]/92 px-5 py-4 backdrop-blur sm:-mx-8 sm:px-8">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                Project Journey
              </p>
              <h1 className="mt-1 font-serif text-2xl font-semibold text-[var(--ink)]">
                一段话日记 · 合契
              </h1>
            </div>
            <Link
              href="/write"
              className="inline-flex h-10 shrink-0 items-center justify-center rounded-[2px] bg-[var(--ink)] px-4 text-sm font-medium text-[var(--paper)] transition-colors hover:bg-[var(--accent)]"
            >
              写一段
            </Link>
          </div>
        </header>

        <section className="grid gap-8 py-8 md:grid-cols-[280px_1fr] md:py-12">
          <aside className="md:sticky md:top-28 md:h-fit">
            <div className="border-y border-[var(--ink)] py-6">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
                Archive
              </p>
              <p className="mt-4 font-serif text-5xl font-semibold leading-none text-[var(--ink)]">
                {entries.length}
              </p>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                {entries.length > 1 ? '段记录安静地待在这里。' : '段记录安静地待在这里。'}
              </p>
            </div>
          </aside>

          <div className="space-y-4">
            {entries.map((entry) => (
              <article
                key={entry.id}
                className="group border border-[var(--line)] bg-white/70 px-5 py-5 shadow-[0_1px_0_rgba(26,26,26,0.04)] transition-colors hover:border-[var(--line-strong)] sm:px-6"
              >
                <p className="text-[15px] leading-8 text-[var(--ink)] whitespace-pre-wrap sm:text-base">
                  {entry.content}
                </p>
                <div className="mt-5 flex items-center justify-between gap-4 border-t border-[var(--line)] pt-4">
                  <time className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--muted)]">
                    {new Date(entry.createdAt).toLocaleString('zh-CN', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </time>
                  <button
                    type="button"
                    onClick={() => deleteEntry(entry.id)}
                    className="rounded-[2px] px-2 py-1 text-xs font-medium text-[var(--muted)] transition-colors hover:bg-red-50 hover:text-red-600"
                  >
                    删除
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
