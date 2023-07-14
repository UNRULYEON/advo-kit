export const fetcher = async (...args: unknown[]) => {
  const url = import.meta.env.DEV
    ? // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `https://localhost:3000${args[0]}`
    : (args[0] as string);

  const res = await fetch(url, {
    ...args,
    credentials: "include",
  });

  if (res.ok) return res.json();

  if (res.status === 401) return Promise.reject(new Error("Unauthorized"));

  throw new Error("Unknown error");
};

export async function postFetcher<P, R>(
  url: string,
  { arg }: Readonly<{ arg: P }>
): Promise<R> {
  const finalUrl = import.meta.env.DEV ? `https://localhost:3000${url}` : url;

  return fetch(finalUrl, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  }).then((r) => r.json()) as Promise<R>;
}

export async function patchFetcher<
  P extends { id: string; payload: Record<string, unknown> },
  R
>(url: string, { arg }: Readonly<{ arg: P }>): Promise<R> {
  const finalUrl = import.meta.env.DEV ? `https://localhost:3000${url}` : url;

  return fetch(`${finalUrl}/${arg.id}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg.payload),
  }).then((r) => r.json()) as Promise<R>;
}

export async function deleteFetcher<P extends { id: string }>(
  url: string,
  { arg }: Readonly<{ arg: P }>
): Promise<void> {
  const finalUrl = import.meta.env.DEV ? `https://localhost:3000${url}` : url;

  await fetch(`${finalUrl}/${arg.id}`, {
    method: "DELETE",
    credentials: "include",
  });
}
