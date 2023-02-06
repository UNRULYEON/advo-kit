import { HTMLMotionProps, motion } from 'framer-motion';
import { forwardRef } from 'react';
import './Rectangle.css';

type RectangleProps = {
  width: number;
  height: number;
  depth?: number;
  color?: string;
  opacity?: number;
  notAbsolute?: boolean;
  style?: React.CSSProperties;
  lid?: boolean;
} & HTMLMotionProps<'div'>;

const Rectangle = forwardRef<HTMLDivElement, RectangleProps>(
  ({ height, width, depth = 0, color, opacity = 1, notAbsolute, style, lid, ...rest }: RectangleProps, ref) => {
    const lidStripHeight = depth / 10;
    const lidColor = 'rgba(0, 0, 0, 0.1)';

    return (
      <motion.div
        className={`rectangle ${!notAbsolute && 'absolute'}`}
        style={{
          ...style,
          height: `${height}px`,
          width: `${width}px`,
        }}
        ref={ref}
        {...rest}
      >
        <div
          className={`front`}
          style={{
            height: `${height}px`,
            width: `${width}px`,
            backgroundColor: color || '#ee4444',
            opacity: opacity,
            transform: `rotateY(0deg)`,
          }}
        />
        <div
          className={`right`}
          style={{
            height: `${height}px`,
            width: `${depth}px`,
            backgroundColor: color || '#ffcc00',
            opacity: opacity,
            transform: `rotateY(90deg) translateZ(${width / 2}px) translateX(${depth / 2}px)`,
          }}
        >
          {lid && (
            <div
              style={{
                height: `${height}px`,
                width: `${lidStripHeight}px`,
                backgroundColor: lidColor,
                opacity: opacity,
              }}
            />
          )}
        </div>
        <div
          className={`back`}
          style={{
            height: `${height}px`,
            width: `${width}px`,
            backgroundColor: color || '#ff0055',
            opacity: opacity,
            transform: `rotateY(180deg) translateZ(${depth}px)`,
          }}
        />
        <div
          className={`left`}
          style={{
            height: `${height}px`,
            width: `${depth}px`,
            backgroundColor: color || '#8855ff',
            opacity: opacity,
            transform: `rotateY(270deg) translateZ(${width / 2}px) translateX(${-depth / 2}px)`,
          }}
        >
          {lid && (
            <div
              style={{
                height: `${height}px`,
                width: `${lidStripHeight}px`,
                backgroundColor: lidColor,
                opacity: opacity,
                transform: `translateX(${depth - lidStripHeight}px)`,
              }}
            />
          )}
        </div>
        <div
          className={`top`}
          style={{
            height: `${depth}px`,
            width: `${width}px`,
            backgroundColor: color || '#0099ff',
            opacity: opacity,
            transform: `rotateX(90deg) translateZ(${height / 2}px) translateY(${-depth / 2}px)`,
          }}
        >
          {lid && (
            <div
              style={{
                height: `${lidStripHeight}px`,
                width: `${width}px`,
                backgroundColor: lidColor,
                opacity: opacity,
                transform: `translateY(${depth - lidStripHeight}px)`,
              }}
            />
          )}
        </div>
        <div
          className={`bottom`}
          style={{
            height: `${depth}px`,
            width: `${width}px`,
            backgroundColor: color || '#22cc88',
            opacity: opacity,
            transform: `rotateX(270deg) translateZ(${height / 2}px)
            translateY(${depth / 2}px)`,
          }}
        />
      </motion.div>
    );
  }
);

export default Rectangle;
