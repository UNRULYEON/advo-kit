import { FC, useEffect, useRef, useState } from 'react';
import Rectangle from '@components/Rectangle';
import CoolblueLogo from '@components/CoolblueLogo';
import { AnimatePresence, motion, useAnimationControls, Variants } from 'framer-motion';
import { useFloating, offset } from '@floating-ui/react';
import hexToRgba from '@utils/hexToRGBA';
import './Box.css';
import { Kit, Card as CardType } from '@kits';
import Card from '@components/Card';
import { useKitContext } from '@components/KitContext';

function shuffle<T>(arr: T[]): T[] {
  const tempArr: T[] = [...arr];

  for (let i = tempArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tempArr[i], tempArr[j]] = [tempArr[j], tempArr[i]];
  }

  return tempArr;
}

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
  const { currentCardSelection, firstLaunch, setFirstLaunch } = useKitContext();
  const boxRef = useRef<HTMLDivElement | null>(null);
  const boxControls = useAnimationControls();
  const lidControls = useAnimationControls();
  const tooltipControls = useAnimationControls();
  const deckControls = useAnimationControls();
  const { x, y, reference, floating, strategy } = useFloating({
    middleware: [offset(-35)],
  });

  const [cardsShuffled, setCardsShuffled] = useState<CardType[]>([]);

  const shuffleDeck = () => {
    setCardsShuffled([{ question: "You've reached the end! Click to start over." }, ...shuffle(kit!.cards)]);
  };

  useEffect(() => {
    if (kit) {
      shuffleDeck();
    }
  }, []);

  useEffect(() => {
    if (kit) {
      if (open) {
        deckControls.start('hidden').then(() => {
          shuffleDeck();
          deckControls.start('visible');
        });
      } else {
        shuffleDeck();
      }
    }
  }, [kit]);

  useEffect(() => {
    setCardsShuffled((_) =>
      shuffle(
        [
          ...(kit?.cards?.filter((c) => currentCardSelection.includes(c)) || []),
          { question: "You've reached the end! Click to start over." },
        ] || [{ question: "You've reached the end! Click to start over." }]
      )
    );
  }, [currentCardSelection]);

  const lidVariants: Variants = {
    closed: {
      rotateY: 0,
      rotateX: -90,
      rotateZ: 0,
      translateY: -(height / 2) - width / 2 - thickness,
      translateZ: -(width / 2 + thickness),
    },
    open: {
      rotateX: -30,
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
  }, [open]);

  const moveCardToBack = (question: string) => {
    if (firstLaunch) setFirstLaunch(false);

    setCardsShuffled((oc) => {
      const newDeck = [...oc];
      const cardToMoveIndex = newDeck.findIndex((c) => c.question === question);
      const cardToMove = newDeck[cardToMoveIndex];
      newDeck.splice(cardToMoveIndex, 1);
      const reorderedDeck = [cardToMove, ...newDeck];

      return reorderedDeck;
    });
  };

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
      {cardsShuffled.length > 0 && (
        <>
          <AnimatePresence>
            {firstLaunch && open && (
              <motion.div
                key="first-launch"
                className="absolute font-['Gloria_Hallelujah'] text-[6px] select-none text-curious-blue"
                initial={{ opacity: 0, scale: 0.9, translateZ: 100, translateY: -275 }}
                animate={{ opacity: 1, scale: 1, translateZ: 100, translateY: -275 }}
                exit={{ opacity: 0, scale: 0.9, translateZ: 100, translateY: -275 }}
              >
                <div
                  style={{
                    transform: `translateX(-120px) translateY(20px) rotate(-5deg)`,
                  }}
                >
                  Click outside the box to close it
                </div>
                <div
                  className="relative flex w-3 h-3"
                  style={{
                    transform: `translateX(-75px) translateY(30px)`,
                  }}
                >
                  <div className="absolute bg-curious-blue h-full w-full rounded-full animate-ping" />
                  <div className="absolute bg-curious-blue h-full w-full rounded-full " />
                </div>
                <div
                  style={{
                    transform: `translateX(125px) translateY(-70px) rotate(5deg)`,
                  }}
                >
                  Click the card to see the next one
                </div>
                <svg
                  className="absolute"
                  style={{
                    transform: `translateX(280px) translateY(-210px)`,
                    scale: '.4',
                  }}
                  width="78"
                  height="79"
                  viewBox="0 0 78 79"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M77.4581 2.41251C77.6856 1.33163 76.9939 0.270942 75.913 0.0433887C74.8321 -0.184164 73.7714 0.507591 73.5439 1.58847L77.4581 2.41251ZM0.456126 63.7303C-0.245393 64.5835 -0.122432 65.8438 0.730766 66.5453L14.6344 77.9772C15.4876 78.6788 16.748 78.5558 17.4495 77.7026C18.151 76.8494 18.028 75.5891 17.1748 74.8875L4.81604 64.7258L14.9777 52.367C15.6792 51.5138 15.5563 50.2535 14.7031 49.552C13.8499 48.8505 12.5895 48.9734 11.888 49.8266L0.456126 63.7303ZM73.5439 1.58847C69.6527 20.0715 49.8371 58.3241 1.80678 63.0099L2.19518 66.991C52.5649 62.0769 73.3492 21.9295 77.4581 2.41251L73.5439 1.58847Z"
                    fill="#199BE5"
                  />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
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
              {cardsShuffled.map(({ question }, i) => (
                <Card
                  key={question}
                  question={question}
                  first={i === cardsShuffled.length - 1}
                  className="absolute"
                  moveCardToBack={moveCardToBack}
                  allowToMoveBack={cardsShuffled.length > 1}
                />
              ))}
            </div>
          </motion.div>
        </>
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
        lid
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
