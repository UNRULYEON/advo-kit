import useDecks from "@/api/useDecks";
import { FC, ReactNode } from "react";

type InitComponentProps = {
  children: ReactNode;
};

const InitComponent: FC<InitComponentProps> = ({ children }) => {
  const { isLoading, isError } = useDecks();

  if (isLoading) return <>loading...</>;
  if (isError) return <>error!</>;

  return <>{children}</>;
};

export default InitComponent;
