import { FC, useEffect } from "react";
import Rectangle from "@components/Rectangle";
import { motion, useAnimationControls, Variants } from "framer-motion";
import "./Box.css";

type BoxProps = {
  open: boolean;
  rotate?: boolean;
};

const Box: FC<BoxProps> = ({ open, rotate = false }) => {
  const thickness = 10;
  const width = 150;
  const height = 150;

  const boxControls = useAnimationControls();
  const lidControls = useAnimationControls();
  const lidVariants: Variants = {
    closed: {
      rotateX: 270,
      rotateZ: 180,
      translateY: thickness,
      translateZ: -(width / 2 + thickness),
    },
    open: {
      rotateX: 340,
      transition: {
        duration: 0.5,
        ease: "backOut",
      },
    },
  };

  useEffect(() => {
    if (open) {
      lidControls.start("open");
    } else {
      lidControls.start("closed");
    }
  });

  return (
    <motion.div
      className="scene flex items-center justify-center relative"
      style={{
        transformStyle: "preserve-3d",
      }}
      animate={boxControls}
      onPan={(e, pointInfo) => {
        if (rotate) {
          boxControls.set({
            rotateY: pointInfo.offset.x / 2,
            rotateX: -pointInfo.offset.y / 2,
          });
        }
      }}
    >
      {/* Front */}
      <Rectangle
        width={width}
        height={height}
        depth={thickness}
        style={{
          transform: `rotateY(0deg) translateZ(${width / 2 + thickness}px)`,
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
          transform: `rotateY(180deg) translateZ(${width / 2 + thickness}px)`,
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
        height={height + thickness * 2}
        depth={thickness}
        animate={lidControls}
        variants={lidVariants}
        initial="closed"
        style={{
          transformStyle: "preserve-3d",
          transformOrigin: "top center",
        }}
      />
    </motion.div>
  );
};

export default Box;
