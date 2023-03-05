import { AnimatePresence, clamp, motion } from 'framer-motion';
import { FC, useEffect, useState } from 'react';
import MenuIcon from '@icons/MenuIcon';
import SearchIcon from '@icons/SearchIcon';
import Input from '../Input';
import { useKitContext } from '@components/KitContext';
import { Card } from '@kits';

type MenuProps = {
  active?: boolean;
};

const KitMenu: FC<MenuProps> = ({ active: activeProps = false }) => {
  const [active, setActive] = useState<boolean>(activeProps);
  const [query, setQuery] = useState<string>('');
  const [allSelected, setAllSelected] = useState<boolean>(true);
  const { currentKit, currentCardSelection, setCurrentCardSelection } = useKitContext();

  useEffect(() => {
    if (active) setQuery('');
  }, [active]);

  useEffect(() => {
    setAllSelected(true);
    setCurrentCardSelection(currentKit.cards);
  }, [currentKit]);

  const handleOnChangeCard = (card: Card) => {
    const state = currentCardSelection.includes(card);
    let newCss: Card[] = [];

    setCurrentCardSelection((css) => {
      newCss = state ? css.filter((c) => c.question !== card.question) : [...css, card];

      return newCss;
    });
    setAllSelected((_) => newCss.length === currentKit.cards.length);
  };

  const handleAllSelection = () => {
    let state: boolean = false;
    if (allSelected) {
      setAllSelected(false);
      setCurrentCardSelection([]);
    } else {
      setAllSelected(true);
      setCurrentCardSelection(currentKit.cards);
    }
  };

  const filtered = currentKit.cards.filter((card) => card.question.toLowerCase().includes(query));

  return (
    <div className="relative">
      <AnimatePresence>
        {active && (
          <motion.div
            className="absolute inset-x-0 bottom-14 flex flex-col gap-4 rounded bg-white p-4 w-full max-w-[350px] h-[641px] shadow-[0px_6px_8px_-3px_#EEEEEE]"
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 3 }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-dark-blue text-[20px] font-[DobraMedium] font-medium">List of questions</span>
            <Input
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              trailingIcon={<SearchIcon className="fill-coolblue" />}
              autoFocus
            />
            <button
              className="text-coolblue font-bold text-[14px] self-start mt-2 hover:underline"
              onClick={handleAllSelection}
            >
              {allSelected ? 'Deselect all' : 'Select all'}
            </button>
            <div className="overflow-auto h-fill-available">
              {filtered.map((card) => (
                <div key={card.question} className="flex gap-3 items-start select-none py-[12px]">
                  <input
                    type="checkbox"
                    id={card.question}
                    name={card.question}
                    value={card.question}
                    checked={currentCardSelection.includes(card)}
                    onChange={() => handleOnChangeCard(card)}
                  />
                  <label className="text-[14px] leading-[16px] tracking-[-0.019em]" htmlFor={card.question}>
                    {card.question}
                  </label>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setActive((s) => !s)}
        className="transition flex justify-center items-center rounded bg-dark-blue w-14 h-12 shadow-[inset_0px_-2px_0px_#19457E] hover:bg-evening-blue hover:shadow-[inset_0px_-2px_0px_#003366]"
      >
        <MenuIcon className="fill-white" />
      </button>
    </div>
  );
};

export default KitMenu;
