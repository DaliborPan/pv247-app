export type LoaderResult<T extends (...args: any[]) => Promise<any>> = Awaited<
  ReturnType<T>
>;
