import { createContext, FC, useContext, useState } from 'react';
import kits, { Card, Kit } from '@kits';

type Context = {
  kits: Kit[];
  currentKit: Kit;
  setCurrentKit: React.Dispatch<React.SetStateAction<Kit>>;
};

const initialContext: Context = {
  kits: kits,
  currentKit: kits[0],
  setCurrentKit: () => {},
};

const Context = createContext<Context>(initialContext);

type KitContextProps = {
  children: React.ReactNode;
};

const KitContext: FC<KitContextProps> = ({ children }) => {
  const [currentKit, setCurrentKit] = useState<Kit>(initialContext.currentKit);

  return (
    <Context.Provider
      value={{
        kits,
        currentKit,
        setCurrentKit,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useKitContext = () => useContext(Context);

export default KitContext;
