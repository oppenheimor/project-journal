'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Write() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    setLoading(true);
    await fetch('/journey/api/entries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });
    setLoading(false);
    router.push('/');
  };

  return (
    <main className="min-h-screen bg-[var(--paper)] px-5 py-6 text-[var(--ink)] sm:px-8">
      <section className="mx-auto grid min-h-[calc(100vh-3rem)] w-full max-w-5xl content-center gap-8 md:grid-cols-[0.82fr_1.18fr] md:items-start">
        <div className="pt-2 md:pt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
          >
            <span aria-hidden="true">&larr;</span>
            返回日记
          </Link>
          <h1 className="mt-8 max-w-sm font-serif text-5xl font-semibold leading-[1.04] text-[var(--ink)] sm:text-6xl">
            写一段话
          </h1>
          <p className="mt-6 max-w-xs text-sm leading-7 text-[var(--muted)]">
            一段就够。先写下来，剩下的以后再说。
          </p>
        </div>

        <form
          onSubmit={submit}
          className="border-y border-[var(--ink)]  py-6"
        >
          <label
            htmlFor="entry-content"
            className="mb-3 block font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)]"
          >
            Today&apos;s note
          </label>
          <textarea
            id="entry-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="今天发生了什么..."
            className="min-h-64 w-full resize-none rounded-[8px] border border-[var(--line)] bg-[var(--paper)] px-4 py-4 text-base leading-8 text-[var(--ink)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--ink)]"
            rows={8}
          />
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-xs text-[var(--muted)]">
              {content.trim().length} characters
            </p>
            <button
              type="submit"
              disabled={loading || !content.trim()}
              className="inline-flex h-11 items-center justify-center rounded-[2px] bg-[var(--ink)] px-6 text-sm font-medium text-[var(--paper)] transition-colors hover:bg-[var(--accent)] disabled:cursor-not-allowed disabled:bg-[var(--line-strong)]"
            >
              {loading ? '保存中...' : '保存'}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
