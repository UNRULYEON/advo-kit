export const fetcher = async (...args: any[]) => {
  const url = import.meta.env.DEV
    ? `https://localhost:3000${args[0]}`
    : args[0];

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

  return await fetch(finalUrl, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  }).then((r) => r.json());
}

export async function patchFetcher<
  P extends { id: string; payload: Record<string, unknown> },
  R
>(url: string, { arg }: Readonly<{ arg: P }>): Promise<R> {
  const finalUrl = import.meta.env.DEV ? `https://localhost:3000${url}` : url;

  return await fetch(`${finalUrl}/${arg.id}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg.payload),
  }).then((r) => r.json());
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
