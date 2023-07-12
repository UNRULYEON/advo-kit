export const fetcher = async (...args: any[]) => {
  const url = import.meta.env.DEV
    ? `https://localhost:3000${args[0]}`
    : args[0];

  const res = await fetch(url, {
    credentials: "include",
  });

  if (res.ok) return res.json();

  if (res.status === 401) return Promise.reject(new Error("Unauthorized"));

  throw new Error("Unknown error");
};
