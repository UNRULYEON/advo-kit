"use client";

import { FC, ReactNode } from "react";
import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";

type AuthGuardProps = {
  children: ReactNode;
};

export const AuthGuard: FC<AuthGuardProps> = ({ children }) => {
  const pathname = usePathname();
  const { status } = useSession();

  if (status === "unauthenticated" && !pathname.includes("login"))
    return redirect("/api/auth/signin");

  if (status === "loading") return <>Loading...</>;

  return <>{children}</>;
};
