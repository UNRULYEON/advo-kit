import { FC, useEffect } from 'react';
import Rectangle from '@components/Rectangle';
import { motion, useAnimationControls, Variants } from 'framer-motion';
import './Box.css';
import hexToRgba from '@utils/hexToRGBA';

type BoxProps = {
  width?: number;
  height?: number;
  thickness?: number;
  open: boolean;
  boxColor?: string;
  buttonColor?: string;
  opacity?: number;
  rotate?: boolean;
};

const Box: FC<BoxProps> = ({
  width = 200,
  height = 200,
  thickness = 20,
  open,
  boxColor,
  buttonColor,
  opacity = 1,
  rotate = false,
}) => {
  const boxControls = useAnimationControls();
  const lidControls = useAnimationControls();
  const lidVariants: Variants = {
    closed: {
      rotateY: 0,
      rotateX: -90,
      rotateZ: 0,
      translateY: -(height / 2) - width / 2 - thickness,
      translateZ: -(width / 2 + thickness),
    },
    open: {
      rotateX: -15,
      transition: {
        duration: 0.5,
        ease: 'backOut',
      },
    },
  };

  useEffect(() => {
    if (open) {
      lidControls.start('open');
    } else {
      lidControls.start('closed');
    }
  });

  const rgba = boxColor && hexToRgba(boxColor);
  const innerShadowBottom = rgba && `rgba(${rgba.r + 28}, ${rgba.g - 88}, ${rgba.b - 128}, ${opacity - 0.2})`;

  return (
    <motion.div
      className="scene flex items-center justify-center relative"
      style={{
        width: width,
        height: height,
        transformStyle: 'preserve-3d',
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
        color={boxColor}
        opacity={opacity}
        style={{
          transform: `rotateY(0deg) translateZ(${width / 2 + thickness}px)`,
        }}
      />
      {/* Right */}
      <Rectangle
        width={width}
        height={height}
        depth={thickness}
        color={boxColor}
        opacity={opacity}
        style={{
          transform: `rotateY(90deg) translateZ(${width / 2}px)`,
        }}
      />
      {/* Back */}
      <Rectangle
        width={width}
        height={height}
        depth={thickness}
        color={boxColor}
        opacity={opacity}
        style={{
          transform: `rotateY(180deg) translateZ(${width / 2 + thickness}px)`,
        }}
      />
      {/* Left */}
      <Rectangle
        width={width}
        height={height}
        depth={thickness}
        color={boxColor}
        opacity={opacity}
        style={{
          transform: `rotateY(270deg) translateZ(${width / 2}px)`,
        }}
      />
      {/* Top */}
      <Rectangle
        width={width}
        height={width + thickness * 2}
        depth={thickness}
        color={boxColor}
        opacity={opacity}
        animate={lidControls}
        variants={lidVariants}
        initial="closed"
        style={{
          transformStyle: 'preserve-3d',
          transformOrigin: 'bottom center',
        }}
      />
      {/* Inside shadow */}
      <Rectangle
        width={width - thickness * 2}
        height={height - -(width - height)}
        color={'0'}
        depth={0.1}
        style={{
          background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, ${innerShadowBottom} 100%)`,
          transform: `rotateX(90deg) translateZ(${height / 2}px)`,
        }}
      />
      {/* Bottom shadow */}
      <Rectangle
        width={width}
        height={width + thickness * 2}
        color={'rgba(0, 0, 0, 0.41)'}
        depth={0.1}
        opacity={opacity}
        style={{
          filter: 'blur(10px)',
          transform: `rotateX(270deg) translateZ(${height / 2}px)`,
        }}
      />
    </motion.div>
  );
};

export default Box;
