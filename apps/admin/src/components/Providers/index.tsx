"use client";

import { SessionProvider } from "next-auth/react";
import { FC, ReactNode } from "react";

type ProviderProps = {
  children: ReactNode;
};

export const Providers: FC<ProviderProps> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
