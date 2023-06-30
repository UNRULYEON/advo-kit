"use client";

import { FC, ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import ThemeRegistry from "@/components/ThemeRegistry";

type ProviderProps = {
  children: ReactNode;
};

export const Providers: FC<ProviderProps> = ({ children }) => {
  return (
    <SessionProvider>
      <ThemeRegistry>{children}</ThemeRegistry>
    </SessionProvider>
  );
};
