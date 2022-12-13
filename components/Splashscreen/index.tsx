const getKits = async (): Promise<any> => {
  const res = await fetch("http://localhost:3000/api/kits");

  if (!res.ok) throw new Error("Failed to fetch kits");

  const data = await res.json();

  return data;
};

const Splashscreen = async ({ children }: { children: React.ReactNode }) => {
  const kits = await getKits();

  return <>{children}</>;
};

export default Splashscreen;
