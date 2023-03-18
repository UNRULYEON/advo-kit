import Box from '@components/Box';
import Card from '@components/Card';
import { useKitContext } from '@components/KitContext';
import { motion, useAnimationControls, Variants } from 'framer-motion';
import { useEffect, useState } from 'react';

const KitBox = () => {
  const { currentKit, firstLaunch, setFirstLaunchToFalse } = useKitContext();
  const [open, setOpen] = useState(false);
  const boxControls = useAnimationControls();

  const boxVariants: Variants = {
    closed: {
      z: 200,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
    open: {
      z: 625,
      y: 60,
      transition: {
        duration: 0.25,
      },
    },
  };

  useEffect(() => {
    if (open) {
      boxControls.start('open');
    } else {
      boxControls.start('closed');
    }
  }, [open]);

  const handleOnBoxButtonClick = () => {
    if (firstLaunch && open) {
      setFirstLaunchToFalse();
    }

    setOpen((s) => !s);
  };

  return (
    <div
      className="grid w-full h-full"
      style={{
        gridTemplateColumns: '1fr 500px 1fr',
        marginTop: '200px',
        perspective: '1000px',
        perspectiveOrigin: '50% calc(50% - 225px)',
      }}
    >
      <div
        onClick={() => {
          if (open) handleOnBoxButtonClick();
        }}
      />
      <motion.div
        className="place-self-center"
        animate={boxControls}
        variants={boxVariants}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        <Box open={open} buttonCallback={handleOnBoxButtonClick} boxColor="#0090E3" kit={currentKit} />
      </motion.div>
      <div
        onClick={() => {
          if (open) handleOnBoxButtonClick();
        }}
      />
    </div>
  );
};

export default KitBox;
