import { FC, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ArrowDown from '@icons/ArrowDownIcon';

export type Item = {
  id: string;
  name: string;
  disabled?: boolean;
};

type DropdownProps = {
  active?: boolean;
  label?: string;
  currentItem?: Item;
  items: Item[];
  handleOnClick: (item: Item) => void;
};

const Dropdown: FC<DropdownProps> = ({
  active: activeProps = false,
  label = 'Make a selection',
  currentItem,
  items,
  handleOnClick,
}) => {
  const [active, setActive] = useState<boolean>(activeProps);

  const handleOnItemClick = (item: Item) => {
    handleOnClick(item);
    setActive(false);
  };

  return (
    <div className="relative">
      <div
        className={`transition h-10 px-2 flex bg-white items-center border border-gray rounded select-none hover:cursor-pointer hover:border-coolblue ${
          active && 'border-coolblue'
        }`}
        onClick={() => setActive((s) => !s)}
      >
        <div className="flex flex-col justify-center relative flex-1 text-[13px] h-fill-available text-cool-black overflow-hidden">
          <motion.span
            initial={{ y: currentItem ? 0 : 30 }}
            animate={{ y: active ? 30 : 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="absolute"
          >
            {currentItem?.name}
          </motion.span>
          <motion.span
            initial={{ y: currentItem ? -30 : 0 }}
            animate={{ y: active ? 0 : -30 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="absolute"
          >
            {label}
          </motion.span>
        </div>
        <ArrowDown className={`transition ${active ? 'rotate-90 fill-coolblue' : 'fill-silver'}`} />
      </div>
      <AnimatePresence>
        {active && (
          <motion.div
            className="absolute top-12 w-fill-available shadow-[0px_6px_8px_-3px_#EEEEEE] bg-white select-none rounded overflow-clip"
            initial={{ opacity: 0, y: -3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -3 }}
            transition={{ duration: 0.2 }}
          >
            {items.map((item) => (
              <DropdownItem
                key={item.id}
                item={item}
                isCurrent={item.id === currentItem?.id}
                disabled={item.disabled}
                onClick={() => handleOnItemClick(item)}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

type DropdownItemProps = {
  item: Item;
  isCurrent: boolean;
  disabled?: boolean;
  onClick: () => void;
};

const DropdownItem: FC<DropdownItemProps> = ({ item, isCurrent, disabled, onClick }) => {
  return (
    <div
      className={`transition h-10 text-[13px] flex items-center px-[10px] ${
        disabled ? 'text-silver' : 'hover:cursor-pointer hover:bg-gray-blue'
      } ${isCurrent ? 'text-coolblue' : 'text-cool-black'}`}
      onClick={() => !disabled && onClick()}
    >
      {item.name}
    </div>
  );
};

export default Dropdown;
