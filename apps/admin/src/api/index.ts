export const fetcher = (...args: any[]) =>
  fetch(args as any).then((res) => res.json());
