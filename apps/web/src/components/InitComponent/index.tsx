import { FC, ReactNode } from "react";
import useDecks from "@/api/useDecks";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "@/components/Loader";

type InitComponentProps = {
  children: ReactNode;
};

const InitComponent: FC<InitComponentProps> = ({ children }) => {
  const { isLoading, isError } = useDecks();

  if (isError) return <>error!</>;

  return (
    <AnimatePresence>
      {isLoading && (
        <LoadingContainer
          key="loading-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.2 } }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
        >
          <Loader />
        </LoadingContainer>
      )}
      <Main key="main">{children}</Main>
    </AnimatePresence>
  );
};

const LoadingContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.3);
`;

const Main = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export default InitComponent;
