'use client';

export default function Error({
  error
}: {
  error: Error & { digest?: string };
}) {
  return (
    <div className="flex flex-col gap-4 p-6">
      <h2 className="text-xl font-light">Something went wrong...</h2>
      <p className="text-sm text-text-terciary">{error.message}</p>
    </div>
  );
}
