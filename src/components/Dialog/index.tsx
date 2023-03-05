import useOnClickOutside from '@hooks/useOnClickOutside';
import CloseIcon from '@icons/CloseIcon';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, ReactNode, useRef } from 'react';

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
          <div
            ref={ref}
            className="bg-white rounded-[4px] w-[280px]"
            style={{ boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.2)' }}
          >
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Dialog;

type DialogTitleProps = {
  closeDialog: () => void;
  children: ReactNode;
};

export const DialogTitle: FC<DialogTitleProps> = ({ closeDialog, children }) => {
  return (
    <div className="flex flex-row px-4 py-5">
      <span className="flex-grow font-bold text-[17px] leading-6">{children}</span>
      <button onClick={closeDialog}>
        <CloseIcon />
      </button>
    </div>
  );
};

type DialogContentProps = {
  children: ReactNode;
};

export const DialogContent: FC<DialogContentProps> = ({ children }) => {
  return (
    <div className="px-4 py-3">
      <div>{children}</div>
    </div>
  );
};
