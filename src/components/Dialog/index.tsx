import useOnClickOutside from '@hooks/useOnClickOutside';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, useRef } from 'react';

type DialogProps = {
  open: boolean;
  HandleCloseDialog: () => void;
  children: React.ReactNode;
};

const Dialog: FC<DialogProps> = ({ open, HandleCloseDialog, children }) => {
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => HandleCloseDialog());

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="z-10 absolute left-0 top-0 right-0 bottom-0 bg-neutral-900/50 flex justify-center items-center"
        >
          <div ref={ref} className="bg-white p-3 rounded-md">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Dialog;
