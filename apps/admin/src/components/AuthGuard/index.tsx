import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useSWR from "swr";

type AuthGuardProps = {
  children: ReactNode;
};

const AuthGuard = ({ children }: AuthGuardProps) => {
  const { data, error, isLoading } = useSWR("/api/auth/me", {
    revalidateOnFocus: false,
  });

  if (isLoading) return <div>loading...</div>;
  if (error) return <Navigate to="/admin/login" />;

  return (
    <>
      {children} {JSON.stringify(data, null, 2)}
    </>
  );
};

export default AuthGuard;
