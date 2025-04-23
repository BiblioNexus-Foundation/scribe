import * as React from "@theia/core/shared/react";

export default function ProjectIntroLayout({
  question,
  children,
}: {
  question: string;
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto w-[45%] pt-14">
      <p className="text-center text-5xl font-bold">
        <span className="text-zinc-700 dark:text-zinc-50">Welcome to </span>
        <span className="text-cyan-500">Scribe 3.0</span>
      </p>
      <p className="mt-5 text-center text-xl font-normal leading-6 tracking-wide text-cyan-300">
        Scripture editing made simple
      </p>
      <div className="flex w-full flex-col items-center justify-center space-y-8">
        <p className="mt-20 text-center text-sm font-normal leading-4 tracking-wide text-zinc-600 dark:text-zinc-50">
          {question}
        </p>
        <>{children}</>
      </div>
    </main>
  );
}
