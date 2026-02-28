"use client";
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
  return (
    <html>
      <body>
        <main className="mx-auto max-w-3xl px-4 py-20">
          <h1 className="text-2xl font-semibold">Something went wrong</h1>
          <pre className="mt-4 whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm">{error.message}</pre>
          <button onClick={() => reset()} className="mt-6 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white">
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
