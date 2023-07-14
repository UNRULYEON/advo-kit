import useSWR from "swr";

const useMe = () => {
  const { data, error, isLoading } = useSWR<Record<string, unknown>, null>(
    "/api/auth/me",
    {
      revalidateOnFocus: false,
    }
  );

  return {
    me: data,
    isLoading,
    isError: error,
  };
};

export default useMe;
