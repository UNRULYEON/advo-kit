import { createContext, FC, useContext, useEffect, useState } from 'react';
import { Card, Kit } from '@kits';
import Loader from '@components/Loader';
import { AnimatePresence, motion } from 'framer-motion';

type Context = {
  kits: Kit[];
  currentKit: Kit;
  setCurrentKit: React.Dispatch<React.SetStateAction<Kit | null>>;
  currentCardSelection: Card[];
  setCurrentCardSelection: React.Dispatch<React.SetStateAction<Card[]>>;
  firstLaunch: boolean;
  setFirstLaunchToFalse: () => void;
};

const initialContext: Context = {
  kits: [],
  currentKit: { id: '', name: '', cards: [] },
  setCurrentKit: () => {},
  currentCardSelection: [],
  setCurrentCardSelection: () => {},
  firstLaunch: true,
  setFirstLaunch: () => {},
};

const Context = createContext<Context>(initialContext);

type KitContextProps = {
  children: React.ReactNode;
};

const KitContext: FC<KitContextProps> = ({ children }) => {
  const [kits, setKits] = useState<Kit[] | null>(null);
  const [currentKit, setCurrentKit] = useState<Kit | null>(null);
  const [currentCardSelection, setCurrentCardSelection] = useState<Card[]>([]);
  const [firstLaunch, setFirstLaunchState] = useState<boolean>(
    JSON.parse(localStorage.getItem('first_launch') || 'true')
  );

  useEffect(() => {
    const fetchKits = async () => {
      const response = await fetch('/api/kit');
      const kits: Kit[] = await response.json();
      setKits(kits);
      setCurrentKit(kits[0]);
      setCurrentCardSelection(kits[0].cards);
    };

    fetchKits();
  }, []);

  useEffect(() => {
    if (currentKit) setCurrentCardSelection(currentKit.cards);
  }, [currentKit]);

  const setFirstLaunch = (value: boolean) => {
    setFirstLaunchState(value);
    localStorage.setItem('first_launch', `${value}`);
  };

  return (
    <AnimatePresence mode="wait">
      {kits && currentKit && (
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
              currentCardSelection,
              setCurrentCardSelection,
              firstLaunch,
              setFirstLaunch,
            }}
          >
            {children}
          </Context.Provider>
        </motion.div>
      )}
      {(!kits || !currentKit) && (
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
