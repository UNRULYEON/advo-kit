import { FC } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const Loader: FC = () => {
  const duration = 2;

  return (
    <Container
      animate={{
        rotate: 360,
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <Accent
        animate={{
          backgroundColor: "#FF6B00",
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatDelay: duration - 0.2,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />
    </Container>
  );
};

const Container = styled(motion.div)`
  display: flex;
  position: relative;
  width: 40px;
  height: 40px;

  border: 8px solid #eee;
  border-radius: 50%;
`;

const Accent = styled(motion.div)`
  position: absolute;
  width: 8px;
  height: 8px;
  top: -1px;
  left: -1px;

  background-color: #0090e3;
  border-radius: 50%;
`;

export default Loader;
