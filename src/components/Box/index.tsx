import { FC, useEffect, useRef } from 'react';
import Rectangle from '@components/Rectangle';
import CoolblueLogo from '@components/CoolblueLogo';
import { motion, useAnimationControls, Variants } from 'framer-motion';
import { useFloating, offset } from '@floating-ui/react';
import hexToRgba from '@utils/hexToRGBA';
import './Box.css';
import { Kit } from '@kits';
import Card from '@components/Card';
import useOnClickOutside from '@hooks/useOnClickOutside';

type BoxProps = {
  width?: number;
  height?: number;
  thickness?: number;
  open: boolean;
  buttonCallback: () => void;
  boxColor?: string;
  buttonColor?: string;
  opacity?: number;
  rotate?: boolean;
  kit?: Kit;
};

const Box: FC<BoxProps> = ({
  width = 200,
  height = 200,
  thickness = 20,
  open,
  buttonCallback,
  boxColor,
  buttonColor,
  opacity = 1,
  rotate = false,
  kit,
}) => {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const boxControls = useAnimationControls();
  const lidControls = useAnimationControls();
  const tooltipControls = useAnimationControls();
  const deckControls = useAnimationControls();
  const { x, y, reference, floating, strategy } = useFloating({
    middleware: [offset(-35)],
  });
  useOnClickOutside(boxRef, () => {
    if (open) {
      buttonCallback();
    }
  });

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

  const buttonVariants: Variants = {
    default: {
      marginTop: 5,
      translateZ: width / 2 + thickness,
      transition: {
        duration: 0.1,
      },
    },
    pressed: {
      marginTop: 0,
      transition: {
        duration: 0.1,
      },
    },
  };

  const tooltipVariants: Variants = {
    hidden: {
      opacity: 0,
      marginTop: 0,
      transition: {
        duration: 0.1,
      },
    },
    visible: {
      opacity: 1,
      marginTop: 0,
      transition: {
        duration: 0.1,
      },
    },
    pressed: {
      opacity: 1,
      marginTop: -5,
      transition: {
        duration: 0.1,
      },
    },
  };

  const deckVariants: Variants = {
    hidden: {
      width: width,
      height: height,
      scale: 0.6,
      y: 0,
      z: 0,
    },
    visible: {
      y: -275,
      z: 100,
    },
  };

  useEffect(() => {
    if (open) {
      lidControls.start('open');
      deckControls.start('visible');
    } else {
      deckControls.start('hidden');
      lidControls.start('closed');
    }
  });

  const rgba = boxColor && hexToRgba(boxColor);
  const innerShadowBottom = rgba && `rgba(${rgba.r + 28}, ${rgba.g - 88}, ${rgba.b - 128}, ${opacity - 0.2})`;

  return (
    <motion.div
      ref={boxRef}
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
      {/* Cards */}
      {kit && (
        <motion.div
          className={`absolute`}
          variants={deckVariants}
          animate={deckControls}
          initial="hidden"
          transition={{
            type: 'spring',
            bounce: 0.2,
          }}
        >
          <div className="relative w-full h-full ">
            {kit.cards.map(({ question }) => (
              <Card key={question} question={question} className="absolute" />
            ))}
          </div>
        </motion.div>
      )}
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
      <button
        ref={reference}
        className="flex flex-col items-center relative h-[85px] w-[85px]"
        style={{
          transform: `rotateY(0deg) translateZ(${width / 2 + thickness}px)`,
        }}
        onClick={buttonCallback}
        onMouseOver={() => tooltipControls.start('visible')}
        onMouseLeave={() => tooltipControls.start('hidden')}
      >
        <div className="bg-[#983D01] w-[80px] h-[80px] absolute rounded-full" />
        <motion.div
          initial="default"
          variants={buttonVariants}
          whileTap="pressed"
          className="flex items-center justify-center w-[80px] h-[80px] bg-hot-orange rounded-full absolute"
        >
          <CoolblueLogo width={width / 4} height={height / 4} />
        </motion.div>
      </button>
      <motion.div
        animate={tooltipControls}
        variants={tooltipVariants}
        initial="hidden"
        exit="hidden"
        transition={{ duration: 0.2 }}
        ref={floating}
        className="bg-cool-black text-white text-opacity-100 rounded-[4px] text-[12px] py-2 px-3"
        style={{
          position: strategy,
          top: y ?? 0,
          left: x ?? 0,
          width: 'max-content',
          transform: `translateZ(${width / 2 + thickness}px)`,
        }}
      >
        Click me to start
      </motion.div>
    </motion.div>
  );
};

export default Box;
