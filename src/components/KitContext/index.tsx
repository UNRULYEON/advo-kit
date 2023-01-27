import { createContext, FC, useContext, useEffect, useState } from 'react';
import { Card, Kit } from '@kits';
import Loader from '@components/Loader';
import { AnimatePresence, motion } from 'framer-motion';

type Context = {
  kits: Kit[] | null;
  currentKit: Kit | null;
  setCurrentKit: React.Dispatch<React.SetStateAction<Kit | null>>;
};

const initialContext: Context = {
  kits: null,
  currentKit: null,
  setCurrentKit: () => {},
};

const Context = createContext<Context>(initialContext);

type KitContextProps = {
  children: React.ReactNode;
};

const KitContext: FC<KitContextProps> = ({ children }) => {
  const [kits, setKits] = useState<Kit[] | null>(initialContext.kits);
  const [currentKit, setCurrentKit] = useState<Kit | null>(initialContext.currentKit);

  useEffect(() => {
    const fetchKits = async () => {
      const response = await fetch('/api/kit');
      const kits = await response.json();
      setKits(kits);
      setCurrentKit(kits[0]);
    };

    fetchKits();
  }, []);

  return (
    <AnimatePresence mode="wait">
      {kits && (
        <motion.div
          key="yes-kit"
          className="w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Context.Provider
            value={{
              kits,
              currentKit,
              setCurrentKit,
            }}
          >
            {children}
          </Context.Provider>
        </motion.div>
      )}
      {!kits && (
        <motion.div
          key="no-kit"
          className="flex items-center justify-center w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Loader />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const useKitContext = () => useContext(Context);

export default KitContext;
