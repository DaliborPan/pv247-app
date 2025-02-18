import Link from 'next/link';
import { Book, Github } from 'lucide-react';

import { Button } from '@/components/base/button';
import { SignIn } from '@/components/sign-in';

const Page = () => (
  <main className="grid grow place-items-center">
    <div className="flex flex-col items-center gap-y-4 lg:gap-y-8">
      <h1 className="text-balance text-center text-3xl font-medium leading-9 md:text-4xl lg:text-6xl lg:leading-none">
        Transform Ideas into Reality: Learn{' '}
        <span className="text-primary">Web Development</span>
      </h1>

      <p className="max-w-lg text-balance px-10 text-center text-sm text-slate-500 md:px-0 lg:text-lg">
        Dive into the future of web development with React and Next.js. Begin
        your journey with a GitHub sign-up.
      </p>

      <div className="mt-2 flex flex-col-reverse items-center gap-2 md:flex-row lg:mt-0 lg:gap-4">
        <Button
          variant="outline/primary"
          iconLeft={{ icon: <Book /> }}
          className="w-full"
        >
          <Link href="/lectures">Start Learning</Link>
        </Button>

        <SignIn>
          <Button iconLeft={{ icon: <Github /> }}>Sign in with GitHub</Button>
        </SignIn>
      </div>
    </div>
  </main>
);

export default Page;
