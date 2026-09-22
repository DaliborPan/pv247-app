import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const NotFound = () => (
  <main className="grid grow place-items-center px-4 py-12">
    <div className="max-w-md text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
        Chyba 404
      </p>

      <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
        Stránka neexistuje.
      </h1>

      <p className="mt-4 text-text-secondary">
        Požadovanou stránku se nepodařilo najít.
      </p>

      <Link
        href="/"
        className="mt-8 inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-base font-medium text-white transition-colors hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        <ArrowLeft className="mr-2 size-5" aria-hidden="true" />
        Zpět na domovskou stránku
      </Link>
    </div>
  </main>
);

export default NotFound;
