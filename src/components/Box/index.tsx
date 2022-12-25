import Rectangle from "@components/Rectangle";
import { motion, useAnimationControls, Variants } from "framer-motion";
import { FC } from "react";
import "./Box.css";

const Box: FC = () => {
  const thickness = 10;
  const width = 200;
  const height = 300;
  const lidControls = useAnimationControls();
  const lidVariants: Variants = {
    closed: {
      rotateX: -150,
    },
    open: {
      transition: {
        duration: 0.5,
        ease: "backOut",
      },
    },
  };

  return (
    <div className="scene flex items-center justify-center relative">
      {/* Front */}
      <Rectangle
        width={width}
        height={height}
        depth={thickness}
        style={{
          transform: `rotateY(0deg) translateZ(${width / 2}px)`,
        }}
      />
      {/* Right */}
      <Rectangle
        width={width}
        height={height}
        depth={thickness}
        style={{
          transform: `rotateY(90deg) translateZ(${width / 2}px)`,
        }}
      />
      {/* Back */}
      <Rectangle
        width={width}
        height={height}
        depth={thickness}
        style={{
          transform: `rotateY(180deg) translateZ(${width / 2}px)`,
        }}
      />
      {/* Left */}
      <Rectangle
        width={width}
        height={height}
        depth={thickness}
        style={{
          transform: `rotateY(270deg) translateZ(${width / 2}px)`,
        }}
      />
      {/* Top */}
      <Rectangle
        width={width}
        height={height}
        depth={thickness}
        style={{
          transform: `rotateX(0deg) translateY(-${200}px) translateZ(${thickness}px)`,
          transformStyle: "preserve-3d",
          transformOrigin: "top center",
        }}
      />
    </div>
  );
};

export default Box;
