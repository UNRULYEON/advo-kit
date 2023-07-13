import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import useMe from "@/api/useMe";

type AuthGuardProps = {
  children: ReactNode;
};

const AuthGuard = ({ children }: AuthGuardProps) => {
  const { me, isLoading, isError } = useMe();

  if (isLoading) return <div>loading...</div>;
  if (isError) return <Navigate to="/admin/login" />;
  if (me) return <Layout>{children}</Layout>;

  return <>Oi! You're not supposed to see this! 🐒</>;
};

export default AuthGuard;
