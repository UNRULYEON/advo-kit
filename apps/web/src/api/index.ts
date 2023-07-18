export const fetcher = async (...args: unknown[]) => {
  const url = import.meta.env.DEV
    ? // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `https://localhost:3000${args[0]}`
    : (args[0] as string);

  const res = await fetch(url);

  if (res.ok) return res.json();

  if (res.status === 401) return Promise.reject(new Error("Unauthorized"));

  throw new Error("Unknown error");
};
