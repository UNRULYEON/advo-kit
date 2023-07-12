import useSWR from "swr";

const useMe = () => {
  const { data, error, isLoading } = useSWR("/api/auth/me", {
    revalidateOnFocus: false,
  });

  return {
    me: data,
    isLoading,
    isError: error,
  };
};

export default useMe;
