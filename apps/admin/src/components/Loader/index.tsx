import { FC } from "react";
import { motion } from "framer-motion";

const Loader: FC = () => {
  const duration = 0.8;

  return (
    <motion.div
      animate={{
        rotate: 360,
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "linear",
      }}
      className="w-10 h-10 flex border-solid border-[#8484842b] border-8 rounded-full relative"
    >
      <motion.div
        animate={{
          backgroundColor: "#FF6B00",
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatDelay: duration - 0.25,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        className="w-2 h-2 bg-coolblue absolute -top-2 left-2 rounded-full"
      />
    </motion.div>
  );
};

export default Loader;
