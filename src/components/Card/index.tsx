import { FC, useEffect } from 'react';
import { motion, useAnimationControls, Variants } from 'framer-motion';

type CardProps = {
  question: string;
  first: boolean;
  className?: string;
  moveCardToBack?: (question: string) => void;
  style?: React.CSSProperties;
};

const Card: FC<CardProps> = ({ question, first, className, moveCardToBack, style }) => {
  const cardControls = useAnimationControls();

  const cardVariants: Variants = {
    hidden: {
      boxShadow: '0px 4px 24px rgba(0, 0, 0, 0)',
    },
    front: {
      boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.05)',
      transition: {
        duration: 0.3,
      },
    },
    'to-side': {
      translateX: 250,
      rotateZ: 5,
      transition: {
        duration: 0.25,
      },
      transitionEnd: {
        zIndex: -1,
      },
    },
    'to-back': {
      boxShadow: '0px 4px 24px rgba(0, 0, 0, 0)',
      translateX: 0,
      scale: 0.9,
      rotateZ: 0,
      zIndex: -1,
      transition: {
        duration: 0.2,
      },
      transitionEnd: {
        zIndex: 0,
        scale: 1,
      },
    },
  };

  const handleOnClick = async () => {
    if (!moveCardToBack) return;

    await cardControls.start('to-side');
    await cardControls.start('to-back');

    moveCardToBack(question);

    cardControls.set('hidden');
  };

  useEffect(() => {
    if (first) cardControls.start('front');
  }, [first]);

  return (
    <motion.div
      className={`font-[Poppins] font-bold text-[20px] leading-[26px] tracking-[-0.02em] bg-white w-[200px] h-[300px] p-4 rounded-lg flex content-end select-none ${className}`}
      style={{ ...style }}
      variants={cardVariants}
      animate={cardControls}
      whileTap={{ scale: 0.95 }}
      onClick={handleOnClick}
    >
      {question}
    </motion.div>
  );
};

export default Card;
