"use client";

import { FC, ReactNode } from "react";
import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";
import Loader from "@/components/Loader";

const Container = ({ children }: { children: ReactNode }) => (
  <body className="w-full h-full bg-[#0d1117] text-[#e6edf3]">{children}</body>
);

type AuthGuardProps = {
  children: ReactNode;
};

export const AuthGuard: FC<AuthGuardProps> = ({ children }) => {
  const pathname = usePathname();
  const { status } = useSession();

  if (status === "unauthenticated" && !pathname.includes("login"))
    return redirect("/api/auth/signin");

  if (status === "loading")
    return (
      <Container>
        <div className="w-full h-full flex justify-center items-center">
          <Loader />
        </div>
      </Container>
    );

  return (
    <Container>
      <nav>Hello Navbar!</nav>
      {children}
    </Container>
  );
};
