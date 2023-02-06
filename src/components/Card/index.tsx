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
      className={`text-center justify-center items-center text-navy font-[Poppins] font-bold text-[19px] leading-[25px] tracking-[-0.02em] p-[23px] bg-white w-[200px] h-[300px] rounded-lg flex content-end select-none ${className}`}
      style={{
        backgroundImage: 'url(/background.svg)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        ...style,
      }}
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
